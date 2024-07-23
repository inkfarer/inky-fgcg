import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { Entrant, TournamentData } from 'types/schemas';

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
                    streams: tournamentDataResponse.data.data.event.tournament.streams
                }
            }
        };
    }
}
