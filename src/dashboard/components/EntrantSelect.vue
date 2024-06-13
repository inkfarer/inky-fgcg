<template>
    <ipl-select
        :model-value="props.modelValue?.id ?? null"
        :options="entrantOptions"
        :label="props.label"
        @update:model-value="onEntrantSelect"
    />
</template>

<script setup lang="ts">
import { useEntrantStore } from 'client-shared/store/EntrantStore';
import { computed } from 'vue';
import { IplSelect } from '@iplsplatoon/vue-components';
import { Entrant } from 'types/schemas';

const entrantStore = useEntrantStore();
const entrantOptions = computed(() => entrantStore.entrants.map(entrant => ({
    name: entrant.name,
    value: entrant.id,
    entrant
})));

const props = withDefaults(defineProps<{
    modelValue?: Entrant | null
    label?: string
}>(), {
    modelValue: null
});

const emit = defineEmits<{
    'update:modelValue': [newValue: Entrant | null]
}>();

function onEntrantSelect(_value: string, entrant: { entrant: Entrant }) {
    emit('update:modelValue', entrant.entrant);
}
</script>
