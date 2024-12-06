import type NodeCG from '@nodecg/types';
import { createReplicantStoreInitializer } from 'client-shared/store/StoreHelper';
import { defineStore } from 'pinia';
import { BottomBarData, IntermissionData } from 'types/schemas';

const bottomBarData = nodecg.Replicant<BottomBarData>('bottomBarData');
const intermissionData = nodecg.Replicant<IntermissionData>('intermissionData');

interface IntermissionStore {
    'bottomBarData': BottomBarData
    'intermissionData': IntermissionData
}

export const useIntermissionStore = defineStore('intermission', {
    state: () => ({
        'bottomBarData': null,
        'intermissionData': null
    } as unknown as IntermissionStore),
    actions: {
        setBottomBarFlavorText(newValue: string) {
            bottomBarData.value!.flavorText = newValue;
        },
        setIntermissionFlavorText(newValue: string) {
            intermissionData.value!.flavorText = newValue;
        }
    }
});

export const initIntermissionStore = createReplicantStoreInitializer([bottomBarData, intermissionData], useIntermissionStore);
