<template>
    <div
        class="entrant"
        :class="[`entrant-${props.entrant.toLowerCase()}`, `game-${runtimeConfigStore.runtimeConfig.game}`]"
    >
        <div class="entrant-score">
            <div>
                {{ entrant.score }}
            </div>
        </div>
        <div class="entrant-name">
            <fitted-content :align="props.entrant === 'A' ? 'right' : 'left'">
                <opacity-swap-transition>
                    <span :key="`${entrant.name}_${entrant.prefix}`">
                        <span class="prefix">{{ $helpers.addDots(entrant.prefix) }}</span>
                        {{ $helpers.addDots(entrant.name) }}
                    </span>
                </opacity-swap-transition>
            </fitted-content>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useActiveMatchStore } from 'client-shared/store/ActiveMatchStore';
import FittedContent from 'components/FittedContent.vue';
import OpacitySwapTransition from 'components/OpacitySwapTransition.vue';
import { useRuntimeConfigStore } from 'client-shared/store/RuntimeConfigStore';

const props = defineProps<{
    entrant: 'A' | 'B'
}>();

const activeMatchStore = useActiveMatchStore();
const runtimeConfigStore = useRuntimeConfigStore();
const entrant = computed(() => {
    const entrantData = props.entrant === 'A'
        ? runtimeConfigStore.playerSwaps.gameplay ? activeMatchStore.activeMatch.entrantB : activeMatchStore.activeMatch.entrantA
        : runtimeConfigStore.playerSwaps.gameplay ? activeMatchStore.activeMatch.entrantA : activeMatchStore.activeMatch.entrantB;
    if (entrantData.participants.length <= 0) {
        return {
            name: entrantData.name,
            prefix: null,
            score: entrantData.score
        }
    } else {
        const participant = entrantData.participants[0];

        return {
            name: participant.name,
            prefix: participant.prefix,
            score: entrantData.score
        }
    }
});
</script>

<style scoped lang="scss">
@use '../../styles/constants';

$skew-amount: 20deg;
$inverse-skew-amount: -20deg;
$accent-border-size: 12px;

.entrant {
    width: 450px;
    height: 56px;
    color: constants.$text-color-2;
    display: flex;
    position: relative;
    overflow: hidden;
    background-color: constants.$neutral-1;

    &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        opacity: 0.25;
        mix-blend-mode: soft-light;
    }

    .entrant-name {
        font-size: 35px;
        padding: 0 16px;
        font-weight: 500;
        flex-grow: 1;
        min-width: 0;
        display: flex;
        align-items: center;
        position: relative;

        > * {
            width: 100%;
        }
    }

    .prefix {
        color: constants.$text-color-low-emphasis;
        font-size: 0.8em;
        font-weight: 400;
    }

    .entrant-score {
        background-color: constants.$neutral-2;
        color: constants.$text-color-2;
        font-weight: 600;
        font-size: 45px;
        line-height: 55px;
        min-width: 68px;
        text-align: center;
        border: 0 solid constants.$accent-2;
    }

    &.entrant-a {
        //background: linear-gradient(300deg, constants.$accent-1a 0%, constants.$accent-1b 100%);
        flex-direction: row-reverse;
        box-shadow: $accent-border-size 0 0 constants.$accent-3;
        transform: skew($skew-amount);

        .entrant-score {
            border-right-width: $accent-border-size;
            padding-right: 2px;

            > * {
                transform: skew($inverse-skew-amount);
            }
        }

        .entrant-name {
            transform: skew($inverse-skew-amount);
        }
    }

    &.entrant-b {
        //background: linear-gradient(60deg, constants.$accent-1a 0%, constants.$accent-1b 100%);
        box-shadow: ($accent-border-size * -1) 0 0 constants.$accent-3;
        transform: skew($inverse-skew-amount);

        .entrant-score {
            border-left-width: $accent-border-size;
            padding-left: 2px;

            > * {
                transform: skew($skew-amount);
            }
        }

        .entrant-name {
            transform: skew($skew-amount);
        }
    }
}
</style>
