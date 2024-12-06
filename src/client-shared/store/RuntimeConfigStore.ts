import { Casters, RuntimeConfig } from 'types/schemas';
import { defineStore } from 'pinia';
import { createReplicantStoreInitializer } from 'client-shared/store/StoreHelper';

const runtimeConfig = nodecg.Replicant<RuntimeConfig>('runtimeConfig');

interface RuntimeConfigStore {
    runtimeConfig: RuntimeConfig
}

export const useRuntimeConfigStore = defineStore('runtimeConfig', {
    state: () => ({
        runtimeConfig: null
    } as unknown as RuntimeConfigStore),
    actions: {
        setGame(newValue: RuntimeConfig['game']) {
            runtimeConfig.value!.game = newValue;
        }
    }
});

export const initRuntimeConfigStore = createReplicantStoreInitializer([runtimeConfig], useRuntimeConfigStore);
