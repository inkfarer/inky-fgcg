<template>
    <transition name="scoreboard">
        <div
            v-show="scoreboardVisible"
            class="scoreboard-wrapper"
        >
            <gameplay-scoreboard-entrant entrant="A" />
            <img
                src="../../assets/bfgl-logo-2.0.png"
            />
            <gameplay-scoreboard-entrant entrant="B" />
            <div class="scoreboard-round-info">
                <fitted-content align="center">
                    <opacity-swap-transition>
                    <span :key="`${activeMatchStore.activeMatch.match.name}_${activeMatchStore.formattedPlayType}`">
                        {{ activeMatchStore.activeMatch.match.name }}<span class="separator">-</span>{{ activeMatchStore.formattedPlayType }}
                    </span>
                    </opacity-swap-transition>
                </fitted-content>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import FittedContent from 'components/FittedContent.vue';
import OpacitySwapTransition from 'components/OpacitySwapTransition.vue';
import GameplayScoreboardEntrant from './GameplayScoreboardEntrant.vue';
import { useActiveMatchStore } from 'client-shared/store/ActiveMatchStore';
import { ref } from 'vue';
import { bindEntranceToFunction } from '../../helpers/ObsHelper';

const activeMatchStore = useActiveMatchStore();

const scoreboardVisible = ref(true);
let scoreboardVisibilityTimeout: number | undefined = undefined;

bindEntranceToFunction(() => {
    scoreboardVisible.value = false;
    window.clearTimeout(scoreboardVisibilityTimeout);
    scoreboardVisibilityTimeout = window.setTimeout(() => {
        scoreboardVisible.value = true;
    }, 7500);
});
</script>

<style scoped lang="scss">
@use '../../styles/constants';

.scoreboard-enter-active {
    transition: opacity 350ms linear, transform 350ms ease-out;
}

.scoreboard-enter-from {
    opacity: 0;
    transform: translateY(-50px);
}

.scoreboard-enter-to {
    opacity: 1;
    transform: translateY(0px);
}

.scoreboard-wrapper {
    position: absolute;
    top: 10px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 150px 1fr;
    row-gap: 8px;
}

img {
    height: 75px;
    justify-self: center;
}

.entrant {
    align-self: center;

    &:nth-child(2) {
        justify-self: start;
    }

    &:first-child {
        justify-self: end;
    }
}

.scoreboard-round-info {
    $skew-size: 11px;

    background-color: constants.$neutral-1;
    color: constants.$text-color;
    height: 30px;
    font-size: 24px;
    line-height: 30px;
    width: 460px;
    text-align: center;
    padding: 0 $skew-size + 8px;
    margin: 0 32px;
    grid-column: span 3;
    justify-self: center;

    clip-path: polygon(0% 0%, 100% 0%, calc(100% - $skew-size) 100%, $skew-size 100%);

    > * {
        width: 100%;
    }

    .separator {
        margin: 0 8px;
    }
}
</style>
