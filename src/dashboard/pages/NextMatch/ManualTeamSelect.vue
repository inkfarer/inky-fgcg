<template>
    <ipl-space>
        <div class="entrant-selects">
            <entrant-select
                v-for="i of entrantCount"
                v-model="entrants[i - 1]"
                :label="`Entrant ${String.fromCharCode(64 + i)}`"
                :optional="i > 2"
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
            :disabled="!allowUpdate"
            class="m-t-8"
            @click="onUpdate"
        />
    </ipl-space>
</template>

<script setup lang="ts">
import { IplButton, IplInput, IplRadio, IplSpace } from '@iplsplatoon/vue-components';
import EntrantSelect from '../../components/EntrantSelect.vue';
import { updateRefOnValueChange } from 'client-shared/store/StoreHelper';
import { useNextMatchStore } from 'client-shared/store/NextMatchStore';
import { computed, ref, watch } from 'vue';
import { Entrant } from 'types/schemas';
import { sendMessage } from 'client-shared/helpers/NodecgHelper';
import { isBlank } from 'client-shared/helpers/StringHelper';
import cloneDeep from 'lodash/cloneDeep';
import { useRuntimeConfigStore } from 'client-shared/store/RuntimeConfigStore';

const runtimeConfigStore = useRuntimeConfigStore();
const nextMatchStore = useNextMatchStore();

const numberOfGamesOptions = [
    { name: '3', value: '3' },
    { name: '5', value: '5' },
    { name: '7', value: '7' }
];

const entrantCount = computed(() => runtimeConfigStore.runtimeConfig.game === 'SONIC_RACING_CROSSWORLDS' ? 4 : 2);
const entrants = ref<(Entrant | null)[]>([null, null]);
const matchName = ref<string>('');
const numberOfGames = ref<number>(3);

watch(() => [nextMatchStore.nextMatch.entrants, entrantCount.value] as [Entrant[], number], (newValue) => {
    entrants.value = cloneDeep(newValue[0].slice(0, newValue[1]));
}, { immediate: true });

updateRefOnValueChange(() => nextMatchStore.nextMatch.match.name, matchName);
updateRefOnValueChange(() => nextMatchStore.nextMatch.match.numberOfGames, numberOfGames);

const isChanged = computed(() =>
    entrants.value.length !== nextMatchStore.nextMatch.entrants.length
    || entrants.value.some((incomingEntrant, i) => nextMatchStore.nextMatch.entrants[i].id !== incomingEntrant?.id)
    || matchName.value !== nextMatchStore.nextMatch.match.name
    || numberOfGames.value !== nextMatchStore.nextMatch.match.numberOfGames
);

const allowUpdate = computed(() => entrants.value.filter((entrant) => entrant != null).length >= 2 && !isBlank(matchName.value));

async function onUpdate() {
    const entrantIds = entrants.value.filter((entrant) => entrant != null).map((entrant) => entrant!.id);
    if (entrantIds.length < 2) return;

    await sendMessage('nextMatch:update', {
        entrantIds,
        matchName: matchName.value,
        numberOfGames: numberOfGames.value,
        playType: 'BEST_OF'
    });
}
</script>

<style lang="scss" scoped>
.entrant-selects {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
}
</style>
