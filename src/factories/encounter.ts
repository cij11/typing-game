import {
    EncounterContent,
    EncounterConfig,
    WordLists,
    WordProgress
} from '../types/encounter'

export const encounterContentFactory = (
    config: EncounterConfig
): EncounterContent => {
    return {
        wordList: ['apple', 'banana', 'carrot', 'durian', 'eggplant']
    }
}

export const encounterProgressFactory = (
    encounterContent: EncounterContent
): WordLists => {
    // done + active + remaining = all
    return {
        doneWords: [],
        availableWords: [...encounterContent.wordList],
        remainingWords: [...encounterContent.wordList],
        allWords: [...encounterContent.wordList]
    }
}

export const wordProgressFactory = (word: string): WordProgress => {
    return {
        word,
        doneCharacters: '',
        remainingCharacters: word
    }
}

export const wordListWordSelector = (
    wordLists: WordLists,
    word: string
): WordLists => {
    const remainingWords = wordLists.availableWords.filter(
        (availableWord) => availableWord !== word
    )

    return {
        ...wordLists,
        availableWords: remainingWords
    }
}

export const wordListWordCompletor = (
    wordLists: WordLists,
    word: string
): WordLists => {
    const doneWords = [...wordLists.doneWords, word]

    return {
        ...wordLists,
        doneWords
    }
}

export const wordProgressCharacterCompletor = (
    wordProgress: WordProgress
): WordProgress => {
    return {
        ...wordProgress,
        doneCharacters:
            wordProgress.doneCharacters +
            wordProgress.remainingCharacters.slice(0, 1),
        remainingCharacters: wordProgress.remainingCharacters.slice(1)
    }
}
