import {
    EncounterContent,
    EncounterConfig,
    WordLists as WordLists,
    WordProgress
} from '../types/encounter'

export const encounterContentFactory = (
    config: EncounterConfig
): EncounterContent => {
    return {
        wordList: ['apple', 'banana', 'carrot', 'duran', 'eggplant']
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
        correctCharacters: '',
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
