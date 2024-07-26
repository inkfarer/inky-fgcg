<template>
    <error-display class="m-b-8" />
    <ipl-space>
        <ipl-button
            label="Add caster"
            color="green"
            @click="addUnsavedCaster"
        />
    </ipl-space>
    <ipl-expanding-space-group v-model="selectedCaster">
        <caster-editor
            v-for="caster in casterStore.casters"
            :caster="caster"
            :key="caster.id"
            class="m-t-8"
            @remove="sendMessage('casters:remove', caster.id)"
        />
        <caster-editor
            v-for="caster in unsavedCasters"
            :caster="caster"
            :key="caster.id"
            unsaved
            class="m-t-8"
            @remove="removeUnsavedCaster(caster.id)"
            @save="onUnsavedCasterSave($event, caster.id)"
        />
    </ipl-expanding-space-group>
</template>

<script setup lang="ts">
import { IplButton, IplExpandingSpaceGroup, IplSpace } from '@iplsplatoon/vue-components';
import { useCasterStore } from 'client-shared/store/CasterStore';
import { Casters } from 'types/schemas';
import { ref } from 'vue';
import { v4 as uuidV4 } from 'uuid';
import CasterEditor from './CasterEditor.vue';
import { sendMessage } from 'client-shared/helpers/NodecgHelper';
import ErrorDisplay from '../../components/ErrorDisplay.vue';

const casterStore = useCasterStore();
const unsavedCasters = ref<Casters>([]);
const selectedCaster = ref<string | null>(null);

function addUnsavedCaster() {
    const newCasterId = uuidV4();
    unsavedCasters.value.push({
        id: newCasterId,
        name: 'New Caster',
        pronouns: '',
        socials: []
    });
    selectedCaster.value = newCasterId;
}

function onUnsavedCasterSave(newCasterId: string, unsavedCasterId: string) {
    removeUnsavedCaster(unsavedCasterId);
    selectedCaster.value = newCasterId;
}

function removeUnsavedCaster(id: string) {
    const casterIndex = unsavedCasters.value.findIndex(caster => caster.id === id);
    if (casterIndex !== -1) {
        unsavedCasters.value.splice(casterIndex, 1);
    }
}
</script>
