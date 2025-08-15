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
    </ipl-space>
    <ipl-space class="m-t-8">
        <ipl-small-toggle
            v-model="swapPlayersOnIntermission"
            label="Swap players on intermission"
        />
        <ipl-small-toggle
            v-model="swapPlayersOnGameplay"
            class="m-t-8"
            label="Swap players on gameplay"
        />
    </ipl-space>
</template>

<script setup lang="ts">
import { IplButton, IplDataRow, IplSmallToggle, IplSpace } from '@iplsplatoon/vue-components';
import ScoreEditor from './ScoreEditor.vue';
import { useActiveMatchStore } from 'client-shared/store/ActiveMatchStore';
import { sendMessage } from 'client-shared/helpers/NodecgHelper';
import { computed } from 'vue';
import { useRuntimeConfigStore } from 'client-shared/store/RuntimeConfigStore';

const activeMatchStore = useActiveMatchStore();
const runtimeConfigStore = useRuntimeConfigStore();

const swapPlayersOnIntermission = computed({
    get() {
        return runtimeConfigStore.playerSwaps.intermission;
    },
    set(newValue: boolean) {
        runtimeConfigStore.setIntermissionPlayersSwapped(newValue);
    }
});

const swapPlayersOnGameplay = computed({
    get() {
        return runtimeConfigStore.playerSwaps.gameplay;
    },
    set(newValue: boolean) {
        runtimeConfigStore.setGameplayPlayersSwapped(newValue);
    }
});
</script>
