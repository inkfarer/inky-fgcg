<template>
    <error-display class="m-b-8" />
    <ipl-space>
        <ipl-small-toggle
            v-model="showOnStream"
            label="Show on Stream"
        />
    </ipl-space>
    <ipl-space class="m-t-8">
        <div class="layout horizontal">
            <entrant-select
                v-model="entrantA"
                label="Entrant A"
            />
            <entrant-select
                v-model="entrantB"
                label="Entrant B"
                class="m-l-8"
            />
        </div>
        <ipl-input
            v-model="matchName"
            class="m-t-8"
            label="Match Name"
            name="matchName"
        />
        <ipl-radio
            :model-value="String(numberOfGames)"
            :options="numberOfGamesOptions"
            label="Number of Games"
            name="numberOfGames"
            class="m-t-8"
            @update:model-value="numberOfGames = Number($event)"
        />
        <ipl-button
            label="Update"
            :color="isChanged ? 'red' : 'blue'"
            class="m-t-8"
            @click="onUpdate"
        />
    </ipl-space>
</template>

<script setup lang="ts">
import { useNextMatchStore } from 'client-shared/store/NextMatchStore';
import { IplButton, IplInput, IplRadio, IplSmallToggle, IplSpace } from '@iplsplatoon/vue-components';
import EntrantSelect from '../../components/EntrantSelect.vue';
import { computed, ref } from 'vue';
import { Entrant } from 'types/schemas';
import { updateRefOnValueChange } from 'client-shared/store/StoreHelper';
import { sendMessage } from 'client-shared/helpers/NodecgHelper';
import ErrorDisplay from '../../components/ErrorDisplay.vue';

const nextMatchStore = useNextMatchStore();

const entrantA = ref<Entrant | null>(null);
const entrantB = ref<Entrant | null>(null);
const matchName = ref<string>('');
const numberOfGames = ref<number>(3);
const showOnStream = computed({
    get() {
        return nextMatchStore.nextMatch.showOnStream;
    },
    set(newValue: boolean) {
        nextMatchStore.setShowOnStream(newValue);
    }
});

updateRefOnValueChange(() => nextMatchStore.nextMatch.entrantA, entrantA);
updateRefOnValueChange(() => nextMatchStore.nextMatch.entrantB, entrantB);
updateRefOnValueChange(() => nextMatchStore.nextMatch.match.name, matchName);
updateRefOnValueChange(() => nextMatchStore.nextMatch.match.numberOfGames, numberOfGames);

const numberOfGamesOptions = [
    { name: '3', value: '3' },
    { name: '5', value: '5' },
    { name: '7', value: '7' }
]

const isChanged = computed(() =>
    entrantA.value?.id !== nextMatchStore.nextMatch.entrantA.id
    || entrantB.value?.id !== nextMatchStore.nextMatch.entrantB.id
    || matchName.value !== nextMatchStore.nextMatch.match.name
    || numberOfGames.value !== nextMatchStore.nextMatch.match.numberOfGames
);

async function onUpdate() {
    if (entrantA.value == null || entrantB.value == null) return;

    await sendMessage('nextMatch:update', {
        entrantAId: entrantA.value.id,
        entrantBId: entrantB.value.id,
        matchName: matchName.value,
        numberOfGames: numberOfGames.value
    });
}
</script>
