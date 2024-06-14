import { BaseController } from './BaseController';
import type NodeCG from '@nodecg/types';
import type { Configschema, Entrants, NextMatch } from 'types/schemas';
import { getEntrant } from '../helpers/EntrantHelper';

export class NextMatchController extends BaseController {
    constructor(nodecg: NodeCG.ServerAPI<Configschema>) {
        super(nodecg);

        const entrants = nodecg.Replicant<Entrants>('entrants');
        const nextMatch = nodecg.Replicant('nextMatch') as unknown as NodeCG.ServerReplicantWithSchemaDefault<NextMatch>;

        this.listen('nextMatch:update', data => {
             const entrantA = getEntrant(entrants.value!, data.entrantAId);
             const entrantB = getEntrant(entrants.value!, data.entrantBId);

             nextMatch.value = {
                 entrantA,
                 entrantB,
                 match: {
                     name: data.matchName,
                     numberOfGames: data.numberOfGames,
                     playType: 'BEST_OF'
                 },
                 showOnStream: nextMatch.value.showOnStream
             };
        });
    }
}
