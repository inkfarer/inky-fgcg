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
    } as unknown as NextMatchStore),
    actions: {
        setShowOnStream(newValue: boolean) {
            if (nextMatch.value) {
                nextMatch.value.showOnStream = newValue;
            }
        }
    }
});

export const initNextMatchStore = createReplicantStoreInitializer([nextMatch], useNextMatchStore);
