<template>
    <div
        class="intermission-layout"
        :class="`game-${runtimeConfigStore.runtimeConfig.game}`"
    >
        <div class="event-name">
            Wintercon <span class="edition">IX</span>
        </div>
        <div class="content">
            <div class="title">

                <div class="game-name">
                    <template v-if="runtimeConfigStore.runtimeConfig.game === 'MORTAL_KOMBAT'">
                        MK11
                    </template>
                    <template v-else-if="runtimeConfigStore.runtimeConfig.game === 'TEKKEN'">
                        Tekken 8
                    </template>
                    <template v-else-if="runtimeConfigStore.runtimeConfig.game === 'SMASH'">
                        Ultimate
                    </template>
                    <template v-else-if="runtimeConfigStore.runtimeConfig.game === 'STREET_FIGHTER_6'">
                        Street Fighter 6
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
    }

    &.game-TEKKEN .game-name {
        font-size: 12svw;
        line-height: 10svw;
    }
}

.flavor-text {
    color: #fff;
    font-size: 5svw;
    font-weight: 400;
    font-family: 'Montserrat';
    opacity: 0.9;
    margin-bottom: 24px;
    margin-top: 16px;
}

.event-name {
    font-size: 21svw;
    font-family: 'Staatliches';
    line-height: 16.5svw;
    text-align: center;
    width: 100%;

    .edition {
        color: constants.$text-color-accent;
    }
}

.game-name-extra {
    font-family: 'Montserrat';
    font-size: 6svw;
    font-weight: 700;
    color: constants.$text-color-accent;
    margin-top: -32px;
}

.game-name {
    font-size: 10svw;
    line-height: 9.5svw;
    font-family: 'Montserrat';
    font-weight: 800;
}

.title {
    //text-align: center;
    color: #fff;
    width: 100%;
}
</style>
