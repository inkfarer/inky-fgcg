<template>
    <div class="intermission-layout">
        <div class="logo">
            <img
                src="../../assets/event-logo.png"
                class="event-logo"
            />
            <opacity-swap-transition>
                <img
                    v-if="gameImage != null"
                    :src="gameImage"
                    :key="gameImage"
                    class="game-image"
                    :class="`game-${runtimeConfigStore.runtimeConfig.game}`"
                />
            </opacity-swap-transition>
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
import { computed } from 'vue';
import { getStaticAsset } from '../../helpers/ImageHelper';

const runtimeConfigStore = useRuntimeConfigStore();
const intermissionStore = useIntermissionStore();

const gameImage = computed(() => {
    let basePath: string | null = null;

    switch (runtimeConfigStore.runtimeConfig.game) {
        case '2XKO':
            basePath = 'games/2XKO.webp';
            break;
        case 'AVATAR_LEGENDS':
            basePath = 'games/AVATAR LEGENDS.webp';
            break;
        case 'BLAZBLUE_CENTRAL_FICTION':
            basePath = 'games/BLAZBLUE.webp';
            break;
        case 'TEKKEN_DANCEPAD':
            basePath = 'games/DANCEPAD TEKKEN.webp';
            break;
        case 'TEKKEN':
            basePath = 'games/TEKKEN 8.webp';
            break;
        case 'TEKKEN_BALL':
            basePath = 'games/TEKKEN BALL.webp';
            break;
        case 'FF_COTW':
            basePath = 'games/FATAL FURY.webp';
            break;
        case 'GRANBLUE_FANTASY_VERSUS_RISING':
            basePath = 'games/GRANBLUE.webp';
            break;
        case 'GGST':
            basePath = 'games/GUILTY GEAR STRIVE.webp';
            break;
        case 'GG_XRD_REV2':
            basePath = 'games/GUILTY GEAR XRD.webp';
            break;
        case 'KILLER_INSTINCT':
            basePath = 'games/KILLER INSTINCT.webp';
            break;
        case 'KOF_15':
            basePath = 'games/KING OF FIGHTERS.webp';
            break;
        case 'MARVEL_TOKON':
            basePath = 'games/MARVEL TOKON.webp';
            break;
        case 'MORTAL_KOMBAT_1':
            basePath = 'games/MORTAL KOMBAT.webp';
            break;
        case 'NARUTO_SHIPPUDEN_CONR3':
            basePath = 'games/NARUTO.webp';
            break;
        case 'RESISTANCE_204X':
            basePath = 'games/RESISTANCE.webp';
            break;
        case 'SSBU':
            basePath = 'games/SMASH BROS.webp';
            break;
        case 'SONIC_RACING_CROSSWORLDS':
            basePath = 'games/SONIC RACING.webp';
            break;
        case 'SOULCALIBUR_6':
            basePath = 'games/SOUL CALIBUR.webp';
            break;
        case 'STREET_FIGHTER_6':
            basePath = 'games/STREET FIGHTER 6.webp';
            break;
        case 'UMA_MUSUME':
            basePath = 'games/UMA MUSUME.webp';
            break;
        case 'UNDER_NIGHT_IN_BIRTH_2':
            basePath = 'games/UNDER NIGHT.webp';
            break;
        case 'MYSTERY_GAME':
            basePath = 'games/mystery-game.webp';
            break;
    }

    return basePath == null ? null : getStaticAsset(basePath);
});
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
}

.flavor-text {
    color: #fff;
    font-size: 80px;
}

.logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    margin-top: -16px;

    .event-logo {
        height: 320px;
    }

    .game-image {
        height: 256px;
        width: 1024px;
        object-fit: contain;
        margin: 16px 0;

        &.game-AVATAR_LEGENDS,
        &.game-GG_XRD_REV2,
        &.game-KILLER_INSTINCT,
        &.game-STREET_FIGHTER_6 {
            height: 288px;
            margin: 0;
        }

        &.game-TEKKEN,
        &.game-2XKO {
            height: 192px;
            width: 800px;
            margin: 48px 0;
        }
    }
}
</style>
