import { GetStreamMatchesMessage, UpdateNextMatchMessage } from './NextMatch';
import { EntrantSide } from '../enums/EntrantSide';
import { Casters } from '../schemas';

export interface MessageInputMap {
    'entrants:getStartggEvents': { tournamentSlug: string }
    'entrants:importEntrants': { eventId: number }

    'nextMatch:update': UpdateNextMatchMessage
    'nextMatch:getStreamMatches': GetStreamMatchesMessage

    'activeMatch:addScore': EntrantSide
    'activeMatch:subtractScore': EntrantSide
    'activeMatch:beginNextMatch': never

    'casters:update': Casters[number]
    'casters:insert': Omit<Casters[number], 'id'>
    'casters:remove': string
}

type MessagesWithoutReturnValues = Exclude<keyof MessageInputMap, keyof InnerMessageResultMap>;

interface InnerMessageResultMap {
    'entrants:getStartggEvents': { name: string, id: number }[]
    'entrants:importEntrants': { count: number }

    'casters:insert': string
}

export type MessageResultMap = InnerMessageResultMap & {
    [Key in MessagesWithoutReturnValues]: void
}
