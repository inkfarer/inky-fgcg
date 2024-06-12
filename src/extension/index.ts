import type NodeCG from '@nodecg/types';
import { Configschema } from 'types/schemas';
import { EntrantImportController } from './controllers/EntrantImportController';

export = (nodecg: NodeCG.ServerAPI<Configschema>): void => {
    new EntrantImportController(nodecg);
};
