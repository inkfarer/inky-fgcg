<template>
    <div class="scoreboard-wrapper">
        <gameplay-scoreboard-entrant :entrant-index="0" direction="normal" />
        <div class="scoreboard-round-info">
            <fitted-content align="center">
                <opacity-swap-transition>
                    <span :key="`${activeMatchStore.activeMatch.match.name}_${activeMatchStore.formattedPlayType}`">
                        {{ activeMatchStore.activeMatch.match.name }}<span class="separator">-</span>{{ activeMatchStore.formattedPlayType }}
                    </span>
                </opacity-swap-transition>
            </fitted-content>
        </div>
        <gameplay-scoreboard-entrant :entrant-index="1" direction="inverse" />
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
    width: 100%;
    display: flex;
    justify-content: center;
}

.scoreboard-round-info {
    @include constants.skew-mask-y-inverse(11px);

    background-color: constants.$neutral-1;
    color: constants.$text-color;
    height: 30px;
    font-size: 24px;
    line-height: 30px;
    width: 460px;
    text-align: center;
    padding: 0 20px;
    margin: 0 32px;

    > * {
        width: 100%;
    }

    .separator {
        margin: 0 8px;
    }
}
</style>
