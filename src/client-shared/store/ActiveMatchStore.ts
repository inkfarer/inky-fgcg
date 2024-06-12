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
    } as unknown as ActiveMatchStore)
});

export const initActiveMatchStore = createReplicantStoreInitializer([activeMatch], useActiveMatchStore);
