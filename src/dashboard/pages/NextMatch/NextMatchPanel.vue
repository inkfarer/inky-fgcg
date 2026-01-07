<template>
    <error-display class="m-b-8" />
    <ipl-space
        v-if="streamMatchesAvailable"
        class="m-b-8"
    >
        <ipl-small-toggle
            v-model="useStreamMatches"
            label="Use stream matches"
            class="m-t-4"
        />
    </ipl-space>
    <stream-match-select v-if="streamMatchesAvailable && useStreamMatches" />
    <manual-team-select v-else />
</template>

<script setup lang="ts">
import { IplSmallToggle, IplSpace } from '@iplsplatoon/vue-components';
import { computed, ref } from 'vue';
import ErrorDisplay from '../../components/ErrorDisplay.vue';
import ManualTeamSelect from './ManualTeamSelect.vue';
import { useTournamentDataStore } from 'client-shared/store/TournamentDataStore';
import StreamMatchSelect from './StreamMatchSelect.vue';

const tournamentDataStore = useTournamentDataStore();

const streamMatchesAvailable = computed(() =>
    tournamentDataStore.tournamentData.source === 'startgg'
    && (tournamentDataStore.tournamentData.sourceSpecificData?.startgg?.streams.length ?? 0) > 0);
const useStreamMatches = ref(true);
</script>
