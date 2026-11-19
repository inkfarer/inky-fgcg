<template>
    <ipl-space>
        <ipl-select
            v-model="game"
            label="Game"
            name="game"
            :options="gameOptions"
        />
        <ipl-button
            class="m-t-8"
            label="Update"
            :color="game !== runtimeConfigStore.runtimeConfig.game ? 'red' : 'blue'"
            @click="runtimeConfigStore.setGame(game)"
        />
    </ipl-space>
    <ipl-space class="m-t-8">
        <ipl-small-toggle
            :model-value="runtimeConfigStore.runtimeConfig.allowAnyScore"
            label="Allow arbitrary non-negative scores"
            @update:model-value="runtimeConfigStore.setAllowAnyScore($event)"
        />
    </ipl-space>
</template>

<script setup lang="ts">
import { Option } from '@iplsplatoon/vue-components/dist/types/select';
import { useRuntimeConfigStore } from 'client-shared/store/RuntimeConfigStore';
import { Ref, ref } from 'vue';
import { IplButton, IplSelect, IplSmallToggle, IplSpace } from '@iplsplatoon/vue-components';
import { updateRefOnValueChange } from 'client-shared/store/StoreHelper';
import { RuntimeConfig } from 'types/schemas';

const runtimeConfigStore = useRuntimeConfigStore();

const gameOptions: Option[] = [
    { name: 'Tekken', value: 'TEKKEN' },
    { name: 'Tekken Ball', value: 'TEKKEN_BALL' },
    { name: 'Dancepad Tekken', value: 'TEKKEN_DANCEPAD' },
    { name: 'Mortal Kombat 11', value: 'MORTAL_KOMBAT' },
    { name: 'Mortal Kombat 1', value: 'MORTAL_KOMBAT_1' },
    { name: 'Smash Ultimate', value: 'SSBU' },
    { name: 'Smash Melee', value: 'SSBM' },
    { name: 'Street Fighter 6', value: 'STREET_FIGHTER_6' },
    { name: '2XKO', value: '2XKO' },
    { name: 'Guilty Gear: Strive', value: 'GGST' },
    { name: 'Guilty Gear Xrd REV2', value: 'GG_XRD_REV2' },
    { name: 'Maiden & Spell', value: 'MAIDEN_SPELL' },
    { name: 'Lethal League Blaze', value: 'LETHAL_LEAGUE_BLAZE' },
    { name: 'BlazBlue: Cross Tag Battle', value: 'BLAZBLUE_CROSS_TAG_BATTLE' },
    { name: 'BlazBlue: Central Fiction', value: 'BLAZBLUE_CENTRAL_FICTION' },
    { name: 'Marvel Tōkon', value: 'MARVEL_TOKON' },
    { name: 'Sonic Racing: CrossWorlds', value: 'SONIC_RACING_CROSSWORLDS' },
    { name: 'Fatal Fury: City of the Wolves', value: 'FF_COTW' },
    { name: 'Avatar Legends: The Fighting Game', value: 'AVATAR_LEGENDS' },
    { name: 'The King of Fighters XV', value: 'KOF_15' },
    { name: 'SOULCALIBUR VI', value: 'SOULCALIBUR_6' },
    { name: 'Naruto Shippuden: Clash of Ninja Revolution 3', value: 'NARUTO_SHIPPUDEN_CONR3' },
    { name: 'Under Night In-Birth II [Sys:Celes]', value: 'UNDER_NIGHT_IN_BIRTH_2' },
    { name: 'Granblue Fantasy Versus: Rising', value: 'GRANBLUE_FANTASY_VERSUS_RISING' },
    { name: 'Killer Instinct', value: 'KILLER_INSTINCT' },
    { name: 'Resistance 204X', value: 'RESISTANCE_204X' },
    { name: 'Uma Musume: Pretty Derby', value: 'UMA_MUSUME' },
    { name: 'Mystery Game', value: 'MYSTERY_GAME' }
];

const game = ref('') as unknown as Ref<RuntimeConfig['game']>;
updateRefOnValueChange(() => runtimeConfigStore.runtimeConfig.game, game);


</script>
