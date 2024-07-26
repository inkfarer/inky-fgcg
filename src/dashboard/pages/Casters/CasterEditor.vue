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
import { computed, ref } from 'vue';
import { updateRefOnValueChange } from 'client-shared/store/StoreHelper';
import { IplBadge, IplExpandingSpace, IplInput, IplButton } from '@iplsplatoon/vue-components';
import { isBlank } from '@iplsplatoon/vue-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons/faGripVertical';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faTimes, faGripVertical);

const props = withDefaults(defineProps<{
    caster: Casters[number]
    unsaved?: boolean
}>(), {
    unsaved: false
});

const internalCaster = ref<Casters[number]>(props.caster);
updateRefOnValueChange(() => props.caster, internalCaster, true);

const isChanged = computed(() =>
    !props.unsaved &&
    (props.caster.name !== internalCaster.value.name
    || props.caster.pronouns !== internalCaster.value.pronouns
    || props.caster.socials.length !== internalCaster.value.socials.length
    || props.caster.socials.some((social, i) => {
        const internalCasterSocial = internalCaster.value.socials[i];
        return internalCasterSocial.type !== social.type || internalCasterSocial.username !== social.username;
    })))

async function onSave() {
    if (props.unsaved) {
        const newId = await sendMessage('casters:insert', internalCaster.value);
        emit('save', newId);
    } else {
        await sendMessage('casters:update', internalCaster.value);
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
