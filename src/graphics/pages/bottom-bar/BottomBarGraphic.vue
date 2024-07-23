<template>
    <div class="bottom-bar-wrapper">
        <div class="bottom-bar">
            <clock />
            <template v-if="assetStore.hasSponsors">
                <div class="separator" />
                <sponsor-rotation class="sponsors" />
            </template>
            <div class="separator" />
            <div class="info-text">
                <fitted-content align="center">
                    <opacity-swap-transition>
                        <div
                            v-if="nextMatchStore.nextMatch.showOnStream"
                            :key="`${getEntrantName(nextMatchStore.nextMatch.entrantA)}_${getEntrantName(nextMatchStore.nextMatch.entrantB)}`"
                        >
                            <span class="low-emphasis">Next:</span>
                            {{ $helpers.addDots(getEntrantName(nextMatchStore.nextMatch.entrantA)) }}
                            <span class="low-emphasis">vs</span>
                            {{ $helpers.addDots(getEntrantName(nextMatchStore.nextMatch.entrantB)) }}
                        </div>
                        <div
                            v-else
                            :key="intermissionStore.bottomBarData.flavorText"
                        >
                            {{ intermissionStore.bottomBarData.flavorText }}
                        </div>
                    </opacity-swap-transition>
                </fitted-content>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Clock from 'components/Clock.vue';
import SponsorRotation from 'components/SponsorRotation.vue';
import { useNextMatchStore } from 'client-shared/store/NextMatchStore';
import { Entrant } from 'types/schemas';
import OpacitySwapTransition from 'components/OpacitySwapTransition.vue';
import { useIntermissionStore } from 'client-shared/store/IntermissionStore';
import FittedContent from 'components/FittedContent.vue';
import { useAssetStore } from 'client-shared/store/AssetStore';

const nextMatchStore = useNextMatchStore();
const intermissionStore = useIntermissionStore();
const assetStore = useAssetStore();

function getEntrantName(entrant: Entrant): string {
    if (entrant.participants.length >= 1) {
        return entrant.participants[0].name;
    } else {
        return entrant.name;
    }
}
</script>

<style scoped lang="scss">
@use '../../styles/constants';

.bottom-bar-wrapper {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.bottom-bar {
    display: flex;
    align-items: center;
    width: 1600px;
    height: 110px;
    background: linear-gradient(120deg, constants.$accent-1a 0%, constants.$accent-1b 100%);
    color: constants.$text-color-2;
    border-radius: 16px;
    padding: 0 24px;
    position: relative;
    filter: drop-shadow(0 0 2px rgba(208, 212, 251, 0.5));

    &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        opacity: 0.15;
        mix-blend-mode: soft-light;
        border-radius: 16px;
        background:
            linear-gradient(to bottom, #fff 0%, transparent 12px, transparent calc(100% - 12px), #fff 100%),
            linear-gradient(to right, #fff 0%, transparent 12px, transparent calc(100% - 12px), #fff 100%);
    }

    > .separator {
        background-color: constants.$neutral-2;
        height: 80%;
        min-width: 4px;
        margin: 0 24px;
    }

    .clock-wrapper {
        margin-bottom: 3px;
    }

    .info-text {
        flex-grow: 1;
        text-align: center;
        font-size: 38px;
        min-width: 0;

        .low-emphasis {
            color: constants.$text-color-low-emphasis;
            font-size: 0.9em;
            font-weight: 400;
        }
    }

    .sponsors {
        min-width: 150px;
        height: 95px;
        position: relative;
    }
}
</style>
