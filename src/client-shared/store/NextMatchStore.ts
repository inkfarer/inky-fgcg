import { NextMatch, StreamMatches } from 'types/schemas';
import { defineStore } from 'pinia';
import { createReplicantStoreInitializer } from 'client-shared/store/StoreHelper';
import { formatPlayType } from 'client-shared/helpers/StringHelper';

const nextMatch = nodecg.Replicant<NextMatch>('nextMatch');
const streamMatches = nodecg.Replicant<StreamMatches>('streamMatches');

interface NextMatchStore {
    nextMatch: NextMatch
    streamMatches: StreamMatches
}

export const useNextMatchStore = defineStore('nextMatch', {
    state: () => ({
        nextMatch: null,
        streamMatches: null
    } as unknown as NextMatchStore),
    getters: {
        formattedPlayType: state => formatPlayType(state.nextMatch.match.playType, state.nextMatch.match.numberOfGames)
    },
    actions: {
        setShowOnStream(newValue: boolean) {
            if (nextMatch.value) {
                nextMatch.value.showOnStream = newValue;
            }
        }
    }
});

export const initNextMatchStore = createReplicantStoreInitializer([nextMatch, streamMatches], useNextMatchStore);
