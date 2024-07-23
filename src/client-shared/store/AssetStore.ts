import type NodeCG from '@nodecg/types';
import { createReplicantStoreInitializer } from 'client-shared/store/StoreHelper';
import { defineStore } from 'pinia';

const sponsors = nodecg.Replicant<NodeCG.AssetFile[]>('assets:sponsors');

interface AssetStore {
    'assets:sponsors': NodeCG.AssetFile[]
}

export const useAssetStore = defineStore('assets', {
    state: () => ({
        'assets:sponsors': []
    } as unknown as AssetStore),
    getters: {
        hasSponsors: state => state['assets:sponsors'].length >= 1
    }
});

export const initAssetStore = createReplicantStoreInitializer([sponsors], useAssetStore);
