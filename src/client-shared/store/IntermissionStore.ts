import type NodeCG from '@nodecg/types';
import { createReplicantStoreInitializer } from 'client-shared/store/StoreHelper';
import { defineStore } from 'pinia';
import { BottomBarData } from 'types/schemas';

const bottomBarData = nodecg.Replicant<BottomBarData>('bottomBarData');

interface IntermissionStore {
    'bottomBarData': BottomBarData
}

export const useIntermissionStore = defineStore('intermission', {
    state: () => ({
        'bottomBarData': null
    } as unknown as IntermissionStore),
    actions: {
        setBottomBarFlavorText(newValue: string) {
            bottomBarData.value!.flavorText = newValue;
        }
    }
});

export const initIntermissionStore = createReplicantStoreInitializer([bottomBarData], useIntermissionStore);
