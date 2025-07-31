<template>
    <div class="bracket-title-wrapper">
        <div class="bracket-title">
            <fitted-content align="center">
                <opacity-swap-transition>
                    <div :key="bracketTitle">{{ bracketTitle }}</div>
                </opacity-swap-transition>
            </fitted-content>
        </div>
    </div>
    <div
        ref="wrapper"
        class="bracket-wrapper"
    />
</template>

<script setup lang="ts">
import { BracketRenderer, D3BracketAnimator } from '@tourneyview/renderer';
import { computed, onMounted, ref, watch } from 'vue';
import { useBracketStore } from 'client-shared/store/BracketStore';
import FittedContent from 'components/FittedContent.vue';
import OpacitySwapTransition from 'components/OpacitySwapTransition.vue';
import * as d3 from 'd3';

const wrapper = ref<HTMLDivElement>();
const bracketDataStore = useBracketStore();

const bracketTitle = computed(() => {
    const titleParts = [];
    if (String(bracketDataStore.tournamentData.sourceSpecificData?.startgg?.eventId) != bracketDataStore.bracketData?.eventId) {
        titleParts.push(bracketDataStore.bracketData?.eventName);
    }

    titleParts.push(bracketDataStore.bracketData?.name);

    if (bracketDataStore.bracketData?.matchGroups[0]?.name !== bracketDataStore.bracketData?.name) {
        titleParts.push(bracketDataStore.bracketData?.matchGroups[0]?.name);
    }

    return titleParts.filter(Boolean).join(' - ');
});

const renderer = new BracketRenderer({
    animator: new D3BracketAnimator(),
    eliminationOpts: {
        curveFunction: d3.curveStep,
        linkWidth: 30
    },
    swissOpts: {
        rowHeight: 60,
        useScrollMask: false
    },
    roundRobinOpts: {
        maxScale: 1.75
    }
});

onMounted(async () => {
    wrapper.value!.appendChild(renderer.element);

    watch(() => bracketDataStore.bracketData, newValue => {
        if (newValue != null) {
            void renderer.setData(newValue);
        }
    }, { immediate: true });
});
</script>

<style lang="scss" scoped>
@use 'sass:color';
@use '../../styles/constants';

$margin: 50px;
$top-margin: 100px;
$bottom-margin: 50px;
$skew-amount: 8deg;
$inverse-skew-amount: -8deg;

.bracket-title-wrapper {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
    top: 28px;
}

.bracket-title {
    background-color: constants.$neutral-1;
    color: #FFFFFF;
    width: 800px;
    font-size: 40px;
    padding: 8px 8px;
    transform: skew($inverse-skew-amount);
    border-width: 0 8px;
    border-style: solid;
    border-color: constants.$accent-2;

    > * {
        transform: skew($skew-amount);
    }
}

.bracket-wrapper {
    line-height: 1.5em;
    position: absolute;
    top: $top-margin;
    left: $margin;
    font-weight: 600;
}

.bracket-wrapper :deep(> div) {
    width: 1920px - $margin * 2;
    height: 1080px - ($bottom-margin + $top-margin);
    overflow: visible;

    .round-robin-renderer {
        .round-robin-grid-item {
            transition: background-color 500ms;
            border-radius: 0;

            &.type-team-name {
                line-height: 1.2em;
                color: constants.$text-color-2;
                padding: 2px 3px;
                overflow: hidden;

                &.type-team-name-top {
                    align-items: end;
                    justify-content: center;
                    -webkit-box-align: end;
                }

                &.type-team-name-left {
                    align-items: center;
                    justify-content: flex-end;
                }
            }

            &.type-match {
                .score-layout {
                    margin-top: -2px;
                    font-weight: 700;
                    font-size: 1.75em;
                    
                    .team-score {
                        min-width: 0.75em;

                        &.is-disqualified {
                            margin-top: -2px;
                        }
                    }
                }

                &.left-team-winner, &.top-team-winner, &.in-progress {
                    background-color: constants.$accent-1a;
                    color: constants.$text-color-2;
                }
            }

            &.type-blank-no-match {
                background-color: color.adjust(constants.$accent-1a, $alpha: -0.75);
            }
        }
    }

    .elimination-renderer {
        padding: 8px;

        .elimination-renderer__bracket-title {
            color: constants.$text-color-2;
            display: inline-block;
            padding: 2px 6px;
            font-weight: 500;
        }

        .round-label {
            color: constants.$text-color-2;
            padding: 2px 6px;
            font-weight: 400;
        }

        .match-cell__third-place-match-label {
            box-sizing: border-box;
            padding-top: 2px;
            background-color: constants.$accent-1a;
            font-size: 14px;
            font-weight: 500;
        }

        .match-cell {
            @include constants.skew-mask-x-inverse(11px);
            padding-left: 8px;

            color: constants.$text-color-2;
            background: linear-gradient(
                100deg,
                constants.$accent-1a 0%,
                constants.$accent-1a calc(100% - 59px),
                constants.$accent-2 calc(100% - 58px),
                constants.$accent-2 calc(100% - 50px),
                constants.$accent-3 calc(100% - 49px)
            );
            border-radius: 0;
            grid-template-columns: 1fr 50px;

            .match-cell__score-wrapper {
                @include constants.skew-mask-x-inverse(5.5px);

                color: constants.$text-color-2;
                line-height: 1.9em;
                height: 100%;
                padding-right: 4px;

                &:nth-child(2) {
                    margin-left: 6.5px;
                }
            }

            .match-cell__score {
                font-weight: 600;
                font-size: 1.9em;

                &.is-disqualified {
                    font-size: 1em;
                }
            }

            .match-cell__team-name {
                font-weight: 400;
                margin-left: 6px;
                margin-right: 4px;
            }

            .match-cell__top-team-name, .match-cell__top-score {
                margin-top: 2px;
            }

            .match-cell__bottom-team-name, .match-cell__bottom-score {
                margin-bottom: 2px;
            }

            .match-cell__bottom-team-name {
                transform: translateX(-6.5px);
            }
        }

        .bracket-link {
            stroke: #C4C3C8;
            stroke-width: 3px;
        }
    }

    .swiss-renderer {
        width: 60%;
        justify-items: center;

        .match-row-wrapper {
            margin: 8px 0;
            width: 1000px;
            overflow: hidden;
            position: relative;
            display: flex;
            justify-content: center;
        }

        .match-row {
            background-color: constants.$accent-1a;
            color: constants.$text-color-2;
            width: 1000px;
            height: 100%;
            position: absolute;
            box-sizing: border-box;
            border-radius: 0;

            .match-row__team-name {
                font-size: 1.5em;
                line-height: 2em;
                padding: 0 8px;
                height: 100%;
                border-radius: 0;
            }

            .match-row__scores {
                border-radius: 5px;
                font-weight: 700;
                font-size: 1.4em;
                width: 120px;
                padding: 0 4px;
                background-color: constants.$accent-1a;
                color: constants.$text-color-2;
            }
        }
    }
}
</style>
