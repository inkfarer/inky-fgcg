import { Casters } from 'types/schemas';
import { defineStore } from 'pinia';
import { createReplicantStoreInitializer } from 'client-shared/store/StoreHelper';

const casters = nodecg.Replicant<Casters>('casters');

interface CasterStore {
    casters: Casters
}

export const useCasterStore = defineStore('casters', {
    state: () => ({
        casters: null
    } as unknown as CasterStore),
    actions: {
        setVisible(visible: boolean) {
            if (casters.value) {
                casters.value.visible = visible;
            }
        }
    }
});

export const initCasterStore = createReplicantStoreInitializer([casters], useCasterStore);
