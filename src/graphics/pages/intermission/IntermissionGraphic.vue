<template>
    <div
        class="intermission-layout"
        :class="`game-${runtimeConfigStore.runtimeConfig.game}`"
    >
        <div class="logo">
            <img src="../../assets/flask-solid.png" />
            <div>
                <div>Yo Mana</div>
                <div>
                    <template v-if="runtimeConfigStore.runtimeConfig.game === 'MORTAL_KOMBAT'">
                        MK11
                    </template>
                    <template v-if="runtimeConfigStore.runtimeConfig.game === 'TEKKEN'">
                        Tekken
                    </template>
                    <template v-if="runtimeConfigStore.runtimeConfig.game === 'SMASH'">
                        Ultimate
                    </template>
                </div>
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
.intermission-layout {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    &.game-SMASH .logo > div {
        > *:nth-child(2) {
            font-size: 200px;
            line-height: 112px;
        }
    }
}

.flavor-text {
    color: #fff;
    font-size: 80px;
    margin-top: 32px;
}

.logo {
    display: flex;
    align-items: center;
    color: #fff;
    margin-top: -16px;

    img {
        width: 256px;
        height: 256px;
    }

    > div {
        margin-left: 32px;

        > *:first-child {
            font-size: 80px;
            margin-top: -50px;
        }

        > *:nth-child(2) {
            font-size: 250px;
            font-weight: 700;
            line-height: 150px;
        }
    }
}
</style>
