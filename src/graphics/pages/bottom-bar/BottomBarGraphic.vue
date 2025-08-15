<template>
    <div class="bottom-bar-wrapper">
        <div class="bottom-bar">
            <div class="bottom-bar-item-shadow">
                <div class="bottom-bar-item">
                    <clock />
                </div>
            </div>
            <div
                class="info-text bottom-bar-item"
                :class="{ hidden: mainSectionMode == null }"
            >
                <opacity-swap-transition mode="out-in">
                    <div v-if="mainSectionMode === 'nextMatch'">
                        <fitted-content align="center">
                            <span class="low-emphasis">Next: </span>
                            <span class="player-name">{{ $helpers.addDots(getEntrantName(swapNextMatchPlayers ? nextMatchStore.nextMatch.entrantB : nextMatchStore.nextMatch.entrantA)) }}</span>
                            <span class="low-emphasis"> vs </span>
                            <span class="player-name">{{ $helpers.addDots(getEntrantName(swapNextMatchPlayers ? nextMatchStore.nextMatch.entrantA : nextMatchStore.nextMatch.entrantB)) }}</span>
                        </fitted-content>
                        <fitted-content align="center">
                            <opacity-swap-transition>
                                <div
                                    :key="`${nextMatchStore.nextMatch.match.name}_${nextMatchStore.formattedPlayType}`"
                                    class="round-info"
                                >
                                    {{ nextMatchStore.nextMatch.match.name }}<span class="separator"> - </span>{{ nextMatchStore.formattedPlayType }}
                                </div>
                            </opacity-swap-transition>
                        </fitted-content>
                    </div>
                    <div v-else-if="mainSectionMode === 'activeMatch'">
                        <fitted-content align="center">
                            <span class="player-name">{{ $helpers.addDots(getEntrantName(runtimeConfigStore.playerSwaps.intermission ? activeMatchStore.activeMatch.entrantB : activeMatchStore.activeMatch.entrantA)) }}</span>
                            <span class="player-score player-a-score font-numeric">{{ runtimeConfigStore.playerSwaps.intermission ? activeMatchStore.activeMatch.entrantB.score : activeMatchStore.activeMatch.entrantA.score }}</span>
                            <span class="score-separator"> - </span>
                            <span class="player-score player-b-score font-numeric">{{ runtimeConfigStore.playerSwaps.intermission ? activeMatchStore.activeMatch.entrantA.score : activeMatchStore.activeMatch.entrantB.score }}</span>
                            <span class="player-name">{{ $helpers.addDots(getEntrantName(runtimeConfigStore.playerSwaps.intermission ? activeMatchStore.activeMatch.entrantA : activeMatchStore.activeMatch.entrantB)) }}</span>
                        </fitted-content>
                        <fitted-content align="center">
                            <opacity-swap-transition>
                                <div
                                    :key="`${activeMatchStore.activeMatch.match.name}_${activeMatchStore.formattedPlayType}`"
                                    class="round-info"
                                >
                                    {{ activeMatchStore.activeMatch.match.name }}<span class="separator"> - </span>{{ activeMatchStore.formattedPlayType }}
                                </div>
                            </opacity-swap-transition>
                        </fitted-content>
                    </div>
                    <fitted-content v-else-if="mainSectionMode === 'flavorText'">
                        <fitted-content align="center">
                            <div :key="intermissionStore.bottomBarData.flavorText">
                                {{ intermissionStore.bottomBarData.flavorText }}
                            </div>
                        </fitted-content>
                    </fitted-content>
                </opacity-swap-transition>
            </div>
            <div class="bottom-bar-item-shadow">
                <div
                    v-if="assetStore.hasSponsors"
                    class="bottom-bar-item"
                >
                    <sponsor-rotation class="sponsors" />
                </div>
            </div>
        </div>
        <div class="info-ticker">
            {{ greeting }}
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
import { Configschema, Entrant } from 'types/schemas';
import OpacitySwapTransition from 'components/OpacitySwapTransition.vue';
import { useIntermissionStore } from 'client-shared/store/IntermissionStore';
import FittedContent from 'components/FittedContent.vue';
import { useAssetStore } from 'client-shared/store/AssetStore';
import { useTournamentDataStore } from 'client-shared/store/TournamentDataStore';
import { isBlank } from 'client-shared/helpers/StringHelper';
import { useActiveMatchStore } from 'client-shared/store/ActiveMatchStore';
import { computed } from 'vue';
import { useRuntimeConfigStore } from 'client-shared/store/RuntimeConfigStore';

const tournamentDataStore = useTournamentDataStore();
const nextMatchStore = useNextMatchStore();
const activeMatchStore = useActiveMatchStore();
const intermissionStore = useIntermissionStore();
const runtimeConfigStore = useRuntimeConfigStore();
const assetStore = useAssetStore();

const greeting = (nodecg.bundleConfig as Configschema).event?.greeting ?? 'Hello from Yo Mana!';

const swapNextMatchPlayers = computed(() => runtimeConfigStore.playerSwaps.intermission &&
    activeMatchStore.activeMatch.entrantA.id === nextMatchStore.nextMatch.entrantA.id &&
    activeMatchStore.activeMatch.entrantB.id === nextMatchStore.nextMatch.entrantB.id);

const mainSectionMode = computed(() => {
    if (nextMatchStore.nextMatch.showOnStream) {
        return 'nextMatch';
    } else if (!activeMatchStore.activeMatch.hideOnIntermission && (activeMatchStore.activeMatch.entrantA.score > 0 || activeMatchStore.activeMatch.entrantB.score > 0)) {
        return 'activeMatch';
    } else if (!isBlank(intermissionStore.bottomBarData.flavorText)) {
        return 'flavorText';
    } else {
        return null;
    }
});

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
    @include constants.skew-mask-y(7px);

    background-color: constants.$neutral-1;
    color: rgba(233, 254, 255, 0.75);
    height: 30px;
    font-size: 20px;
    font-weight: 400;
    line-height: 30px;
    width: 1620px;
    text-align: center;
}

.bottom-bar-item {
    background: linear-gradient(120deg, constants.$accent-1a 0%, constants.$accent-1b 100%);
    height: 100%;
    padding: 0 35px;
    display: flex;
    align-items: center;

    &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        opacity: 0.15;
        mix-blend-mode: soft-light;
        background:
            linear-gradient(to bottom, transparent calc(100% - 12px), #fff 100%);
            //linear-gradient(to right, #fff 0%, transparent 12px, transparent calc(100% - 12px), #fff 100%);
    }
}

.bottom-bar-item-shadow {
    height: 100%;
}

.clock-wrapper {
    margin-bottom: 6px;
}

.round-info {
    font-size: 0.6em;
    color: constants.$text-color-low-emphasis;
    margin-top: -4px;
}

.player-name {
    font-weight: 550;
}

.bottom-bar {
    display: flex;
    align-items: center;
    width: 2000px;
    height: 100px;
    color: constants.$text-color-2;
    position: relative;
    margin-bottom: 16px;

    > * {
        &:first-child {
            filter:
                drop-shadow(16px 0 0 constants.$accent-4)
                drop-shadow(16px 0 0 constants.$accent-2)
                drop-shadow(16px 0 0 constants.$accent-3);

            > * {
                @include constants.skew-mask-x(20px);
                padding-left: 220px;
                margin-right: 64px;
            }
        }

        &:last-child {
            filter:
                drop-shadow(-16px 0 0 constants.$accent-4)
                drop-shadow(-16px 0 0 constants.$accent-2)
                drop-shadow(-16px 0 0 constants.$accent-3);

            > * {
                @include constants.skew-mask-x-inverse(20px);
                padding-right: 220px;
                margin-left: 64px;
            }
        }
    }

    > .separator {
        background-color: constants.$neutral-2;
        height: 80%;
        min-width: 4px;
        margin: 0 24px;
    }

    .info-text {
        @include constants.skew-mask-y-inverse(20px);

        width: 100%;
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

.player-score {
    font-weight: 700;
    display: inline-block;
    color: constants.$accent-2;

    &.player-a-score {
        margin-left: 10px;
    }

    &.player-b-score {
        margin-right: 10px;
    }
}

.score-separator {
    color: constants.$accent-2;
}
</style>
