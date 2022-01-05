import { StackWord } from '../types/stack'
import { shuffle } from 'lodash'

interface SelectedWordAndRemainingWords {
    selectedWord: string
    remainingWords: string[]
}

export const getWordFromRemaining = (
    startingRemainingWords: string[],
    stack: StackWord[],
    allWords: string[]
): SelectedWordAndRemainingWords => {
    let remainingWords = startingRemainingWords
    let candidateWord: string = ''

    for (let i = 0; i < 10000; i++) {
        // 10000 attempts to find a suitable word
        candidateWord = remainingWords.pop() || '' // So typescript doesn't need to deal with undefined
        // If remaining word list is empty
        if (!candidateWord) {
            const shuffledWords = shuffle(allWords)
            remainingWords = [...shuffledWords]
        } else {
            // Add the candidate word to the stack words, if no current stack word starts with the same letter as the candidate word
            const availableWordsWithSameStartLetter = stack.filter(
                // eslint-disable-next-line no-loop-func
                (stackWord) => stackWord.word.startsWith(candidateWord[0])
            )
            if (availableWordsWithSameStartLetter.length === 0) {
                return {
                    selectedWord: candidateWord,
                    remainingWords
                }
            }
        }
    }

    return {
        selectedWord: 'ERROR',
        remainingWords: ['this', 'should', 'never', 'be', 'reached']
    }
}

export const createStackWord = (
    word: string,
    topWordIndex: number
): StackWord => {
    return {
        id: topWordIndex,
        isActive: false,
        word: word,
        doneCharacters: '',
        remainingCharacters: word,
        mistakeCount: 0,
        wasLastCharacterMistake: false
    }
}

export const activateStackWord = (stackWord: StackWord): StackWord => {
    return { ...stackWord, isActive: true }
}

export const updateStackWord = (
    stackWord: StackWord,
    stackWords: StackWord[]
): StackWord[] => {
    const wordIndex = stackWords.findIndex(
        (existingStackWord) => existingStackWord.id === stackWord.id
    )

    const clonedStackWords = [...stackWords]
    clonedStackWords[wordIndex] = stackWord

    return clonedStackWords
}

export const getStackWordById = (
    id: number,
    stackWords: StackWord[]
): StackWord => {
    const wordIndex = stackWords.findIndex(
        (existingStackWord) => existingStackWord.id === id
    )

    return stackWords[wordIndex]
}

export const progressStackWord = (stackWord: StackWord): StackWord => {
    const progressedStackWord = {
        ...stackWord,
        doneCharacters:
            stackWord.doneCharacters +
            stackWord.remainingCharacters.slice(0, 1),
        remainingCharacters: stackWord.remainingCharacters.slice(1),
        wasLastCharacterMistake: false
    }

    return progressedStackWord
}

export const removeStackWord = (
    stackWord: StackWord,
    stackWords: StackWord[]
): StackWord[] => {
    const wordIndex = stackWords.findIndex(
        (existingStackWord) => existingStackWord.id === stackWord.id
    )

    return [
        ...stackWords.slice(0, wordIndex),
        ...stackWords.slice(wordIndex + 1)
    ]
}

// export const removeWordById = (
//     stack: StackWord[],
//     id: number
// ): StackWord[] => {}
