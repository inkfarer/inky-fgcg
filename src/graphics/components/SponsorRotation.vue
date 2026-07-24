<template>
    <div class="sponsor-rotation">
        <opacity-swap-transition mode="default">
            <img
                :key="slides.activeComponent.value ?? ''"
                :src="slides.activeComponent.value ?? ''"
            >
        </opacity-swap-transition>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import OpacitySwapTransition from './OpacitySwapTransition.vue';
import { useAssetStore } from 'client-shared/store/AssetStore';
import { loadAndCheckIfImageExists } from '../helpers/ImageHelper';
import { useSlides } from '../helpers/useSlides';

const assetStore = useAssetStore();
const slides = useSlides(computed(() => assetStore['assets:sponsors']
    .map(sponsor => ({ component: sponsor.url, duration: 15 }))));

onMounted(async () => {
    await Promise.all(assetStore['assets:sponsors'].map(sponsor => loadAndCheckIfImageExists(sponsor.url)));
});
</script>

<style scoped lang="scss">
.sponsor-rotation {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    > img {
        position: absolute;
        max-height: 100%;
        max-width: 100%;
        image-rendering: -webkit-optimize-contrast;
    }
}
</style>
