<template>
    <ipl-expanding-space :key="caster.id">
        <template #header-extra>
            <font-awesome-icon
                v-if="!props.unsaved"
                icon="grip-vertical"
                class="caster-elem-grip"
            />
        </template>
        <template #title>
            {{ internalCaster.name }}
            <ipl-badge v-show="!isBlank(internalCaster.pronouns)">{{ internalCaster.pronouns }}</ipl-badge>
            <ipl-badge
                v-if="props.unsaved"
                color="red"
            >
                Unsaved
            </ipl-badge>
        </template>
        <ipl-input
            v-model="internalCaster.name"
            label="Name"
            name="name"
        />
        <ipl-input
            v-model="internalCaster.pronouns"
            label="Pronouns"
            name="pronouns"
        />
        <ipl-select
            v-model="internalCaster.socials[0].type"
            label="Social type"
            :options="casterSocialOptions"
        />
        <ipl-input
            v-model="internalCaster.socials[0].username"
            label="Social username"
            name="username"
        />
        <div class="layout horizontal m-t-8">
            <ipl-button
                :label="props.unsaved ? 'Save' : 'Update'"
                :color="props.unsaved ? 'green' : isChanged ? 'red' : 'blue'"
                @click="onSave"
            />
            <ipl-button
                icon="times"
                color="red"
                class="m-l-8"
                @click="onRemove"
            />
        </div>
    </ipl-expanding-space>
</template>

<script setup lang="ts">
import { Casters } from 'types/schemas';
import { sendMessage } from 'client-shared/helpers/NodecgHelper';
import { computed, ref, watch } from 'vue';
import { IplBadge, IplExpandingSpace, IplInput, IplButton, IplSelect } from '@iplsplatoon/vue-components';
import { isBlank } from '@iplsplatoon/vue-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons/faGripVertical';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import cloneDeep from 'lodash/cloneDeep';

library.add(faTimes, faGripVertical);

const props = withDefaults(defineProps<{
    caster: Casters['items'][number]
    unsaved?: boolean
}>(), {
    unsaved: false
});

function normalizeCaster(caster: Casters['items'][number]) {
    return {
        ...cloneDeep(caster),
        socials: caster.socials.length === 0
            ? [{
                type: 'none',
                username: ''
            }]
            : cloneDeep(caster.socials)
    };
}

const internalCaster = ref<Casters['items'][number]>(normalizeCaster(props.caster));
watch(() => props.caster, newValue => {
    internalCaster.value = normalizeCaster(newValue);
});

const casterSocialOptions = [
    { name: 'Twitter', value: 'twitter' },
    { name: 'Bluesky', value: 'bluesky' },
    { name: 'Twitch', value: 'twitch' },
    { name: 'None', value: 'none' }
];

const isChanged = computed(() => {
    if (!props.unsaved && (props.caster.name !== internalCaster.value.name || props.caster.pronouns !== internalCaster.value.pronouns)) {
        return true;
    }

    if (props.caster.socials.length === 0) {
        return !isBlank(internalCaster.value.socials[0].username);
    }

    return props.caster.socials.length !== internalCaster.value.socials.length
        || props.caster.socials.some((caster, i) =>
            internalCaster.value.socials[i].type !== caster.type
            || internalCaster.value.socials[i].username !== caster.username);
});

async function onSave() {
    const newCaster = cloneDeep(internalCaster.value);
    // @ts-ignore
    delete newCaster.unsaved;
    if (props.unsaved) {
        const newId = await sendMessage('casters:insert', newCaster);
        emit('save', newId);
    } else {
        await sendMessage('casters:update', newCaster);
    }
}

function onRemove() {
    emit('remove');
}

const emit = defineEmits<{
    (event: 'save', id: string): void
    (event: 'remove'): void
}>();
</script>

<style lang="scss" scoped>
.caster-elem-grip {
    color: var(--ipl-input-color);
    margin: 0 4px;
    position: relative;
}
</style>
