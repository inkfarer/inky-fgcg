import { Casters } from 'types/schemas';
import { defineStore } from 'pinia';
import { createReplicantStoreInitializer } from 'client-shared/store/StoreHelper';

const casters = nodecg.Replicant<Casters>('casters');

interface CasterStore {
    casters: Casters
}

export const useCasterStore = defineStore('casters', {
    state: () => ({
        casters: []
    } as CasterStore)
});

export const initCasterStore = createReplicantStoreInitializer([casters], useCasterStore);
