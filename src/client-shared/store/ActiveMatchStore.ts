import { ActiveMatch } from 'types/schemas';
import { defineStore } from 'pinia';
import { createReplicantStoreInitializer } from 'client-shared/store/StoreHelper';
import { formatPlayType } from 'client-shared/helpers/StringHelper';

const activeMatch = nodecg.Replicant<ActiveMatch>('activeMatch');

interface ActiveMatchStore {
    activeMatch: ActiveMatch
}

export const useActiveMatchStore = defineStore('activeMatch', {
    state: () => ({
        activeMatch: null
    } as unknown as ActiveMatchStore),
    getters: {
        formattedPlayType: state => formatPlayType(state.activeMatch.match.playType, state.activeMatch.match.numberOfGames)
    }
});

export const initActiveMatchStore = createReplicantStoreInitializer([activeMatch], useActiveMatchStore);
