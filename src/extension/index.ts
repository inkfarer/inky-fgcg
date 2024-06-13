import type NodeCG from '@nodecg/types';
import { Configschema } from 'types/schemas';
import { EntrantImportController } from './controllers/EntrantImportController';
import { NextMatchController } from './controllers/NextMatchController';

export = (nodecg: NodeCG.ServerAPI<Configschema>): void => {
    new EntrantImportController(nodecg);
    new NextMatchController(nodecg);
};
