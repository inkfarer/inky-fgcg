<template>
    <div
        class="entrant"
        :class="[
            (props.invertSkew ? props.entrantIndex + 1 : props.entrantIndex) % 2 === 0 ? 'even-entrant' : 'odd-entrant',
            `game-${runtimeConfigStore.runtimeConfig.game}`,
            `direction-${props.direction}`
        ]"
    >
        <div class="entrant-score">
            <div>
                {{ entrant.score }}
            </div>
        </div>
        <div class="entrant-name">
            <fitted-content :align="props.direction === 'normal' ? 'right' : 'left'">
                <opacity-swap-transition>
                    <div :key="String(runtimeConfigStore.playerSwaps.gameplay)">
                        <template v-for="(participant, i) of entrant.participants">
                            <span
                                v-if="i === 0 || !entrant.allPrefixesMatch"
                                class="prefix"
                            >
                                {{ $helpers.addDots(participant.prefix) }}
                            </span>
                            {{ $helpers.addDots(participant.name) }}
                            <template v-if="i !== entrant.participants.length - 1">/ </template>
                        </template>
                    </div>
                </opacity-swap-transition>
            </fitted-content>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useActiveMatchStore } from 'client-shared/store/ActiveMatchStore';
import FittedContent from 'components/FittedContent.vue';
import { useRuntimeConfigStore } from 'client-shared/store/RuntimeConfigStore';
import OpacitySwapTransition from 'components/OpacitySwapTransition.vue';

const props = defineProps<{
    entrantIndex: number
    direction: 'normal' | 'inverse'
    invertSkew?: boolean
}>();

const activeMatchStore = useActiveMatchStore();
const runtimeConfigStore = useRuntimeConfigStore();
const entrant = computed(() => {
    const entrantData = activeMatchStore.entrants[props.entrantIndex];
    if (entrantData.participants.length <= 0) {
        return {
            allPrefixesMatch: true,
            participants: [
                {
                    name: entrantData.name,
                    prefix: null
                }
            ],
            score: entrantData.score
        };
    } else {
        return {
            allPrefixesMatch:
                entrantData.participants.length === 1 ||
                entrantData.participants.every((participant) => participant.prefix === entrantData.participants[0].prefix),
            participants: entrantData.participants.map((participant) => ({
                name: participant.name,
                prefix: participant.prefix
            })),
            score: entrantData.score
        };
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

    &.direction-normal {
        flex-direction: row-reverse;
        box-shadow: $accent-border-size 0 0 constants.$accent-3;

        .entrant-score {
            border-right-width: $accent-border-size;
            padding-right: 8px;
            padding-left: 4px;
        }
    }

    &.direction-inverse {
        box-shadow: ($accent-border-size * -1) 0 0 constants.$accent-3;
        transform: skew($inverse-skew-amount);

        .entrant-score {
            border-left-width: $accent-border-size;
            padding-left: 8px;
            padding-right: 4px;

            > * {
                transform: skew($skew-amount);
            }
        }

        .entrant-name {
            transform: skew($skew-amount);
        }
    }

    &.even-entrant {
        transform: skew($skew-amount);

        .entrant-score > *, .entrant-name {
            transform: skew($inverse-skew-amount);
        }
    }

    &.odd-entrant {
        transform: skew($inverse-skew-amount);

        .entrant-score > *, .entrant-name {
            transform: skew($skew-amount);
        }
    }
}
</style>
