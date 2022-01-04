export interface EncounterConfig {
    numWords: number
}

export interface EncounterContent {
    allWords: string[]
}

export interface WordLists {
    availableWords: string[]
    doneWords: WordProgress[]
    remainingWords: string[]
    allWords: string[]
}

export interface WordProgress {
    word: string
    doneCharacters: string
    remainingCharacters: string
    mistakeCount: number
    wasLastCharacterMistake: boolean
}
