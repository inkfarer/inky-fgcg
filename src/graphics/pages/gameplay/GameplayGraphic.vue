<template>
    <smash-scoreboard
        v-if="runtimeConfigStore.runtimeConfig.game === 'SMASH'"
    />
    <generic-scoreboard
        v-else
    />
    <sponsor-rotation
        v-if="assetStore.hasSponsors"
        class="sponsor-rotation"
    />
</template>

<script setup lang="ts">
import SponsorRotation from 'components/SponsorRotation.vue';
import { useAssetStore } from 'client-shared/store/AssetStore';
import { useRuntimeConfigStore } from 'client-shared/store/RuntimeConfigStore';
import GenericScoreboard from './GenericScoreboard.vue';
import SmashScoreboard from './SmashScoreboard.vue';

const assetStore = useAssetStore();
const runtimeConfigStore = useRuntimeConfigStore();
</script>

<style lang="scss" scoped>
@use '../../styles/constants';

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
