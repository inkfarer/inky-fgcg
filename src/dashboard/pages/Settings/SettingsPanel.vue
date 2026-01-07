<template>
    <ipl-space>
        <ipl-radio
            v-model="game"
            label="Game"
            name="game"
            :options="gameOptions"
        />
    </ipl-space>
</template>

<script setup lang="ts">
import { Option } from '@iplsplatoon/vue-components/dist/types/select';
import { useRuntimeConfigStore } from 'client-shared/store/RuntimeConfigStore';
import { computed } from 'vue';
import { RuntimeConfig } from 'types/schemas';
import { IplRadio, IplSpace } from '@iplsplatoon/vue-components';

const runtimeConfigStore = useRuntimeConfigStore();

const gameOptions: Option[] = [
    { name: 'Tekken', value: 'TEKKEN' },
    { name: 'Mortal Kombat 11', value: 'MORTAL_KOMBAT' },
    { name: 'Smash', value: 'SMASH' },
    { name: 'Street Fighter 6', value: 'STREET_FIGHTER_6' },
    { name: 'Mortal Kombat 1', value: 'MORTAL_KOMBAT_1' },
    { name: '2XKO', value: '2XKO' },
    { name: 'Guilty Gear: Strive', value: 'GGST' }
];

const game = computed({
    get() {
        return runtimeConfigStore.runtimeConfig.game;
    },
    set(newValue: RuntimeConfig['game']) {
        runtimeConfigStore.setGame(newValue);
    }
});
</script>

<style scoped lang="scss">

</style>
