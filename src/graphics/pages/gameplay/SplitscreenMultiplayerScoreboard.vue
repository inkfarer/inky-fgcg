<template>
    <div class="splitscreen-scoreboard-layout">
        <gameplay-scoreboard-entrant
            v-for="(_, n) of activeMatchStore.activeMatch.entrants"
            :entrant-index="n"
            :direction="n % 2 === 0 ? 'normal' : 'inverse'"
            invert-skew
        />
        <div class="scoreboard-round-info">
            <fitted-content align="center">
                <opacity-swap-transition>
                    <span :key="`${activeMatchStore.activeMatch.match.name}_${activeMatchStore.formattedPlayType}`">
                        {{ activeMatchStore.activeMatch.match.name }}<span class="separator">-</span>{{ activeMatchStore.formattedPlayType }}
                    </span>
                </opacity-swap-transition>
            </fitted-content>
        </div>
        <sponsor-rotation
            class="sponsor-rotation"
        />
    </div>
</template>

<script setup lang="ts">
import { useActiveMatchStore } from 'client-shared/store/ActiveMatchStore';
import GameplayScoreboardEntrant from './GameplayScoreboardEntrant.vue';
import FittedContent from 'components/FittedContent.vue';
import OpacitySwapTransition from 'components/OpacitySwapTransition.vue';
import SponsorRotation from 'components/SponsorRotation.vue';

const activeMatchStore = useActiveMatchStore();
</script>

<style scoped lang="scss">
@use '../../styles/constants';

.splitscreen-scoreboard-layout {
    position: absolute;
    z-index: 2;
    left: 1%;
    top: 0.5%;
    width: 98%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: repeat(2, minmax(0, 1fr));

    > .entrant:nth-child(even) {
        justify-self: end;
    }

    > .entrant:nth-child(odd) {
        justify-self: start;
    }
}

.scoreboard-round-info {
    @include constants.skew-mask-y(11px);

    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
    background-color: constants.$neutral-1;
    color: constants.$text-color;
    height: 30px;
    font-size: 24px;
    line-height: 30px;
    width: 460px;
    text-align: center;
    padding: 0 20px;

    > * {
        width: 100%;
    }

    .separator {
        margin: 0 8px;
    }
}

.sponsor-rotation {
    position: absolute !important;
    bottom: 150px;
    margin: 0 auto;
    width: 150px;
    height: 100px;
    left: 50%;
    transform: translateX(-50%);
}
</style>
