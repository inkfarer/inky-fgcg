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
        <draggable
            :list="allCasters"
            item-key="id"
            handle=".caster-elem-grip"
            data-test="casters-draggable"
            @end="onMove"
        >
            <template #item="{ element }">
                <caster-editor
                    :key="element.id"
                    :caster="element"
                    :unsaved="element.unsaved"
                    class="m-t-8"
                    @remove="element.unsaved ? removeUnsavedCaster(element.id) : sendMessage('casters:remove', element.id)"
                    @save="onUnsavedCasterSave($event, element.id)"
                />
            </template>
        </draggable>
    </ipl-expanding-space-group>
</template>

<script setup lang="ts">
import { IplButton, IplExpandingSpaceGroup, IplSpace } from '@iplsplatoon/vue-components';
import { useCasterStore } from 'client-shared/store/CasterStore';
import { Casters } from 'types/schemas';
import { computed, ref, watchEffect } from 'vue';
import { v4 as uuidV4 } from 'uuid';
import CasterEditor from './CasterEditor.vue';
import { sendMessage } from 'client-shared/helpers/NodecgHelper';
import ErrorDisplay from '../../components/ErrorDisplay.vue';
import Draggable from 'vuedraggable';

const casterStore = useCasterStore();
const unsavedCasters = ref<Casters>([]);
const selectedCaster = ref<string | null>(null);

const allCasters = ref<Array<Casters[number] & { unsaved: boolean }>>([]);
watchEffect(() => {
    const result: Array<Casters[number] & { unsaved: boolean }> = [];
    casterStore.casters.forEach(caster => {
        result.push({ ...caster, unsaved: false });
    });
    unsavedCasters.value.forEach(caster => {
        result.push({ ...caster, unsaved: true });
    });
    allCasters.value = result;
});


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

async function onMove() {
    await sendMessage('casters:setOrder', allCasters.value
        .filter(caster => !caster.unsaved)
        .map(caster => caster.id));
}
</script>
