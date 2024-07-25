<template>
    <error-display class="m-b-8" />
    <ipl-message
        v-if="!isConfigured"
        type="warning"
    >
        Missing start.gg configuration!
    </ipl-message>
    <template v-else>
        <ipl-space 
            class="m-b-8"
            data-test="loaded-bracket-space"
        >
            <div class="title">Loaded data</div>
            <template v-if="bracketStore.bracketData == null">
                No bracket data loaded.
            </template>
            <template v-else>
                <ipl-data-row
                    label="Event Name"
                    :value="bracketStore.bracketData.eventName"
                />
                <ipl-data-row 
                    label="Bracket Name"
                    :value="bracketStore.bracketData.name"
                />
                <ipl-data-row 
                    v-if="matchGroupNames !== bracketStore.bracketData.name"
                    label="Match Groups"
                    :value="matchGroupNames"
                />
                <ipl-data-row
                    v-if="bracketStore.bracketData.roundNumber != null"
                    label="Round Number"
                    :value="`Round ${bracketStore.bracketData.roundNumber}`"
                />
            </template>
        </ipl-space>
        <ipl-space>
            <ipl-button
                label="Load bracket data"
                async
                @click="getMatchQuery"
            />
            <match-query-param-input
                v-for="param in bracketQuery"
                :key="param.key"
                :param="param"
                :query="queryResult"
                @change="(key, value) => queryResult[key] = value"
                @parameter-add="key => activeParams.add(key)"
                @parameter-remove="key => activeParams.delete(key)"
                @loading="isLoading = $event"
            />
            <ipl-button
                v-if="bracketQuery.length > 0"
                async
                label="Submit"
                data-test="submit-bracket-query-button"
                class="m-t-8"
                :disabled="!activeParamsFilled || isLoading"
                @click="submitBracketQuery"
            />
        </ipl-space>
    </template>
</template>

<script setup lang="ts">
import type NodeCG from '@nodecg/types';
import ErrorDisplay from '../../components/ErrorDisplay.vue';
import { IplDataRow, IplMessage, IplSpace, IplButton } from '@iplsplatoon/vue-components';
import { computed, ref, Ref, watch } from 'vue';
import { MatchQueryParameter, MatchImporter, MatchQueryResult, StartggImporter } from '@tourneyview/importer';
import MatchQueryParamInput from './components/MatchQueryParamInput.vue';
import { Configschema } from 'types/schemas';
import { useBracketStore } from 'client-shared/store/BracketStore';

const bracketStore = useBracketStore();
const isConfigured = computed(() => {
    return (nodecg as NodeCG.ClientAPI<Configschema>).bundleConfig?.startgg?.apiKey != null;
});

const matchGroupNames = computed(() => {
    if (bracketStore.bracketData == null) {
        return '';
    }

    return bracketStore.bracketData.matchGroups.reduce((result, group, i) => {
        result += group.name;
        if (i !== (bracketStore.bracketData?.matchGroups.length ?? 0) - 1) {
            result += ', ';
        }

        return result;
    }, '');
});

const activeParams: Ref<Set<string>> = ref(new Set<string>());
const bracketQuery: Ref<MatchQueryParameter[]> = ref([]);
const queryResult: Ref<Record<string, string | number | undefined>> = ref({ });
const isLoading = ref<boolean>(false);

function getImporter(): MatchImporter<MatchQueryResult> {
    return new StartggImporter((nodecg as NodeCG.ClientAPI<Configschema>).bundleConfig?.startgg?.apiKey);
}

const activeParamsFilled = computed(() => {
    return Array.from(activeParams.value).every(param => queryResult.value[param] != null);
});

watch(() => bracketStore.tournamentData.sourceSpecificData?.startgg?.eventId, () => {
    bracketQuery.value = [];
});

async function getMatchQuery() {
    const importer = getImporter();
    bracketQuery.value = [];
    const options = await Promise.all((await importer.getMatchQueryOptions(bracketStore.tournamentData.sourceSpecificData?.startgg?.slug ?? ''))
        .map(async (option) => {
            // If possible, select the correct event ID automatically.
            const startggEventId = bracketStore.tournamentData.sourceSpecificData?.startgg?.eventId;
            if (
                startggEventId != null
                && option.key === 'eventId'
                && option.type === 'select'
            ) {
                const eventOption = option.options.find(eventOption => eventOption.value === startggEventId);
                if (eventOption != null) {
                    return [
                        {
                            name: 'Event',
                            type: 'static',
                            key: 'eventId',
                            value: startggEventId
                        } satisfies MatchQueryParameter,
                        ...(eventOption.getParams == null ? [] : (await eventOption.getParams()))
                    ];
                }
            }

            return option;
        }));

    bracketQuery.value = options.flat();
}

async function submitBracketQuery() {
    const importer = getImporter();
    bracketStore.setBracketData(await importer.getMatches(queryResult.value as MatchQueryResult));
}
</script>
