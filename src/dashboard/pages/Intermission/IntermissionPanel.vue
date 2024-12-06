<template>
    <ipl-space>
        <ipl-input
            v-model="bottomBarFlavorText"
            label="Bottom bar flavor text"
            name="bottomBarFlavorText"
        />
        <ipl-button
            class="m-t-8"
            label="Update"
            :color="bottomBarChanged ? 'red' : 'blue'"
            @click="onBottomBarUpdate"
        />
    </ipl-space>
    <ipl-space
        class="m-t-8"
    >
        <ipl-input
            v-model="intermissionFlavorText"
            label="Intermission flavor text"
            name="intermissionFlavorText"
        />
        <ipl-button
            class="m-t-8"
            label="Update"
            :color="intermissionChanged ? 'red' : 'blue'"
            @click="onIntermissionUpdate"
        />
    </ipl-space>
</template>

<script setup lang="ts">
import { updateRefOnValueChange } from 'client-shared/store/StoreHelper';
import { computed, ref } from 'vue';
import { useIntermissionStore } from 'client-shared/store/IntermissionStore';
import { IplButton, IplInput, IplSpace } from '@iplsplatoon/vue-components';

const intermissionStore = useIntermissionStore();

const bottomBarFlavorText = ref('');
const intermissionFlavorText = ref('');

updateRefOnValueChange(() => intermissionStore.bottomBarData.flavorText, bottomBarFlavorText);
updateRefOnValueChange(() => intermissionStore.intermissionData.flavorText, intermissionFlavorText);

const bottomBarChanged = computed(() => bottomBarFlavorText.value !== intermissionStore.bottomBarData.flavorText);
const intermissionChanged = computed(() => intermissionFlavorText.value !== intermissionStore.intermissionData.flavorText);

function onBottomBarUpdate() {
    intermissionStore.setBottomBarFlavorText(bottomBarFlavorText.value);
}
function onIntermissionUpdate() {
    intermissionStore.setIntermissionFlavorText(intermissionFlavorText.value);
}
</script>
