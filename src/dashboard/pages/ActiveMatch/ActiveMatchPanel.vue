<template>
    <score-editor />
    <ipl-space class="m-t-8">
        <ipl-data-row
            label="Match Name"
            :value="activeMatchStore.activeMatch.match.name"
        />
        <ipl-data-row
            label="Type of Play"
            :value="formattedPlayType"
        />
        <ipl-button
            label="Begin Next Match"
            requires-confirmation
            class="m-t-8"
            color="red"
            @click="sendMessage('activeMatch:beginNextMatch')"
        />
    </ipl-space>
</template>

<script setup lang="ts">
import { IplButton, IplDataRow, IplSpace } from '@iplsplatoon/vue-components';
import ScoreEditor from './ScoreEditor.vue';
import { useActiveMatchStore } from 'client-shared/store/ActiveMatchStore';
import { computed } from 'vue';
import { sendMessage } from 'client-shared/helpers/NodecgHelper';

const activeMatchStore = useActiveMatchStore();

const formattedPlayType = computed(() => {
    const numberOfGames = activeMatchStore.activeMatch.match.numberOfGames;
    switch (activeMatchStore.activeMatch.match.playType) {
        case 'BEST_OF':
            return `Best of ${numberOfGames}`;
        case 'PLAY_ALL':
            return `Play all ${numberOfGames}`;
        default:
            return `${numberOfGames} games`;
    }
});
</script>
