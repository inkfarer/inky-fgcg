import { BaseController } from './BaseController';
import type NodeCG from '@nodecg/types';
import type { Configschema, Entrants, NextMatch, StreamMatches, TournamentData } from 'types/schemas';
import { getEntrant } from '../helpers/EntrantHelper';
import { StartggClient } from '../clients/StartggClient';

export class NextMatchController extends BaseController {
    constructor(nodecg: NodeCG.ServerAPI<Configschema>, startggClient: StartggClient | null) {
        super(nodecg);

        const entrants = nodecg.Replicant<Entrants>('entrants');
        const nextMatch = nodecg.Replicant('nextMatch') as unknown as NodeCG.ServerReplicantWithSchemaDefault<NextMatch>;
        const tournamentData = nodecg.Replicant('tournamentData') as unknown as NodeCG.ServerReplicantWithSchemaDefault<TournamentData>;
        const streamMatches = nodecg.Replicant('streamMatches') as unknown as NodeCG.ServerReplicantWithSchemaDefault<StreamMatches>;

        this.listen('nextMatch:update', (data) => {
             nextMatch.value = {
                 entrants: data.entrantIds.map((entrantId) => getEntrant(entrants.value!, entrantId)),
                 match: {
                     name: data.matchName,
                     numberOfGames: data.numberOfGames,
                     playType: data.playType
                 }
             };
        });

        this.listen('nextMatch:getStreamMatches', async (data) => {
            if (startggClient == null) {
                throw new Error('Missing start.gg config');
            }
            if (tournamentData.value.sourceSpecificData?.startgg?.slug == null || tournamentData.value.sourceSpecificData?.startgg?.eventId == null) {
                throw new Error('start.gg tournament slug is unknown');
            }

            streamMatches.value = await startggClient.getStreamQueue(
                tournamentData.value.sourceSpecificData.startgg.slug,
                tournamentData.value.sourceSpecificData.startgg.eventId,
                data.streamIds,
                data.getAllMatches);
        });
    }
}
