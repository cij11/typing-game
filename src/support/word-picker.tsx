import easyWords from '../word-lists/most-common-1000'
import mediumWords from '../word-lists/most-common-3000'
import hardWords from '../word-lists/most-common-10000'

export default function pickWord(level: number): string {
    let wordList = easyWords
    if (level > 10) {
        wordList = mediumWords
    } else if (level > 15) {
        wordList = hardWords
    }

    const maxWordLength = Math.floor(level / 2) + 5

    const availableWords = wordList.filter(
        (word) => word.length <= maxWordLength
    )

    if (availableWords.length === 0) {
        console.error('No words less than length ' + maxWordLength)
        return 'ERROR'
    }

    const randomIndex = Math.floor(Math.random() * (availableWords.length - 1))

    return availableWords[randomIndex]
}
