<template>
   <div
        ref="wrapper"
        class="bracket-wrapper"
    />
</template>

<script setup lang="ts">
import { BracketRenderer, D3BracketAnimator } from '@tourneyview/renderer';
import { onMounted, ref, watch } from 'vue';
import { useBracketStore } from 'client-shared/store/BracketStore';

const wrapper = ref<HTMLDivElement>();
const bracketDataStore = useBracketStore();
const renderer = new BracketRenderer({
    animator: new D3BracketAnimator(),
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

$margin: 100px;
$top-margin: 50px;
$bottom-margin: 50px;

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

            &.type-team-name {
                line-height: 1.2em;
                color: constants.$text-color;
                border-radius: 5px;
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
        .bracket-link {
            stroke: constants.$accent-1a !important;
        }

        .elimination-renderer__bracket-title {
            color: constants.$text-color-2;
            display: inline-block;
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: 500;
        }

        .round-label {
            color: constants.$text-color-2;
            padding: 2px 6px;
            border-radius: 4px;
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
            color: constants.$text-color-2;
            background-color: constants.$accent-1a;
            filter: drop-shadow(0 0 2px rgba(208, 212, 251, 0.5));

            .match-cell__score-wrapper {
                background-color: constants.$accent-1c;
                color: constants.$text-color-2;
                line-height: 2em;
                height: 100%;
            }

            .match-cell__score {
                font-weight: 600;

                &.is-disqualified {
                    font-size: 1em;
                }
            }

            .match-cell__team-name {
                font-weight: 400;
            }

            .match-cell__top-team-name, .match-cell__top-score {
                margin-top: 2px;
            }

            .match-cell__bottom-team-name, .match-cell__bottom-score {
                margin-bottom: 2px;
            }
        }

        .bracket-link {
            stroke: #fff;
            stroke-width: 2px;
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
            border-radius: 12px;

            .match-row__team-name {
                font-size: 1.5em;
                line-height: 2em;
                padding: 0 8px;
                height: 100%;
                border-radius: 8px;
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
