import { ActiveMatch, TournamentData } from 'types/schemas';
import { defineStore } from 'pinia';
import { createReplicantStoreInitializer } from 'client-shared/store/StoreHelper';

const tournamentData = nodecg.Replicant<TournamentData>('tournamentData');

interface TournamentDataStore {
    tournamentData: TournamentData
}

export const useTournamentDataStore = defineStore('tournamentData', {
    state: () => ({
        tournamentData: null
    } as unknown as TournamentDataStore)
});

export const initTournamentDataStore = createReplicantStoreInitializer([tournamentData], useTournamentDataStore);
