<template>
    <div class="scoreboard-wrapper">
        <gameplay-scoreboard-entrant entrant="A" />
        <img
            src="../../assets/flask.png"
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
</template>

<script setup lang="ts">
import FittedContent from 'components/FittedContent.vue';
import OpacitySwapTransition from 'components/OpacitySwapTransition.vue';
import GameplayScoreboardEntrant from './GameplayScoreboardEntrant.vue';
import { useActiveMatchStore } from 'client-shared/store/ActiveMatchStore';

const activeMatchStore = useActiveMatchStore();
</script>

<style scoped lang="scss">
@use '../../styles/constants';

.scoreboard-wrapper {
    position: absolute;
    top: 4px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 110px 1fr;
    row-gap: 8px;
}

img {
    width: 75px;
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
    background-color: constants.$neutral-2;
    border-radius: 8px;
    color: constants.$text-color;
    height: 30px;
    font-size: 24px;
    line-height: 30px;
    width: 460px;
    text-align: center;
    padding: 0 12px;
    margin: 0 32px;
    grid-column: span 3;
    justify-self: center;

    > * {
        width: 100%;
    }

    .separator {
        margin: 0 8px;
    }
}
</style>
