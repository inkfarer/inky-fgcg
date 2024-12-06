<template>
    <score-editor />
    <ipl-space class="m-t-8">
        <ipl-data-row
            label="Match Name"
            :value="activeMatchStore.activeMatch.match.name"
        />
        <ipl-data-row
            label="Type of Play"
            :value="activeMatchStore.formattedPlayType"
        />
        <ipl-button
            label="Begin Next Match"
            requires-confirmation
            class="m-t-8"
            color="red"
            @click="sendMessage('activeMatch:beginNextMatch')"
        />
        <ipl-button
            label="Swap players"
            class="m-t-8"
            @click="sendMessage('activeMatch:swapPlayers')"
        />
    </ipl-space>
</template>

<script setup lang="ts">
import { IplButton, IplDataRow, IplSpace } from '@iplsplatoon/vue-components';
import ScoreEditor from './ScoreEditor.vue';
import { useActiveMatchStore } from 'client-shared/store/ActiveMatchStore';
import { sendMessage } from 'client-shared/helpers/NodecgHelper';

const activeMatchStore = useActiveMatchStore();
</script>
