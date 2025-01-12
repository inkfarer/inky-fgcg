<template>
    <div class="bottom-bar-wrapper">
        <div class="bottom-bar">
            <div class="bottom-bar-item">
                <clock />
            </div>
            <div
                class="info-text bottom-bar-item"
                :class="{ hidden: !nextMatchStore.nextMatch.showOnStream && isBlank(intermissionStore.bottomBarData.flavorText) }"
            >
                <fitted-content align="center">
                    <opacity-swap-transition>
                        <div
                            v-if="nextMatchStore.nextMatch.showOnStream"
                            :key="`${getEntrantName(nextMatchStore.nextMatch.entrantA)}_${getEntrantName(nextMatchStore.nextMatch.entrantB)}`"
                        >
                            <div>
                                <span class="low-emphasis">Next: </span>
                                <span class="player-name">{{ $helpers.addDots(getEntrantName(nextMatchStore.nextMatch.entrantA)) }}</span>
                                <span class="low-emphasis"> vs </span>
                                <span class="player-name">{{ $helpers.addDots(getEntrantName(nextMatchStore.nextMatch.entrantB)) }}</span>
                            </div>
                            <opacity-swap-transition>
                                <div
                                    :key="`${nextMatchStore.nextMatch.match.name}_${nextMatchStore.formattedPlayType}`"
                                    class="round-info"
                                >
                                    {{ nextMatchStore.nextMatch.match.name }}<span class="separator"> - </span>{{ nextMatchStore.formattedPlayType }}
                                </div>
                            </opacity-swap-transition>
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
            <div
                v-if="assetStore.hasSponsors"
                class="bottom-bar-item"
            >
                <sponsor-rotation class="sponsors" />
            </div>
        </div>
        <div class="info-ticker">
            Hello from WinterCon!
            <template v-if="tournamentDataStore.tournamentData.sourceSpecificData?.startgg != null">
                — View the tournament bracket at start.gg/{{ tournamentDataStore.tournamentData.sourceSpecificData.startgg.shortSlug ?? tournamentDataStore.tournamentData.sourceSpecificData.startgg.slug }}
            </template>
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
import { useTournamentDataStore } from 'client-shared/store/TournamentDataStore';
import { isBlank } from 'client-shared/helpers/StringHelper';

const tournamentDataStore = useTournamentDataStore();
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
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.info-ticker {
    background-color: #100822;
    border-radius: 8px 8px 0 0;
    color: rgba(233, 254, 255, 0.75);
    height: 30px;
    font-size: 20px;
    font-weight: 400;
    line-height: 30px;
    width: 1600px;
    text-align: center;
}

.bottom-bar-item {
    background: linear-gradient(120deg, constants.$accent-1a 0%, constants.$accent-1b 100%);
    filter: constants.$drop-shadow;
    height: 100%;
    padding: 0 24px;
    border-radius: 16px;
    display: flex;
    align-items: center;

    &:not(:last-child) {
        margin-right: 16px;
    }

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
}

.clock-wrapper {
    margin-bottom: 6px;
}

.round-info {
    font-size: 0.6em;
    color: constants.$text-color-low-emphasis;
    margin-top: 2px;
}

.player-name {
    font-weight: 550;
}

.bottom-bar {
    display: flex;
    align-items: center;
    width: 1600px;
    height: 100px;
    color: constants.$text-color-2;
    position: relative;
    margin-bottom: 16px;

    > .separator {
        background-color: constants.$neutral-2;
        height: 80%;
        min-width: 4px;
        margin: 0 24px;
    }

    .info-text {
        flex-grow: 1;
        text-align: center;
        font-size: 38px;
        min-width: 0;
        justify-content: center;
        transition-duration: 350ms;
        transition-property: opacity, transform;
        transition-timing-function: ease-out;

        .low-emphasis {
            color: constants.$text-color-low-emphasis;
            font-size: 0.9em;
            font-weight: 400;
        }

        &.hidden {
            opacity: 0;
            transform: translateY(16px);
            transition-timing-function: ease-in;
        }
    }

    .sponsors {
        min-width: 150px;
        height: 85px;
        position: relative;
    }
}
</style>
