<template>
    <div
        class="intermission-layout"
        :class="`game-${runtimeConfigStore.runtimeConfig.game}`"
    >
        <div class="logo">
            <img src="../../assets/bfgl-logo-white.png" />
            <div>
                <div class="game-name">
                    <template v-if="runtimeConfigStore.runtimeConfig.game === 'MORTAL_KOMBAT'">
                        MK11
                    </template>
                    <template v-else-if="runtimeConfigStore.runtimeConfig.game === 'TEKKEN'">
                        Tekken 8
                    </template>
                    <template v-else-if="runtimeConfigStore.runtimeConfig.game === 'TEKKEN_BALL'">
                        Tekken Ball
                    </template>
                    <template v-else-if="runtimeConfigStore.runtimeConfig.game === 'SSBU'">
                        Ultimate
                    </template>
                    <template v-else-if="runtimeConfigStore.runtimeConfig.game === 'SSBM'">
                        MELEE
                    </template>
                    <template v-else-if="runtimeConfigStore.runtimeConfig.game === 'STREET_FIGHTER_6'">
                        SF6
                    </template>
                    <template v-else-if="runtimeConfigStore.runtimeConfig.game === 'MORTAL_KOMBAT_1'">
                        MK1
                    </template>
                    <template v-else-if="runtimeConfigStore.runtimeConfig.game === 'GGST'">
                        Strive
                    </template>
                    <template v-else-if="runtimeConfigStore.runtimeConfig.game === '2XKO'">
                        2XKO
                    </template>
                    <template v-else-if="runtimeConfigStore.runtimeConfig.game === 'MARVEL_TOKON'">
                        Marvel<br>Tokon
                    </template>
                    <template v-else-if="runtimeConfigStore.runtimeConfig.game === 'BLAZBLUE_CROSS_TAG_BATTLE'">
                        BlazBlue:<br>Cross Tag<br>Battle
                    </template>
                    <template v-else-if="runtimeConfigStore.runtimeConfig.game === 'BLAZBLUE_CENTRAL_FICTION'">
                        BlazBlue:<br>Central<br>Fiction
                    </template>
                    <template v-else-if="runtimeConfigStore.runtimeConfig.game === 'LETHAL_LEAGUE_BLAZE'">
                        Lethal<br>League<br>Blaze
                    </template>
                    <template v-else-if="runtimeConfigStore.runtimeConfig.game === 'MAIDEN_SPELL'">
                        Maiden<br>& Spell
                    </template>
                    <template v-else-if="runtimeConfigStore.runtimeConfig.game === 'SONIC_RACING_CROSSWORLDS'">
                        Sonic Racing:<br>CrossWorlds
                    </template>
                    <template v-else-if="runtimeConfigStore.runtimeConfig.game === 'FF_COTW'">
                        Fatal Fury:<br>CotW
                    </template>
                </div>
                <div class="host-name">at UniCon 2026</div>
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
        > .game-name {
            font-size: 200px;
            line-height: 130px;
        }
    }

    &.game-STREET_FIGHTER_6 .game-name {
        font-size: 300px;
    }

    &.game-MAIDEN_SPELL .game-name {
        font-size: 225px;
        margin-bottom: 35px;
    }

    &.game-LETHAL_LEAGUE_BLAZE .game-name,
    &.game-BLAZBLUE_CROSS_TAG_BATTLE .game-name,
    &.game-BLAZBLUE_CENTRAL_FICTION .game-name {
        font-size: 200px;
    }

    &.game-SONIC_RACING_CROSSWORLDS .game-name {
        font-size: 200px;
        line-height: 95%;
    }

    &.game-FF_COTW .game-name {
        font-size: 200px;
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

        > .host-name {
            font-size: 80px;
        }

        > .game-name {
            font-size: 250px;
            font-weight: 700;
            line-height: 80%;
            margin-top: 40px;
        }
    }
}
</style>
