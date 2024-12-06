<template>
    <div
        class="entrant"
        :class="`entrant-${props.entrant.toLowerCase()}`"
    >
        <div class="entrant-score">
            {{ entrant.score }}
        </div>
        <div class="entrant-name">
            <fitted-content :align="props.entrant === 'A' ? 'right' : 'left'">
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
    width: 450px;
    height: 56px;
    color: constants.$text-color-2;
    display: flex;
    position: relative;
    overflow: hidden;

    &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        opacity: 0.25;
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

    .entrant-score {
        background-color: constants.$accent-1c;
        color: constants.$text-color-2;
        font-weight: 600;
        font-size: 45px;
        line-height: 55px;
        min-width: 68px;
        text-align: center;
        border: 0 solid constants.$neutral-2;
    }

    &.entrant-a {
        background: linear-gradient(300deg, constants.$accent-1a 0%, constants.$accent-1b 100%);
        flex-direction: row-reverse;
        border-bottom-left-radius: 12px;

        &:after {
            background:
                linear-gradient(to bottom, transparent 0%, transparent 20%, transparent 80%, #fff 100%),
                linear-gradient(to right, #fff 0%, transparent 2%);
        }

        .entrant-score {
            border-right-width: 8px;
            border-bottom-left-radius: 8px;
        }
    }

    &.entrant-b {
        background: linear-gradient(60deg, constants.$accent-1a 0%, constants.$accent-1b 100%);
        border-bottom-right-radius: 12px;

        &:after {
            background:
                linear-gradient(to bottom, transparent 0%, transparent 20%, transparent 80%, #fff 100%),
                linear-gradient(to left, #fff 0%, transparent 2%);
        }

        .entrant-score {
            border-left-width: 8px;
            border-bottom-right-radius: 8px;
        }
    }
}
</style>
