<template>
    <ipl-space class="score-editor-layout">
        <div v-for="entrant of entrants">
            <ipl-space
                color="secondary"
                class="layout horizontal score-display-space"
            >
                <div class="layout vertical">
                    <ipl-button
                        icon="plus"
                        color="green"
                        small
                        :disabled="disableAddScore"
                        @click="sendMessage('activeMatch:addScore', entrant.actualIndex)"
                    />
                    <ipl-button
                        class="m-t-4"
                        icon="minus"
                        color="red"
                        small
                        :disabled="entrant.score <= 0"
                        @click="sendMessage('activeMatch:subtractScore', entrant.actualIndex)"
                    />
                </div>
                <div class="layout horizontal center-horizontal center-vertical score-wrapper">
                    <span class="score">{{ entrant.score }}</span>
                </div>
            </ipl-space>
            <div class="entrant-name">{{ $helpers.addDots(entrant.name, 36) }}</div>
        </div>
    </ipl-space>
</template>

<script setup lang="ts">
import { IplButton, IplSpace } from '@iplsplatoon/vue-components';
import { useActiveMatchStore } from 'client-shared/store/ActiveMatchStore';
import { computed } from 'vue';
import { sendMessage } from 'client-shared/helpers/NodecgHelper';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { useRuntimeConfigStore } from 'client-shared/store/RuntimeConfigStore';

library.add(faPlus, faMinus);

const activeMatchStore = useActiveMatchStore();
const runtimeConfigStore = useRuntimeConfigStore();

// todo: arbitrary score mode
const disableAddScore = computed(() => {
    const scoreSum = activeMatchStore.activeMatch.entrants.reduce((result, entrant) => result + entrant.score, 0);
    return scoreSum >= activeMatchStore.activeMatch.match.numberOfGames;
});

const entrants = computed(() => {
    const result = activeMatchStore.activeMatch.entrants.map((entrant, i) => ({
        ...entrant,
        actualIndex: i
    }));

    if (activeMatchStore.activeMatch.entrants.length === 2 && runtimeConfigStore.playerSwaps.gameplay) {
        return result.toReversed();
    }

    return result;
});
</script>

<style lang="scss" scoped>
.score-editor-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px 12px;

    > *:nth-child(even) {
        > .entrant-name {
            text-align: right;
        }

        > .score-display-space {
            flex-direction: row-reverse !important;
        }
    }
}

.score-wrapper {
    width: 100%;
    font-size: 3.25em;
    font-weight: 500;

    &.right {
        margin-right: 4px;
    }

    &.left {
        margin-left: 4px;
    }

    span {
        user-select: none;
    }
}

.ipl-space.score-display-space {
    padding: 4px;
}

.entrant-name {
    font-size: 0.85em;
    overflow-wrap: anywhere;
    margin-top: 4px;
}

.score-separator {
    font-size: 2.75em;
    text-align: center;
    font-weight: 900;
    user-select: none;
    align-self: center;
    margin-bottom: 4px;
}
</style>
