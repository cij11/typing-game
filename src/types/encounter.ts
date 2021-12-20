export interface EncounterConfig {
    numWords: number
}

export interface EncounterContent {
    wordList: string[]
}

export interface EncounterProgress {
    activeWord: string
    availableWords: string[]
    doneWords: string[]
    remainingWords: string[]
    allWords: string[]
}

export interface WordProgress {
    fullWord: string
    correctCharacters: string
    remainingCharacters: string
}
