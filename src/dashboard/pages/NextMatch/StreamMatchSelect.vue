<template>
    <div>
        <ipl-space>
            <ipl-multi-select
                v-model="selectedStreamOptions"
                :options="streamOptions"
                label="Stream"
            />
            <ipl-button
                class="m-t-8"
                label="Import"
                async
                :disabled="selectedStreamOptions.length === 0"
                @click="onImport"
            />
        </ipl-space>
        <ipl-space
            v-if="streamMatchOptions.length > 0"
            class="m-t-8"
        >
            <ipl-select
                label="Match"
                :model-value="selectedStreamMatch?.id ?? null"
                :options="streamMatchOptions"
                @update:model-value="(_, option) => selectedStreamMatch = option.match"
            />
            <template v-if="selectedStreamMatch != null">
                <ipl-data-row
                    label="Entrant A"
                    :value="entrantStore.entrantById(selectedStreamMatch.entrantAId)?.name ?? `Unknown entrant ${selectedStreamMatch.entrantAId}`"
                />
                <ipl-data-row
                    label="Entrant B"
                    :value="entrantStore.entrantById(selectedStreamMatch.entrantBId)?.name ?? `Unknown entrant ${selectedStreamMatch.entrantBId}`"
                />
                <ipl-data-row
                    label="Type of play"
                    :value="formatPlayType(selectedStreamMatch.playType, selectedStreamMatch.numberOfGames)"
                />
            </template>
            <ipl-radio
                :model-value="String(numberOfGames)"
                :options="numberOfGamesOptions"
                label="Number of Games"
                name="numberOfGames"
                class="m-t-4"
                @update:model-value="numberOfGames = Number($event)"
            />
            <ipl-input
                v-model="matchName"
                label="Match name"
                name="matchName"
                class="m-t-4"
            />
            <ipl-button
                label="Update"
                :disabled="numberOfGames == null"
                class="m-t-8"
                :color="isChanged ? 'red' : 'blue'"
                @click="onUpdate"
            />
        </ipl-space>
        <ipl-message
            v-else
            class="m-t-8"
            type="info"
        >
            No matches available.
        </ipl-message>
    </div>
</template>

<script setup lang="ts">
import {
    IplButton,
    IplDataRow, IplInput,
    IplMessage,
    IplMultiSelect,
    IplRadio,
    IplSelect,
    IplSpace
} from '@iplsplatoon/vue-components';
import { computed, ref, Ref, watch } from 'vue';
import { useTournamentDataStore } from 'client-shared/store/TournamentDataStore';
import { SelectOptions } from '@iplsplatoon/vue-components/dist/types/select';
import { sendMessage } from 'client-shared/helpers/NodecgHelper';
import { useNextMatchStore } from 'client-shared/store/NextMatchStore';
import { StreamMatches } from 'types/schemas';
import { useEntrantStore } from 'client-shared/store/EntrantStore';
import { formatPlayType } from 'client-shared/helpers/StringHelper';

const entrantStore = useEntrantStore();
const tournamentDataStore = useTournamentDataStore();
const nextMatchStore = useNextMatchStore();

watch(() => (tournamentDataStore.tournamentData.sourceSpecificData?.startgg?.streams ?? []), streams => {
    selectedStreamOptions.value = selectedStreamOptions.value.filter(stream => stream.value === 'all' || streams.some(newStream => String(newStream.id) === stream.value));
});

const selectedStreamOptions: Ref<SelectOptions> = ref([]);
const streamOptions = computed(() => [
    ...((tournamentDataStore.tournamentData.sourceSpecificData?.startgg?.streams ?? []).map(stream => ({
        value: stream.id.toString(),
        name: stream.streamName
    }))),
    {
        name: 'All streams',
        value: 'all'
    }
]);

async function onImport() {
    const streamIds = selectedStreamOptions.value.map(option => Number(option.value)).filter(option => !isNaN(option));
    await sendMessage('nextMatch:getStreamMatches', {
        streamIds,
        getAllMatches: selectedStreamOptions.value.some(option => option.value === 'all')
    });
}

const matchName = ref('');
const numberOfGames = ref<number | null>(null);
const numberOfGamesOptions = [
    { name: '3', value: '3' },
    { name: '5', value: '5' },
    { name: '7', value: '7' }
];

const selectedStreamMatch = ref<StreamMatches[number] | null>(null);
const streamMatchOptions = computed(() => nextMatchStore.streamMatches.map(match => ({
    name: match.matchName,
    value: match.id,
    match
})));
watch(streamMatchOptions, newValue => {
    if (newValue.length === 0) return;

    if (selectedStreamMatch.value == null || !newValue.some(option => option.value === selectedStreamMatch.value?.id)) {
        selectedStreamMatch.value = newValue[0].match;
    }
}, { immediate: true });
watch(selectedStreamMatch, newValue => {
    matchName.value = newValue?.matchName ?? '';

    if (newValue == null || newValue.numberOfGames == null) {
        numberOfGames.value = null;
    } else {
        numberOfGames.value = newValue.numberOfGames;
    }
}, { immediate: true });

const isChanged = computed(() =>
    selectedStreamMatch.value != null
    && (nextMatchStore.nextMatch.entrantA.id !== selectedStreamMatch.value.entrantAId
        || nextMatchStore.nextMatch.entrantB.id !== selectedStreamMatch.value.entrantBId
        || nextMatchStore.nextMatch.match.name !== matchName.value
        || nextMatchStore.nextMatch.match.playType !== selectedStreamMatch.value.playType
        || nextMatchStore.nextMatch.match.numberOfGames !== numberOfGames.value));

async function onUpdate() {
    if (selectedStreamMatch.value == null || numberOfGames.value == null) return;

    sendMessage('nextMatch:update', {
        entrantAId: selectedStreamMatch.value.entrantAId,
        entrantBId: selectedStreamMatch.value.entrantBId,
    await sendMessage('nextMatch:update', {
        matchName: matchName.value,
        numberOfGames: numberOfGames.value,
        playType: selectedStreamMatch.value.playType
    });
}
</script>
