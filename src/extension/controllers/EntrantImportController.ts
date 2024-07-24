import type NodeCG from '@nodecg/types';
import { BaseController } from './BaseController';
import { Configschema, Entrants, StreamMatches, TournamentData } from 'types/schemas';
import { StartggClient } from '../clients/StartggClient';

export class EntrantImportController extends BaseController {
    constructor(nodecg: NodeCG.ServerAPI<Configschema>, startggClient: StartggClient | null) {
        super(nodecg);

        const entrants = nodecg.Replicant<Entrants>('entrants');
        const tournamentData = nodecg.Replicant('tournamentData') as unknown as NodeCG.ServerReplicantWithSchemaDefault<TournamentData>;
        const streamMatches = nodecg.Replicant('streamMatches') as unknown as NodeCG.ServerReplicantWithSchemaDefault<StreamMatches>;

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
            if (tournamentData.value.source === 'startgg' && tournamentData.value.sourceSpecificData?.startgg?.eventId !== data.eventId) {
                streamMatches.value = [];
            }
            tournamentData.value = newTournamentData;

            return { count: newEntrants.length };
        });
    }
}
