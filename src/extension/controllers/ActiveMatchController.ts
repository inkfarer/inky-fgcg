import type NodeCG from '@nodecg/types';
import { BaseController } from './BaseController';
import { ActiveMatch, Configschema, NextMatch } from 'types/schemas';
import { EntrantSide } from 'types/enums/EntrantSide';
import cloneDeep from 'lodash/cloneDeep';

export class ActiveMatchController extends BaseController {
    constructor(nodecg: NodeCG.ServerAPI<Configschema>) {
        super(nodecg);

        const activeMatch = nodecg.Replicant('activeMatch') as unknown as NodeCG.ServerReplicantWithSchemaDefault<ActiveMatch>;
        const nextMatch = nodecg.Replicant('nextMatch') as unknown as NodeCG.ServerReplicantWithSchemaDefault<NextMatch>;

        this.listen('activeMatch:addScore', side => {
            const scoreSum = activeMatch.value.entrantA.score + activeMatch.value.entrantB.score;
            if (scoreSum >= activeMatch.value.match.numberOfGames) return;

            if (scoreSum === 0) {
                nextMatch.value.showOnStream = false;
            }

            if (side === EntrantSide.ALPHA) {
                activeMatch.value.entrantA.score++;
            } else if (side === EntrantSide.BRAVO) {
                activeMatch.value.entrantB.score++;
            }
        });

        this.listen('activeMatch:subtractScore', side => {
            if (side === EntrantSide.ALPHA && activeMatch.value.entrantA.score > 0) {
                activeMatch.value.entrantA.score--;
            } else if (side === EntrantSide.BRAVO && activeMatch.value.entrantB.score > 0) {
                activeMatch.value.entrantB.score--;
            }
        });

        this.listen('activeMatch:beginNextMatch', () => {
            const nextMatchData = cloneDeep(nextMatch.value);

            activeMatch.value = {
                entrantA: {
                    ...nextMatchData.entrantA,
                    score: 0
                },
                entrantB: {
                    ...nextMatchData.entrantB,
                    score: 0
                },
                match: nextMatchData.match
            }
        });

        this.listen('activeMatch:swapPlayers', () => {
            activeMatch.value = {
                ...activeMatch.value,
                entrantA: activeMatch.value.entrantB,
                entrantB: activeMatch.value.entrantA
            };
        });
    }
}
