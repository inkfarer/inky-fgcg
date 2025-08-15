<template>
    <ipl-space class="score-editor-layout">
        <ipl-space
            color="light"
            class="layout horizontal score-display-space"
        >
            <div class="layout vertical">
                <ipl-button
                    icon="plus"
                    color="green"
                    small
                    :disabled="disableAddScore"
                    @click="sendMessage('activeMatch:addScore', runtimeConfigStore.playerSwaps.gameplay ? EntrantSide.BRAVO : EntrantSide.ALPHA)"
                />
                <ipl-button
                    class="m-t-4"
                    icon="minus"
                    color="red"
                    small
                    :disabled="activeMatchStore.activeMatch.entrantA.score <= 0"
                    @click="sendMessage('activeMatch:subtractScore', runtimeConfigStore.playerSwaps.gameplay ? EntrantSide.BRAVO : EntrantSide.ALPHA)"
                />
            </div>
            <div class="layout horizontal center-horizontal center-vertical score-wrapper left">
                <span class="score">{{ runtimeConfigStore.playerSwaps.gameplay ? activeMatchStore.activeMatch.entrantB.score : activeMatchStore.activeMatch.entrantA.score }}</span>
            </div>
        </ipl-space>
        <span class="score-separator">:</span>
        <ipl-space
            color="light"
            class="layout horizontal score-display-space"
        >
            <div class="layout horizontal center-horizontal center-vertical score-wrapper right">
                <span class="score">{{ runtimeConfigStore.playerSwaps.gameplay ? activeMatchStore.activeMatch.entrantA.score : activeMatchStore.activeMatch.entrantB.score }}</span>
            </div>
            <div class="layout vertical">
                <ipl-button
                    icon="plus"
                    color="green"
                    small
                    :disabled="disableAddScore"
                    @click="sendMessage('activeMatch:addScore', runtimeConfigStore.playerSwaps.gameplay ? EntrantSide.ALPHA : EntrantSide.BRAVO)"
                />
                <ipl-button
                    class="m-t-4"
                    icon="minus"
                    color="red"
                    small
                    :disabled="activeMatchStore.activeMatch.entrantB.score <= 0"
                    @click="sendMessage('activeMatch:subtractScore', runtimeConfigStore.playerSwaps.gameplay ? EntrantSide.ALPHA : EntrantSide.BRAVO)"
                />
            </div>
        </ipl-space>
        <div class="entrant-name left">{{ $helpers.addDots(runtimeConfigStore.playerSwaps.gameplay ? activeMatchStore.activeMatch.entrantB.name : activeMatchStore.activeMatch.entrantA.name, 36) }}</div>
        <div class="versus">vs</div>
        <div class="entrant-name right">{{ $helpers.addDots(runtimeConfigStore.playerSwaps.gameplay ? activeMatchStore.activeMatch.entrantA.name : activeMatchStore.activeMatch.entrantB.name, 36) }}</div>
    </ipl-space>
</template>

<script setup lang="ts">
import { IplButton, IplSpace } from '@iplsplatoon/vue-components';
import { useActiveMatchStore } from 'client-shared/store/ActiveMatchStore';
import { computed } from 'vue';
import { EntrantSide } from 'types/enums/EntrantSide';
import { sendMessage } from 'client-shared/helpers/NodecgHelper';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { useRuntimeConfigStore } from 'client-shared/store/RuntimeConfigStore';

library.add(faPlus, faMinus);

const activeMatchStore = useActiveMatchStore();
const runtimeConfigStore = useRuntimeConfigStore();

const disableAddScore = computed(() =>
    activeMatchStore.activeMatch.entrantA.score + activeMatchStore.activeMatch.entrantB.score >= activeMatchStore.activeMatch.match.numberOfGames);
</script>

<style lang="scss" scoped>
.score-editor-layout {
    display: grid;
    grid-template-columns: 1fr 25px 1fr;
    row-gap: 4px;
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

.versus {
    text-align: center;
    font-size: 0.85em;
    align-self: center;
}

.entrant-name {
    font-size: 0.85em;
    overflow-wrap: anywhere;

    &.right {
        text-align: right;
    }
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
