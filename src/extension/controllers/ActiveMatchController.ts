import type NodeCG from '@nodecg/types';
import { BaseController } from './BaseController';
import { ActiveMatch, BottomBarData, Configschema, NextMatch } from 'types/schemas';
import { EntrantSide } from 'types/enums/EntrantSide';
import cloneDeep from 'lodash/cloneDeep';
import { PlayerSwaps } from 'types/schemas/playerSwaps';

export class ActiveMatchController extends BaseController {
    constructor(nodecg: NodeCG.ServerAPI<Configschema>) {
        super(nodecg);

        const activeMatch = nodecg.Replicant('activeMatch') as unknown as NodeCG.ServerReplicantWithSchemaDefault<ActiveMatch>;
        const nextMatch = nodecg.Replicant('nextMatch') as unknown as NodeCG.ServerReplicantWithSchemaDefault<NextMatch>;
        const playerSwaps = nodecg.Replicant('playerSwaps') as unknown as NodeCG.ServerReplicantWithSchemaDefault<PlayerSwaps>;
        const bottomBarData = nodecg.Replicant('bottomBarData') as unknown as NodeCG.ServerReplicantWithSchemaDefault<BottomBarData>;

        this.listen('activeMatch:addScore', side => {
            const scoreSum = activeMatch.value.entrantA.score + activeMatch.value.entrantB.score;
            if (scoreSum >= activeMatch.value.match.numberOfGames) return;

            if (side === EntrantSide.ALPHA) {
                activeMatch.value.entrantA.score++;
            } else if (side === EntrantSide.BRAVO) {
                activeMatch.value.entrantB.score++;
            }

            if (scoreSum === 0 && bottomBarData.value.mode === 'NEXT_MATCH') {
                bottomBarData.value.mode = 'ACTIVE_MATCH';
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
            };

            playerSwaps.value = {
                gameplay: false,
                intermission: false
            };

            if (bottomBarData.value.mode === 'ACTIVE_MATCH') {
                bottomBarData.value.mode = 'NEXT_MATCH';
            }
        });
    }
}
