<template>
    <div
        class="scoreboard-wrapper"
        :class="{ inverted: props.inverted, [`size-${props.size}`]: true }"
    >
        <gameplay-scoreboard-entrant
            :entrant-index="0"
            direction="normal"
            :invert-skew="props.inverted"
            :size="props.size"
        />
        <div class="scoreboard-round-info">
            <fitted-content align="center">
                <opacity-swap-transition>
                    <span :key="`${activeMatchStore.activeMatch.match.name}_${activeMatchStore.formattedPlayType}`">
                        {{ activeMatchStore.activeMatch.match.name }}<span class="separator">-</span>{{ props.size === 'small' ? activeMatchStore.shortPlayType : activeMatchStore.formattedPlayType }}
                    </span>
                </opacity-swap-transition>
            </fitted-content>
        </div>
        <gameplay-scoreboard-entrant
            :entrant-index="1"
            direction="inverse"
            :invert-skew="props.inverted"
            :size="props.size"
        />
    </div>
</template>

<script setup lang="ts">
import FittedContent from 'components/FittedContent.vue';
import OpacitySwapTransition from 'components/OpacitySwapTransition.vue';
import GameplayScoreboardEntrant from './GameplayScoreboardEntrant.vue';
import { useActiveMatchStore } from 'client-shared/store/ActiveMatchStore';
import { GenericScoreboardSize } from '../../helpers/GenericScoreboardSize';

const props = withDefaults(defineProps<{
    inverted?: boolean
    size?: GenericScoreboardSize
}>(), {
    size: 'normal'
});

const activeMatchStore = useActiveMatchStore();
</script>

<style scoped lang="scss">
@use '../../styles/constants';

.scoreboard-wrapper {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;

    &.inverted {
        bottom: 0;

        .scoreboard-round-info {
            @include constants.skew-mask-y(11px);

            margin-top: auto;
        }
    }

    &.small {
        .scoreboard-round-info {
            width: 300px;
            margin: 0 5px;
        }
    }
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
