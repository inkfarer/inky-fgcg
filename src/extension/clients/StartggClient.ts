import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { Entrant, StreamMatches, TournamentData } from 'types/schemas';

const getEventsQuery = `
query TournamentEvents($slug: String) {
  tournament(slug: $slug) {
    events {
      id
      name
    }
  }
}`;

interface GetEventsResponse {
    data: {
        tournament: {
            events: {
                id: number
                name: string
            }[]
        }
    }
}

const getEntrantsQuery = `
query EventEntrants($eventId: ID!, $page: Int!, $perPage: Int!) {
  event(id: $eventId) {
    entrants(query: {
      page: $page
      perPage: $perPage
    }) {
      pageInfo {
        total
        totalPages
      }
      nodes {
        id
        name
        participants {
          id
          prefix
          gamerTag
        }
      }
    }
  }
}`;

interface GetEntrantsResponse {
    data: {
        event: {
            entrants: {
                pageInfo: {
                    total: number
                    totalPages: number
                }
                nodes: {
                    id: number | string
                    name: string
                    participants: {
                        id: number | string
                        gamerTag: string
                        prefix: string | null
                    }[]
                }[]
            }
        }
    }
}

const getTournamentDataQuery = `
query TournamentData($eventId: ID!) {
  event(id: $eventId) {
    tournament {
      slug
      name
      streams {
        id
        streamName
      }
    }
  }
}`;

const getStreamQueueQuery = `
query StreamQueue($slug: String!) {
  tournament(slug: $slug) {
    streamQueue {
      stream {
        id
      }
      sets {
        id
        round
        setGamesType
        totalGames
        fullRoundText
        event {
          id
        }
        phaseGroup {
          displayIdentifier
          rounds {
            number
            bestOf
          }
          phase {
            name
            groupCount
          }
        }
        slots {
          entrant {
            id
          }
        }
      }
    }
  }
}`;

interface GetStreamQueueResponse {
    data: {
        tournament: {
            streamQueue: {
                stream: {
                    id: number
                }
                sets: {
                    id: number
                    round: number
                    setGamesType: number
                    totalGames: number
                    fullRoundText: string
                    event: {
                        id: number
                    }
                    games: {
                        id: number
                    }[]
                    phaseGroup: {
                        displayIdentifier: string
                        phase: {
                            name: string
                            groupCount: number
                        }
                        rounds: {
                            number: number
                            bestOf: number
                        }[]
                    }
                    slots: {
                        entrant: {
                            id: number
                        }
                    }[]
                }[]
            }[]
        }
    }
}

interface GetTournamentDataResponse {
    data: {
        event: {
            tournament: {
                slug: string
                name: string
                streams: {
                    id: number
                    streamName: string
                }[]
            }
        }
    }
}

export class StartggClient {
    private readonly axios: AxiosInstance;

    constructor(apiKey: string) {
        this.axios = axios.create({
            baseURL: 'https://api.start.gg/gql/alpha',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${apiKey}`
            }
        })
    }

    async getEvents(tournamentSlug: string): Promise<{ name: string, id: number }[]> {
        const eventListResponse = await this.axios.post<GetEventsResponse>(
            '',
            JSON.stringify({
                query: getEventsQuery,
                variables: {
                    slug: tournamentSlug
                }
            }));

        return eventListResponse.data.data.tournament.events;
    }

    async getEntrants(eventId: number): Promise<Entrant[]> {
        const firstPage = await this.getEntrantPage(eventId, 1);
        const entrants = firstPage.data.event.entrants.nodes;
        const totalPages = firstPage.data.event.entrants.pageInfo.totalPages;

        if (totalPages > 1) {
            const pageLoads = [];

            for (let i = 2; i <= totalPages; i++) {
                pageLoads.push(this.getEntrantPage(eventId, i));
            }

            entrants.push(...(await Promise.all(pageLoads)).flatMap(response => response.data.event.entrants.nodes));
        }

        return entrants.map(entrant => ({
            id: String(entrant.id),
            name: entrant.name,
            participants: entrant.participants.map(participant => ({
                id: String(participant.id),
                prefix: participant.prefix,
                name: participant.gamerTag
            }))
        }));
    }

    private async getEntrantPage(eventId: number, page: number): Promise<GetEntrantsResponse> {
        return (await this.axios.post<GetEntrantsResponse>(
            '',
            JSON.stringify({
                query: getEntrantsQuery,
                variables: {
                    eventId,
                    page: page,
                    perPage: 50
                }
            }))).data
    }

    async getTournamentData(eventId: number): Promise<TournamentData> {
        const tournamentDataResponse = await this.axios.post<GetTournamentDataResponse>(
            '',
            JSON.stringify({
                query: getTournamentDataQuery,
                variables: {
                    eventId
                }
            })
        );

        return {
            name: tournamentDataResponse.data.data.event.tournament.name,
            source: 'startgg',
            sourceSpecificData: {
                startgg: {
                    slug: tournamentDataResponse.data.data.event.tournament.slug,
                    eventId,
                    streams: tournamentDataResponse.data.data.event.tournament.streams ?? []
                }
            }
        };
    }

    async getStreamQueue(
        tournamentSlug: string,
        eventId: number,
        streamIds?: number[],
        getAllStreams?: boolean
    ): Promise<StreamMatches> {
        if ((streamIds == null || streamIds.length <= 0) && !getAllStreams) {
            return [];
        }

        const streamQueueResponse = await this.axios.post<GetStreamQueueResponse>(
            '',
            JSON.stringify({
                query: getStreamQueueQuery,
                variables: {
                    slug: tournamentSlug
                }
            })
        );


        if (streamQueueResponse.data.data.tournament.streamQueue == null) {
            return [];
        }

        return streamQueueResponse.data.data.tournament.streamQueue
            .filter(queueItem => (getAllStreams || streamIds?.includes(queueItem.stream.id)))
            .flatMap(queueItem => queueItem.sets
                .filter(set =>
                    set.slots.length === 2
                    && !set.slots.some(slot => slot.entrant === null)
                    && set.event.id === eventId)
                .map(set => ({
                    id: String(set.id),
                    entrantAId: String(set.slots[0].entrant.id),
                    entrantBId: String(set.slots[1].entrant.id),
                    playType: set.setGamesType === 1 ? 'BEST_OF' : 'PLAY_ALL',
                    matchName: set.phaseGroup.phase.groupCount > 1
                        ? `${set.phaseGroup.phase.name} - Pool ${set.phaseGroup.displayIdentifier} - ${set.fullRoundText}`
                        : `${set.phaseGroup.phase.name} - ${set.fullRoundText}`,
                    numberOfGames: set.setGamesType === 1
                        ? set.phaseGroup.rounds?.find(round => round.number === set.round)?.bestOf ?? undefined
                        : set.totalGames
                })));
    }

}
