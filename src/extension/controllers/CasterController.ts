import { BaseController } from './BaseController';
import type NodeCG from '@nodecg/types';
import { Casters, Configschema } from 'types/schemas';
import { v4 as uuidV4 } from 'uuid';

export class CasterController extends BaseController {
    constructor(nodecg: NodeCG.ServerAPI<Configschema>) {
        super(nodecg);

        const casters = nodecg.Replicant('casters') as unknown as NodeCG.ServerReplicantWithSchemaDefault<Casters>;

        this.listen('casters:insert', caster => {
            const casterId = uuidV4();
            casters.value.items.push({
                ...caster,
                id: casterId
            });
            return casterId;
        });

        this.listen('casters:update', caster => {
            const casterIndex = casters.value.items.findIndex(c => c.id === caster.id);

            if (casterIndex === -1) {
                throw new Error(`Could not find caster ${caster.id}`);
            }

            casters.value.items[casterIndex] = caster;
        });

        this.listen('casters:remove', id => {
            const casterIndex = casters.value.items.findIndex(c => c.id === id);

            if (casterIndex === -1) {
                throw new Error(`Could not find caster ${id}`);
            }

            casters.value.items.splice(casterIndex, 1);
        });

        this.listen('casters:setOrder', casterIds => {
            if (casterIds.length !== casters.value.items.length) {
                throw new Error('Cannot reorder; Some caster IDs were missing from input');
            }
            if (casterIds.some(id => casters.value.items.findIndex(caster => caster.id === id) === -1)) {
                throw new Error('Cannot reorder; Some caster IDs were missing from input');
            }

            casters.value.items = casterIds.map(id => casters.value.items.find(caster => caster.id === id)!);
        });
    }
}
