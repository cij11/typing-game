import {
    EncounterContent,
    EncounterConfig,
    WordLists,
    WordProgress
} from '../types/encounter'
import { shuffle } from 'lodash'

const AVAILABLE_WORD_SET_SIZE = 3

export const encounterContentFactory = (
    config: EncounterConfig
): EncounterContent => {
    return {
        allWords: [
            'apple',
            'banana',
            'carrot',
            'durian',
            'eggplant',
            'fargo',
            'ghost',
            'getto',
            'igloo',
            'icicle',
            'I',
            'island',
            'irate',
            'joke',
            'jab',
            'jest',
            'jolly',
            'kilometer',
            'kick',
            'kite',
            'koala',
            'lamp',
            'lick',
            'lemur',
            'ligament',
            'letter',
            'monk',
            'merit',
            'mess',
            'mentor',
            'make',
            'night',
            'nit',
            'nest',
            'open',
            'opal',
            'orphan',
            'old',
            'osteoporosis',
            'planet',
            'plant',
            'plenty',
            'plethora',
            'plug',
            'queen',
            'quote',
            'quill',
            'quiet',
            'quite',
            'right',
            'roll',
            'rice',
            'rhyme',
            'reason',
            'stuff',
            'solution',
            'soul',
            'strike',
            'silent',
            'silo',
            'television',
            'talent',
            'twist',
            'torque',
            'toll',
            'tale',
            'tail',
            'tall',
            'umbrella',
            'uvula',
            'utter',
            'violin',
            'vent',
            'vest',
            'went',
            'want',
            'who',
            'what',
            'where',
            'why',
            'zebra',
            'zoo',
            'zest'
        ]
    }
}

export const wordListsFactory = (
    encounterContent: EncounterContent
): WordLists => {
    // done + active + remaining = all

    // Shuffle words at the start, rather than picking randomly throughout
    const shuffledWords = shuffle(encounterContent.allWords)

    return {
        doneWords: [],
        availableWords: [],
        remainingWords: [...shuffledWords],
        allWords: [...shuffledWords]
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

export const pickAvailableWords = (wordLists: WordLists): WordLists => {
    const availableWords: string[] = []

    while (availableWords.length < AVAILABLE_WORD_SET_SIZE) {
        const candidateWord = wordLists.remainingWords.pop()

        // If remaining word list is empty
        if (!candidateWord) {
            const shuffledWords = shuffle(wordLists.allWords)
            wordLists.remainingWords = [...shuffledWords]
            wordLists.allWords = [...shuffledWords]
        } else {
            // Add the candidate word to the available words, if no current available word starts with the same letter as the candidate word
            const availableWordsWithSameStartLetter = availableWords.filter(
                (availableWord) => availableWord.startsWith(candidateWord[0])
            )
            if (availableWordsWithSameStartLetter.length === 0) {
                availableWords.push(candidateWord)
            }
        }
    }

    return {
        ...wordLists,
        availableWords
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
