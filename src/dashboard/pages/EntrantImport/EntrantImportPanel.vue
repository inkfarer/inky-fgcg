<template>
    <error-display class="m-b-8" />
    <ipl-message
        v-if="importedEntrantCount != null"
        type="info"
        closeable
        class="m-b-8"
        @close="importedEntrantCount = null"
    >
        Imported {{ pluralize('entrant', importedEntrantCount) }}
    </ipl-message>
    <ipl-space>
        <template v-if="eventOptions.length > 0">
            <ipl-select
                v-model="selectedEvent"
                label="Event"
                :options="eventOptions"
            />
            <ipl-button
                class="m-t-8"
                label="Import"
                async
                :disabled="selectedEvent == null"
                @click="onEventImport"
            />
            <ipl-button
                class="m-t-8"
                label="Back"
                color="red"
                @click="eventOptions = []; selectedEvent = null"
            />
        </template>
        <template v-else>
            <ipl-input
                v-model="slug"
                label="Tournament Slug"
                name="slug"
            />
            <ipl-button
                class="m-t-8"
                label="Import"
                async
                @click="onImport"
            />
        </template>
    </ipl-space>
    <ipl-space class="m-t-8">
        <div class="title">Loaded data</div>
        <ipl-data-row
            label="Slug"
            :value="tournamentDataStore.tournamentData.slug"
            copiable
        />
    </ipl-space>
</template>

<script lang="ts" setup>
import ErrorDisplay from '../../components/ErrorDisplay.vue';
import { IplButton, IplDataRow, IplInput, IplMessage, IplSelect, IplSpace } from '@iplsplatoon/vue-components';
import { ref } from 'vue';
import { sendMessage } from 'client-shared/helpers/NodecgHelper';
import { pluralize } from '@iplsplatoon/vue-components';
import { useTournamentDataStore } from 'client-shared/store/TournamentDataStore';

const tournamentDataStore = useTournamentDataStore();
const slug = ref('');
const eventOptions = ref<{ name: string, value: string }[]>([]);
const selectedEvent = ref<string | null>(null);
const importedEntrantCount = ref<number | null>(null);

async function onImport() {
    const events = await sendMessage('entrants:getStartggEvents', { tournamentSlug: slug.value });
    if (events.length === 1) {
        await importEntrants(events[0].id);
    } else {
        eventOptions.value = events.map(event => ({ name: event.name, value: String(event.id) }));
    }
}

async function onEventImport() {
    if (selectedEvent.value != null) {
        await importEntrants(Number(selectedEvent.value));
    }
}

async function importEntrants(eventId: number) {
    const result = await sendMessage('entrants:importEntrants', { eventId });
    importedEntrantCount.value = result.count;
}
</script>
