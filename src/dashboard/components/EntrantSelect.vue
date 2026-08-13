<template>
    <ipl-select
        :model-value="props.modelValue?.id ?? null"
        :options="entrantOptions as unknown as SelectOptions"
        :label="props.label"
        @update:model-value="onEntrantSelect"
    />
</template>

<script setup lang="ts">
import { useEntrantStore } from 'client-shared/store/EntrantStore';
import { computed } from 'vue';
import { IplSelect } from '@iplsplatoon/vue-components';
import { Entrant } from 'types/schemas';
import { SelectOptions } from '@iplsplatoon/vue-components/dist/types/select';

const props = withDefaults(defineProps<{
    modelValue?: Entrant | null
    label?: string
    optional?: boolean
}>(), {
    modelValue: null
});

const entrantStore = useEntrantStore();

const entrantOptions = computed(() => {
    const result: { name: string, value: string | null, entrant: Entrant | null }[] = entrantStore.entrants.map(entrant => ({
        name: entrant.name,
        value: entrant.id,
        entrant
    }));

    if (props.optional) {
        result.unshift({
            name: 'None',
            value: null,
            entrant: null
        });
    }

    return result;
});

const emit = defineEmits<{
    'update:modelValue': [newValue: Entrant | null]
}>();

function onEntrantSelect(_value: string, entrant: { entrant: Entrant }) {
    emit('update:modelValue', entrant.entrant);
}
</script>
