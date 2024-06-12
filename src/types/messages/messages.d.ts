export interface MessageInputMap {
    'entrants:getStartggEvents': { tournamentSlug: string }
    'entrants:importEntrants': { eventId: number }
}

type MessagesWithoutReturnValues = Exclude<keyof MessageInputMap, keyof InnerMessageResultMap>;

interface InnerMessageResultMap {
    'entrants:getStartggEvents': { name: string, id: number }[]
    'entrants:importEntrants': { count: number }
}

export type MessageResultMap = InnerMessageResultMap & {
    [Key in MessagesWithoutReturnValues]: void
}
