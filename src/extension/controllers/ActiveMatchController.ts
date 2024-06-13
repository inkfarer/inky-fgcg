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
             if (activeMatch.value.entrantA.score + activeMatch.value.entrantB.score >= activeMatch.value.match.numberOfGames) return;

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
                ...nextMatchData,
                entrantA: {
                    ...nextMatchData.entrantA,
                    score: 0
                },
                entrantB: {
                    ...nextMatchData.entrantB,
                    score: 0
                }
            }
        });
    }
}
