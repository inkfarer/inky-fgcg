import { ActiveMatch } from 'types/schemas';
import { defineStore } from 'pinia';
import { createReplicantStoreInitializer } from 'client-shared/store/StoreHelper';
import { formatPlayType } from 'client-shared/helpers/StringHelper';
import { useRuntimeConfigStore } from 'client-shared/store/RuntimeConfigStore';

const activeMatch = nodecg.Replicant<ActiveMatch>('activeMatch');

interface ActiveMatchStore {
    activeMatch: ActiveMatch
}

export const useActiveMatchStore = defineStore('activeMatch', {
    state: () => ({
        activeMatch: null
    } as unknown as ActiveMatchStore),
    getters: {
        formattedPlayType: state => formatPlayType(state.activeMatch.match.playType, state.activeMatch.match.numberOfGames),
        entrants: (state) => {
            const runtimeConfigStore = useRuntimeConfigStore();
            if (state.activeMatch.entrants.length === 2 && runtimeConfigStore.playerSwaps.gameplay) {
                return state.activeMatch.entrants.toReversed();
            }

            return state.activeMatch.entrants;
        }
    }
});

export const initActiveMatchStore = createReplicantStoreInitializer([activeMatch], useActiveMatchStore);
