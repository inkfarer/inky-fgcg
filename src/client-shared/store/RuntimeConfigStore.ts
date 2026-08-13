import { RuntimeConfig } from 'types/schemas';
import { defineStore } from 'pinia';
import { createReplicantStoreInitializer } from 'client-shared/store/StoreHelper';
import { PlayerSwaps } from 'types/schemas/playerSwaps';

const runtimeConfig = nodecg.Replicant<RuntimeConfig>('runtimeConfig');
const playerSwaps = nodecg.Replicant<PlayerSwaps>('playerSwaps');

interface RuntimeConfigStore {
    runtimeConfig: RuntimeConfig
    playerSwaps: PlayerSwaps
}

export const useRuntimeConfigStore = defineStore('runtimeConfig', {
    state: () => ({
        runtimeConfig: null,
        playerSwaps: null
    } as unknown as RuntimeConfigStore),
    actions: {
        setGame(newValue: RuntimeConfig['game']) {
            runtimeConfig.value!.game = newValue;
        },
        setIntermissionPlayersSwapped(newValue: boolean) {
            playerSwaps.value!.intermission = newValue;
        },
        setGameplayPlayersSwapped(newValue: boolean) {
            playerSwaps.value!.gameplay = newValue;
        },
        setAllowAnyScore(newValue: boolean) {
            runtimeConfig.value!.allowAnyScore = newValue;
        }
    }
});

export const initRuntimeConfigStore = createReplicantStoreInitializer([runtimeConfig, playerSwaps], useRuntimeConfigStore);
