import type NodeCG from '@nodecg/types';
import { BaseController } from './BaseController';
import { Configschema, Entrants, TournamentData } from 'types/schemas';
import { StartggClient } from '../clients/StartggClient';

export class EntrantImportController extends BaseController {
    constructor(nodecg: NodeCG.ServerAPI<Configschema>) {
        super(nodecg);

        const startggClient = nodecg.bundleConfig?.startgg?.apiKey == null
            ? null
            : new StartggClient(nodecg.bundleConfig.startgg.apiKey);

        const entrants = nodecg.Replicant<Entrants>('entrants');
        const tournamentData = nodecg.Replicant<TournamentData>('tournamentData');

        this.listen('entrants:getStartggEvents', async (data) => {
            if (startggClient == null) {
                throw new Error('Missing start.gg config');
            }

            return startggClient.getEvents(data.tournamentSlug);
        });

        this.listen('entrants:importEntrants', async (data) => {
            if (startggClient == null) {
                throw new Error('Missing start.gg config');
            }

            const newEntrants = await startggClient.getEntrants(data.eventId);
            const newTournamentData = await startggClient.getTournamentData(data.eventId);

            entrants.value = newEntrants;
            tournamentData.value = newTournamentData;

            return { count: newEntrants.length };
        });
    }
}
