export interface StackWord {
    id: number
    isActive: boolean
    word: string
    doneCharacters: string
    remainingCharacters: string
    mistakeCount: number
    wasLastCharacterMistake: boolean
}
