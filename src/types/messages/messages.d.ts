import { GetStreamMatchesMessage, UpdateNextMatchMessage } from './NextMatch';
import { EntrantSide } from '../enums/EntrantSide';

export interface MessageInputMap {
    'entrants:getStartggEvents': { tournamentSlug: string }
    'entrants:importEntrants': { eventId: number }

    'nextMatch:update': UpdateNextMatchMessage
    'nextMatch:getStreamMatches': GetStreamMatchesMessage

    'activeMatch:addScore': EntrantSide
    'activeMatch:subtractScore': EntrantSide
    'activeMatch:beginNextMatch': never
}

type MessagesWithoutReturnValues = Exclude<keyof MessageInputMap, keyof InnerMessageResultMap>;

interface InnerMessageResultMap {
    'entrants:getStartggEvents': { name: string, id: number }[]
    'entrants:importEntrants': { count: number }
}

export type MessageResultMap = InnerMessageResultMap & {
    [Key in MessagesWithoutReturnValues]: void
}
