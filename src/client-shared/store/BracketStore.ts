import { TournamentData } from 'types/schemas';
import { defineStore } from 'pinia';
import { createReplicantStoreInitializer } from 'client-shared/store/StoreHelper';
import { Bracket } from '@tourneyview/common';

const bracketData = nodecg.Replicant<Bracket | undefined>('bracketData');
const tournamentData = nodecg.Replicant<TournamentData>('tournamentData');

interface BracketStore {
    bracketData: Bracket | undefined
    tournamentData: TournamentData
}

export const useBracketStore = defineStore('brackets', {
    state: () => ({
        tournamentData: null,
        bracketData: undefined
    } as unknown as BracketStore),
    actions: {
        setBracketData(newValue: Bracket | undefined) {
            bracketData.value = newValue;
        }
    }
});

export const initBracketStore = createReplicantStoreInitializer([bracketData, tournamentData], useBracketStore);
