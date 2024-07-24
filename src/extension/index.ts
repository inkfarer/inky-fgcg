import type NodeCG from '@nodecg/types';
import { Configschema } from 'types/schemas';
import { EntrantImportController } from './controllers/EntrantImportController';
import { NextMatchController } from './controllers/NextMatchController';
import { ActiveMatchController } from './controllers/ActiveMatchController';
import { StartggClient } from './clients/StartggClient';

export = (nodecg: NodeCG.ServerAPI<Configschema>): void => {
    const startggClient = nodecg.bundleConfig?.startgg?.apiKey == null
        ? null
        : new StartggClient(nodecg.bundleConfig.startgg.apiKey);

    new EntrantImportController(nodecg, startggClient);
    new NextMatchController(nodecg, startggClient);
    new ActiveMatchController(nodecg);
};
