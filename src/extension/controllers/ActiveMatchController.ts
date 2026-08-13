import type NodeCG from '@nodecg/types';
import { BaseController } from './BaseController';
import { ActiveMatch, BottomBarData, Configschema, NextMatch, RuntimeConfig } from 'types/schemas';
import cloneDeep from 'lodash/cloneDeep';
import { PlayerSwaps } from 'types/schemas/playerSwaps';

export class ActiveMatchController extends BaseController {
    constructor(nodecg: NodeCG.ServerAPI<Configschema>) {
        super(nodecg);

        const activeMatch = nodecg.Replicant('activeMatch') as unknown as NodeCG.ServerReplicantWithSchemaDefault<ActiveMatch>;
        const nextMatch = nodecg.Replicant('nextMatch') as unknown as NodeCG.ServerReplicantWithSchemaDefault<NextMatch>;
        const playerSwaps = nodecg.Replicant('playerSwaps') as unknown as NodeCG.ServerReplicantWithSchemaDefault<PlayerSwaps>;
        const bottomBarData = nodecg.Replicant('bottomBarData') as unknown as NodeCG.ServerReplicantWithSchemaDefault<BottomBarData>;
        const runtimeConfig = nodecg.Replicant('runtimeConfig') as unknown as NodeCG.ServerReplicantWithSchemaDefault<RuntimeConfig>;

        this.listen('activeMatch:addScore', (entrantIndex) => {
            const scoreSum = activeMatch.value.entrants.reduce(
                (result, entrant) => result + entrant.score,
                0);

            if (!runtimeConfig.value.allowAnyScore && scoreSum >= activeMatch.value.match.numberOfGames) return;

            const entrant = activeMatch.value.entrants[entrantIndex];
            if (entrant == null) {
                throw new Error(`Entrant #${entrantIndex + 1} not found`);
            }

            entrant.score++;

            if (scoreSum === 0 && bottomBarData.value.mode === 'NEXT_MATCH') {
                bottomBarData.value.mode = 'ACTIVE_MATCH';
            }
        });

        this.listen('activeMatch:subtractScore', (entrantIndex) => {
            const entrant = activeMatch.value.entrants[entrantIndex];
            if (entrant == null) {
                throw new Error(`Entrant #${entrantIndex + 1} not found`);
            }

            if (entrant.score > 0) {
                entrant.score--;
            }
        });

        this.listen('activeMatch:beginNextMatch', () => {
            const nextMatchData = cloneDeep(nextMatch.value);

            const entrantsChanging =
                activeMatch.value.entrants.length !== nextMatchData.entrants.length ||
                activeMatch.value.entrants.some((activeEntrant, i) => activeEntrant.id !== nextMatchData.entrants[i].id);

            activeMatch.value = {
                entrants: nextMatchData.entrants.map((entrant) => ({
                    ...entrant,
                    score: 0
                })),
                match: nextMatchData.match
            }

            if (entrantsChanging || activeMatch.value.entrants.length !== 2) {
                playerSwaps.value = {
                    gameplay: false,
                    intermission: false
                };
            }

            if (bottomBarData.value.mode === 'ACTIVE_MATCH') {
                bottomBarData.value.mode = 'NEXT_MATCH';
            }
        });
    }
}
