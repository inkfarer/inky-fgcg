<template>
    <div
        class="entrant"
        :class="`entrant-${props.entrant.toLowerCase()}`"
    >
        <div class="entrant-score-wrapper">
            <div class="entrant-score">
                <span class="entrant-score-text">{{ entrant.score }}</span>
            </div>
        </div>
        <div class="entrant-name">
            <fitted-content align="center">
                <opacity-swap-transition>
                    <span :key="`${entrant.name}_${entrant.prefix}`">
                        <span class="prefix">{{ $helpers.addDots(entrant.prefix) }}</span>
                        {{ $helpers.addDots(entrant.name) }}
                    </span>
                </opacity-swap-transition>
            </fitted-content>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useActiveMatchStore } from 'client-shared/store/ActiveMatchStore';
import FittedContent from 'components/FittedContent.vue';
import OpacitySwapTransition from 'components/OpacitySwapTransition.vue';

const props = defineProps<{
    entrant: 'A' | 'B'
}>();

const activeMatchStore = useActiveMatchStore();
const entrant = computed(() => {
    const entrantData = props.entrant === 'A' ? activeMatchStore.activeMatch.entrantA : activeMatchStore.activeMatch.entrantB;
    if (entrantData.participants.length <= 0) {
        return {
            name: entrantData.name,
            prefix: null,
            score: entrantData.score
        }
    } else {
        const participant = entrantData.participants[0];

        return {
            name: participant.name,
            prefix: participant.prefix,
            score: entrantData.score
        }
    }
});
</script>

<style scoped lang="scss">
@use '../../styles/constants';

.entrant {
    width: 475px;
    height: 56px;
    color: constants.$text-color-2;
    display: flex;
    position: relative;
    background-color: constants.$accent-1a;

    &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        opacity: 0.05;
        mix-blend-mode: soft-light;
    }

    .entrant-name {
        font-size: 35px;
        padding: 0 16px;
        font-weight: 500;
        flex-grow: 1;
        min-width: 0;
        display: flex;
        align-items: center;
        position: relative;

        > * {
            width: 100%;
        }
    }

    .prefix {
        color: constants.$text-color-low-emphasis;
        font-size: 0.8em;
        font-weight: 400;
    }

    .entrant-score-wrapper {
        min-width: 68px;
        height: 100%;
    }

    .entrant-score {
        background-color: constants.$accent-1b;
        color: constants.$text-color-2;
        font-weight: 600;
        font-size: 45px;
        line-height: 55px;
        text-align: center;
        height: 100%;
    }

    .entrant-score-text {
        filter: drop-shadow(1px 1px 4px constants.$drop-shadow);
        display: inline-block;
    }

    &.entrant-a {
        flex-direction: row-reverse;
        border-bottom-left-radius: 12px;
        border-top-left-radius: 12px;
        margin-right: 12px;

        &:after {
            background:
                linear-gradient(to bottom, transparent 0%, transparent 35%, transparent 80%, #fff 100%),
                linear-gradient(to right, #fff 0%, transparent 4%);
        }

        .entrant-score {
            padding-left: 6px;
            clip-path: polygon(85% 0%, 100% 50%, 85% 100%, 0% 100%, 15% 50%, 0% 0%);
            transform: translateX(8px);
        }

        .entrant-score-text {
            transform: translateX(-2px);
        }

        .entrant-score-wrapper {
            filter: drop-shadow(-2px 1px 4px constants.$drop-shadow);
        }
    }

    &.entrant-b {
        border-bottom-right-radius: 12px;
        border-top-right-radius: 12px;
        margin-left: 12px;

        &:after {
            background:
                linear-gradient(to bottom, transparent 0%, transparent 35%, transparent 80%, #fff 100%),
                linear-gradient(to left, #fff 0%, transparent 4%);
        }

        .entrant-score {
            padding-right: 6px;
            clip-path: polygon(100% 0%, 85% 50%, 100% 100%, 15% 100%, 0% 50%, 15% 0%);
            transform: translateX(-8px);
        }

        .entrant-score-text {
            transform: translateX(2px);
        }

        .entrant-score-wrapper {
            filter: drop-shadow(2px 1px 4px constants.$drop-shadow);
        }
    }
}
</style>
