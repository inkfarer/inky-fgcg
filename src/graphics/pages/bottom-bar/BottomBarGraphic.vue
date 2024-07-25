<template>
    <div class="bottom-bar-wrapper">
        <div class="bottom-bar">
            <div class="clock-background-wrapper">
                <clock class="clock" />
                <div class="clock-background" />
            </div>
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

.clock-background-wrapper {
    position: relative;
    height: 100%;
    filter: drop-shadow(2px 1px 4px constants.$drop-shadow);
}

.clock-background {
    position: absolute;
    width: calc(100% + 80px);
    height: 100%;
    top: 0;
    left: -24px;
    background-color: constants.$accent-1b;
    z-index: -1;
    clip-path: polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%);
}

.bottom-bar {
    display: flex;
    align-items: center;
    width: 1600px;
    height: 120px;
    background: constants.$accent-1a;
    color: constants.$text-color-2;
    border-radius: 16px;
    padding: 0 24px;
    position: relative;
    filter: drop-shadow(0 0 2px constants.$drop-shadow);
    overflow: hidden;

    &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        opacity: 0.05;
        mix-blend-mode: soft-light;
        border-radius: 16px;
        background:
            linear-gradient(to bottom, #fff 0%, transparent 24px, transparent calc(100% - 24px), #fff 100%),
            linear-gradient(to right, #fff 0%, transparent 24px, transparent calc(100% - 24px), #fff 100%);
    }

    > .separator {
        height: 80%;
        min-width: 4px;
        margin: 0 24px;
    }

    .clock {
        margin-top: 4px;
        filter: drop-shadow(1px 1px 4px constants.$drop-shadow);
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
