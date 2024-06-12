import { Entrants } from 'types/schemas';
import { defineStore } from 'pinia';
import { createReplicantStoreInitializer } from 'client-shared/store/StoreHelper';

const entrants = nodecg.Replicant<Entrants>('entrants');

interface EntrantStore {
    entrants: Entrants
}

export const useEntrantStore = defineStore('entrants', {
    state: (): EntrantStore => ({
        entrants: []
    })
});

export const initEntrantStore = createReplicantStoreInitializer([entrants], useEntrantStore);
