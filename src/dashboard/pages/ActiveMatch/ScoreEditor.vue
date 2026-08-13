<template>
    <ipl-space class="score-editor-layout">
        <div v-for="(entrant, i) of entrants">
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
                    <span
                        v-if="editingScoreForIndex !== i"
                        class="score"
                        :class="{ smaller: entrant.score >= 100 }"
                        @click="editScoreForEntrant(i)"
                    >
                        {{ entrant.score }}
                    </span>
                    <ipl-input
                        v-else
                        v-model="scoreInputContent"
                        name="score"
                        type="number"
                        centered
                        ref="scoreInput"
                        @keydown.esc="editingScoreForIndex = -1"
                        @keydown.enter="submitNewEntrantScore"
                        @blur="submitNewEntrantScore"
                    />
                </div>
            </ipl-space>
            <div class="entrant-name">{{ $helpers.addDots(entrant.name, 36) }}</div>
        </div>
    </ipl-space>
</template>

<script setup lang="ts">
import { IplButton, IplInput, IplSpace } from '@iplsplatoon/vue-components';
import { useActiveMatchStore } from 'client-shared/store/ActiveMatchStore';
import { computed, nextTick, ref } from 'vue';
import { sendMessage } from 'client-shared/helpers/NodecgHelper';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { useRuntimeConfigStore } from 'client-shared/store/RuntimeConfigStore';

library.add(faPlus, faMinus);

const activeMatchStore = useActiveMatchStore();
const runtimeConfigStore = useRuntimeConfigStore();

const scoreInput = ref<InstanceType<typeof IplInput>[]>([]);
const scoreInputContent = ref(0);
const editingScoreForIndex = ref(-1);

function editScoreForEntrant(entrantIndex: number) {
    if (!runtimeConfigStore.runtimeConfig.allowAnyScore) return;

    scoreInputContent.value = activeMatchStore.activeMatch.entrants[entrantIndex].score;
    editingScoreForIndex.value = entrantIndex;

    nextTick(() => {
        scoreInput.value[0]?.focus();
        scoreInput.value[0]?.select();
    });
}

function submitNewEntrantScore() {
    if (runtimeConfigStore.runtimeConfig.allowAnyScore && scoreInputContent.value >= 0) {
        activeMatchStore.overrideEntrantScore(editingScoreForIndex.value, scoreInputContent.value);
    }
    editingScoreForIndex.value = -1;
}

const disableAddScore = computed(() => {
    if (runtimeConfigStore.runtimeConfig.allowAnyScore) return false;

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
    grid-template-columns: repeat(2, minmax(0, 1fr));
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

    .ipl-input__wrapper {
        font-size: 0.5em !important;
    }
}

.score.smaller {
    font-size: 0.75em;
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
