<template>
    <div class="page-layout">
        <div class="sidebar">
            <div class="player-cam-space" />
            <gameplay-scoreboard-entrant entrant="A" direction="normal" />
            <gameplay-scoreboard-entrant entrant="B" direction="normal" />
            <div class="scoreboard-round-info">
                <fitted-content align="center">
                    <opacity-swap-transition>
                    <span :key="`${activeMatchStore.activeMatch.match.name}_${activeMatchStore.formattedPlayType}`">
                        {{ activeMatchStore.activeMatch.match.name }}<span class="separator">-</span>{{ activeMatchStore.formattedPlayType }}
                    </span>
                    </opacity-swap-transition>
                </fitted-content>
            </div>
            <div class="sponsor-rotation-wrapper">
                <sponsor-rotation
                    class="sponsor-rotation"
                />
            </div>
        </div>
        <div class="game-space" />
    </div>
</template>

<script setup lang="ts">
import GameplayScoreboardEntrant from './GameplayScoreboardEntrant.vue';
import { useActiveMatchStore } from 'client-shared/store/ActiveMatchStore';
import OpacitySwapTransition from 'components/OpacitySwapTransition.vue';
import FittedContent from 'components/FittedContent.vue';
import SponsorRotation from 'components/SponsorRotation.vue';

const activeMatchStore = useActiveMatchStore();
</script>

<style scoped lang="scss">
@use '../../styles/constants';

.page-layout {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
}

.game-space {
    aspect-ratio: 4 / 3;
    height: 100%;
    border-left: 4px solid constants.$neutral-1;
    box-sizing: content-box;
}

.sidebar {
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.player-cam-space {
    aspect-ratio: 16 / 9;
    width: 100%;
    border: 4px solid constants.$neutral-1;
}

.entrant {
    width: 85%;
    margin-top: 16px;
    border: 2px solid constants.$accent-3;

    &.entrant-a {
        align-self: flex-start;
        margin-left: 16px;
    }

    &.entrant-b {
        align-self: flex-end;
        margin-right: 22px;
    }
}

.scoreboard-round-info {
    background-color: constants.$neutral-1;
    color: constants.$text-color;
    font-size: 24px;
    line-height: 30px;
    width: 460px;
    text-align: center;
    padding: 0 8px 2px;
    margin: 16px 32px 0;
    grid-column: span 3;
    justify-self: center;
    border: 2px solid constants.$accent-3;

    > * {
        width: 100%;
    }

    .separator {
        margin: 0 8px;
    }
}

.sponsor-rotation-wrapper {
    flex-grow: 1;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px;
    box-sizing: border-box;
    overflow: hidden;
}

.sponsor-rotation {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
