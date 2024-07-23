<template>
    <div class="scoreboard-wrapper">
        <gameplay-scoreboard-entrant entrant="A" />
        <div class="scoreboard-round-info">
            <fitted-content align="center">
                <opacity-swap-transition>
                    <span :key="`${activeMatchStore.activeMatch.match.name}_${activeMatchStore.formattedPlayType}`">
                        {{ activeMatchStore.activeMatch.match.name }}<span class="separator">-</span>{{ activeMatchStore.formattedPlayType }}
                    </span>
                </opacity-swap-transition>
            </fitted-content>
        </div>
        <gameplay-scoreboard-entrant entrant="B" />
    </div>
    <sponsor-rotation
        v-if="assetStore.hasSponsors"
        class="sponsor-rotation"
    />
</template>

<script setup lang="ts">
import GameplayScoreboardEntrant from './GameplayScoreboardEntrant.vue';
import FittedContent from 'components/FittedContent.vue';
import OpacitySwapTransition from 'components/OpacitySwapTransition.vue';
import { useActiveMatchStore } from 'client-shared/store/ActiveMatchStore';
import SponsorRotation from 'components/SponsorRotation.vue';
import { useAssetStore } from 'client-shared/store/AssetStore';

const activeMatchStore = useActiveMatchStore();
const assetStore = useAssetStore();
</script>

<style lang="scss" scoped>
@use '../../styles/constants';

.scoreboard-wrapper {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
}

.scoreboard-round-info {
    background-color: constants.$neutral-2;
    border-radius: 0 0 8px 8px;
    color: constants.$text-color;
    height: 30px;
    font-size: 24px;
    line-height: 30px;
    width: 460px;
    text-align: center;
    padding: 0 12px;
    margin: 0 32px;

    > * {
        width: 100%;
    }

    .separator {
        margin: 0 8px;
    }
}

.sponsor-rotation {
    position: absolute;
    bottom: 16px;
    margin: 0 auto;
    width: 200px;
    height: 150px;
    left: 50%;
    transform: translateX(-50%);
    align-items: flex-end;
}
</style>
