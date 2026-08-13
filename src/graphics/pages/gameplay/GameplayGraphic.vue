<template>
    <smash-ultimate-scoreboard
        v-if="runtimeConfigStore.runtimeConfig.game === 'SSBU'"
    />
    <smash-melee-scoreboard
        v-else-if="runtimeConfigStore.runtimeConfig.game === 'SSBM'"
    />
    <splitscreen-multiplayer-scoreboard
        v-else-if="runtimeConfigStore.runtimeConfig.game === 'SONIC_RACING_CROSSWORLDS' && activeMatchStore.activeMatch.entrants.length > 2"
    />
    <generic-scoreboard
        v-else
    />
    <sponsor-rotation
        v-if="
            runtimeConfigStore.runtimeConfig.game !== 'SSBM' &&
            runtimeConfigStore.runtimeConfig.game !== 'SONIC_RACING_CROSSWORLDS' &&
            assetStore.hasSponsors
        "
        class="sponsor-rotation"
    />
</template>

<script setup lang="ts">
import SponsorRotation from 'components/SponsorRotation.vue';
import { useAssetStore } from 'client-shared/store/AssetStore';
import { useRuntimeConfigStore } from 'client-shared/store/RuntimeConfigStore';
import GenericScoreboard from './GenericScoreboard.vue';
import SmashUltimateScoreboard from './SmashUltimateScoreboard.vue';
import SmashMeleeScoreboard from './SmashMeleeScoreboard.vue';
import SplitscreenMultiplayerScoreboard from './SplitscreenMultiplayerScoreboard.vue';
import { useActiveMatchStore } from 'client-shared/store/ActiveMatchStore';

const assetStore = useAssetStore();
const runtimeConfigStore = useRuntimeConfigStore();
const activeMatchStore = useActiveMatchStore();
</script>

<style lang="scss" scoped>
@use '../../styles/constants';

.sponsor-rotation {
    position: absolute !important;
    bottom: 16px;
    margin: 0 auto;
    width: 200px;
    height: 150px;
    left: 50%;
    transform: translateX(-50%);
}
</style>
