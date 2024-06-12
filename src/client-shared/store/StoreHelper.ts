import type NodeCGTypes from '@nodecg/types';
import type * as Pinia from 'pinia';
import cloneDeep from 'lodash/cloneDeep';

export function createReplicantStoreInitializer(
    reps: NodeCGTypes.ClientReplicant<unknown>[],
    store: () => Pinia.Store
): () => Promise<void> {
    return async () => {
        const storeInstance = store();
        reps.forEach(rep => {
            rep.on('change', newValue => {
                storeInstance.$patch((state: Record<string, unknown>) => {
                    state[rep.name] = cloneDeep(newValue);
                });
            });
        });
        await NodeCG.waitForReplicants(...Object.values(reps));
    };
}
