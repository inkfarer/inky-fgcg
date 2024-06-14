import { ActiveMatch } from 'types/schemas';
import { defineStore } from 'pinia';
import { createReplicantStoreInitializer } from 'client-shared/store/StoreHelper';

const activeMatch = nodecg.Replicant<ActiveMatch>('activeMatch');

interface ActiveMatchStore {
    activeMatch: ActiveMatch
}

export const useActiveMatchStore = defineStore('activeMatch', {
    state: () => ({
        activeMatch: null
    } as unknown as ActiveMatchStore),
    getters: {
        formattedPlayType: state => {
            const numberOfGames = state.activeMatch.match.numberOfGames;
            switch (state.activeMatch.match.playType) {
                case 'BEST_OF':
                    return `Best of ${numberOfGames}`;
                case 'PLAY_ALL':
                    return `Play all ${numberOfGames}`;
                default:
                    return `${numberOfGames} games`;
            }
        }
    }
});

export const initActiveMatchStore = createReplicantStoreInitializer([activeMatch], useActiveMatchStore);
