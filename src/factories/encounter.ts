import {
    EncounterContent,
    EncounterConfig,
    EncounterProgress
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
): EncounterProgress => {
    // done + active + remaining = all
    return {
        activeWord: '',
        doneWords: [],
        availableWords: [...encounterContent.wordList],
        remainingWords: [...encounterContent.wordList],
        allWords: [...encounterContent.wordList]
    }
}
