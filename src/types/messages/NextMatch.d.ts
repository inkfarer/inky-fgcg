export interface UpdateNextMatchMessage {
    entrantIds: string[]
    matchName: string
    numberOfGames: number
    playType: 'BEST_OF' | 'PLAY_ALL'
}

export interface GetStreamMatchesMessage {
    getAllMatches: boolean
    streamIds: number[]
}
