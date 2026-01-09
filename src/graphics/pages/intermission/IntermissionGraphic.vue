<template>
    <div
        class="intermission-layout"
        :class="`game-${runtimeConfigStore.runtimeConfig.game}`"
    >
        <div class="event-name">
            Wintercon <span class="edition">X</span>
        </div>
        <div class="content">
            <div class="title">

                <div class="game-name">
                    <template v-if="runtimeConfigStore.runtimeConfig.game === 'MORTAL_KOMBAT'">
                        MK11
                    </template>
                    <template v-else-if="runtimeConfigStore.runtimeConfig.game === 'MORTAL_KOMBAT_1'">
                        MK1
                    </template>
                    <template v-else-if="runtimeConfigStore.runtimeConfig.game === 'TEKKEN'">
                        Tekken 8
                    </template>
                    <template v-else-if="runtimeConfigStore.runtimeConfig.game === 'SMASH'">
                        Ultimate
                    </template>
                    <template v-else-if="runtimeConfigStore.runtimeConfig.game === 'STREET_FIGHTER_6'">
                        SF6
                    </template>
                    <template v-else-if="runtimeConfigStore.runtimeConfig.game === 'GGST'">
                        Guilty Gear: Strive
                    </template>
                    <template v-else-if="runtimeConfigStore.runtimeConfig.game === '2XKO'">
                        2XKO
                    </template>
                    <div class="game-name-extra">Tournament</div>
                </div>
            </div>
            <div class="flavor-text">
                <fitted-content
                    align="center"
                    :max-width="1200"
                >
                    <opacity-swap-transition>
                        <div :key="intermissionStore.intermissionData.flavorText">{{ intermissionStore.intermissionData.flavorText }}</div>
                    </opacity-swap-transition>
                </fitted-content>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRuntimeConfigStore } from 'client-shared/store/RuntimeConfigStore';
import { useIntermissionStore } from 'client-shared/store/IntermissionStore';
import FittedContent from 'components/FittedContent.vue';
import OpacitySwapTransition from 'components/OpacitySwapTransition.vue';

const runtimeConfigStore = useRuntimeConfigStore();
const intermissionStore = useIntermissionStore();
</script>

<style scoped lang="scss">
@use '../../styles/constants';
@import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap');

.intermission-layout {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #fff;
    display: flex;
    flex-direction: column;

    .content {
        flex-grow: 1;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        position: relative;
        padding: 0 48px;
        filter: drop-shadow(0 0 12px rgba(34, 34, 34, 0.5));
    }

    &.game-TEKKEN .game-name {
        font-size: 12svw;
        line-height: 10svw;
    }

    &.game-2XKO .game-name,
    &.game-MORTAL_KOMBAT .game-name,
    &.game-MORTAL_KOMBAT_1 .game-name,
    &.game-STREET_FIGHTER_6 .game-name {
        font-size: 14svw;
        line-height: 11svw;
    }
}

.flavor-text {
    color: #fff;
    font-size: 5svw;
    font-weight: 400;
    opacity: 0.9;
    margin-bottom: 24px;
    margin-top: 16px;
}

.event-name {
    font-size: 22svw;
    font-family: 'Staatliches';
    line-height: 16.5svw;
    text-align: center;
    width: 100%;

    .edition {
        color: constants.$text-color;
    }
}

.game-name-extra {
    font-size: 6svw;
    font-weight: 700;
    color: constants.$text-color;
    margin-top: -32px;
}

.game-name {
    font-size: 10svw;
    line-height: 9.5svw;
    font-weight: 800;
}

.title {
    //text-align: center;
    color: #fff;
    width: 100%;
}
</style>
