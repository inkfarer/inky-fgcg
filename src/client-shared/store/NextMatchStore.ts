import { NextMatch } from 'types/schemas';
import { defineStore } from 'pinia';
import { createReplicantStoreInitializer } from 'client-shared/store/StoreHelper';

const nextMatch = nodecg.Replicant<NextMatch>('nextMatch');

interface NextMatchStore {
    nextMatch: NextMatch
}

export const useNextMatchStore = defineStore('nextMatch', {
    state: () => ({
        nextMatch: null
    } as unknown as NextMatchStore)
});

export const initNextMatchStore = createReplicantStoreInitializer([nextMatch], useNextMatchStore);
