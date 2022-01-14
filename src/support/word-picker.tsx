import easyWords from '../word-lists/most-common-1000'
import mediumWords from '../word-lists/most-common-3000'
import hardWords from '../word-lists/most-common-10000'

export default function pickWord(level: number, stackWords: string[]): string {
    let wordList = easyWords
    if (level > 10) {
        wordList = mediumWords
    } else if (level > 15) {
        wordList = hardWords
    }

    const currentFirstLetters = stackWords.reduce(
        (collector, stackWord) => collector + stackWord[0],
        ''
    )

    const maxWordLength = Math.floor(level / 2) + 5

    const availableWords = wordList.filter((word) => {
        return (
            word.length <= maxWordLength &&
            !currentFirstLetters.includes(word[0])
        )
    })

    if (availableWords.length === 0) {
        console.error('No words less than length ' + maxWordLength)
        return 'ERROR'
    }

    const randomIndex = Math.floor(Math.random() * (availableWords.length - 1))

    return availableWords[randomIndex]
}
