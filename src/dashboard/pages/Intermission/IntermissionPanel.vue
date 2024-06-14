<template>
    <ipl-space>
        <ipl-input
            v-model="bottomBarFlavorText"
            label="Bottom Bar Flavor Text"
            name="bottomBarFlavorText"
        />
        <ipl-button
            class="m-t-8"
            label="Update"
            :color="isChanged ? 'red' : 'blue'"
            @click="onUpdate"
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

updateRefOnValueChange(() => intermissionStore.bottomBarData.flavorText, bottomBarFlavorText);

const isChanged = computed(() => bottomBarFlavorText.value !== intermissionStore.bottomBarData.flavorText);

function onUpdate() {
    intermissionStore.setBottomBarFlavorText(bottomBarFlavorText.value);
}
</script>
