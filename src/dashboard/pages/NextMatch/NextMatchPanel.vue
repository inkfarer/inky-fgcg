<template>
    <error-display class="m-b-8" />
    <ipl-space>
        <ipl-small-toggle
            v-model="showOnStream"
            label="Show on stream"
        />
        <ipl-small-toggle
            v-if="streamMatchesAvailable"
            v-model="useStreamMatches"
            label="Use stream matches"
            class="m-t-4"
        />
    </ipl-space>
    <stream-match-select
        v-if="streamMatchesAvailable && useStreamMatches"
        class="m-t-8"
    />
    <manual-team-select
        v-else
        class="m-t-8"
    />
</template>

<script setup lang="ts">
import { useNextMatchStore } from 'client-shared/store/NextMatchStore';
import { IplSmallToggle, IplSpace } from '@iplsplatoon/vue-components';
import { computed, ref } from 'vue';
import ErrorDisplay from '../../components/ErrorDisplay.vue';
import ManualTeamSelect from './ManualTeamSelect.vue';
import { useTournamentDataStore } from 'client-shared/store/TournamentDataStore';
import StreamMatchSelect from './StreamMatchSelect.vue';

const nextMatchStore = useNextMatchStore();
const tournamentDataStore = useTournamentDataStore();

const streamMatchesAvailable = computed(() =>
    tournamentDataStore.tournamentData.source === 'startgg'
    && (tournamentDataStore.tournamentData.sourceSpecificData?.startgg?.streams.length ?? 0) > 0);
const useStreamMatches = ref(true);

const showOnStream = computed({
    get() {
        return nextMatchStore.nextMatch.showOnStream;
    },
    set(newValue: boolean) {
        nextMatchStore.setShowOnStream(newValue);
    }
});
</script>
