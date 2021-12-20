import React, { KeyboardEvent } from 'react'
import Game from '../components/Game'
import { WordLists, WordProgress } from '../types/encounter'
import {
    encounterContentFactory,
    encounterProgressFactory as wordListFactory,
    wordListWordCompletor,
    wordListWordSelector,
    wordProgressFactory,
    wordProgressCharacterCompletor
} from '../factories/encounter'

interface Props {}

interface State {
    wordProgress: WordProgress | null
    wordLists: WordLists
}

export default class GameContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        const encounterContent = encounterContentFactory({ numWords: 4 })
        const wordLists = wordListFactory(encounterContent)

        this.state = {
            wordProgress: null,
            wordLists: wordLists
        }
    }

    render() {
        const { wordProgress, wordLists: encounterProgress } = this.state

        return (
            <div onKeyDown={() => this.handleKeyDown}>
                <Game
                    wordProgress={wordProgress}
                    encounterProgress={encounterProgress}
                    onKeyDown={this.handleKeyDown}
                />
            </div>
        )
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown = (e: any) => {
        console.log('handling keydown')
        console.log(e.key)

        if (this.state.wordProgress === null) {
            this.handleTrySelectWord(e.key)
        } else {
            this.handleTryProgressWord(e.key)
        }
    }

    handleTrySelectWord(key: string) {
        const availableWordsStartingWithKey =
            this.state.wordLists.availableWords.filter((word) =>
                word.startsWith(key)
            )

        console.log(
            'availableWordsStartingWithKey',
            availableWordsStartingWithKey
        )

        if (availableWordsStartingWithKey.length !== 0) {
            this.selectWord(availableWordsStartingWithKey[0])
        }
    }

    selectWord(word: string) {
        this.setState({
            wordProgress: wordProgressFactory(word),
            wordLists: wordListWordSelector(this.state.wordLists, word)
        })
    }

    completeWord(word: string) {
        this.setState({
            wordProgress: null,
            wordLists: wordListWordCompletor(this.state.wordLists, word)
        })
    }

    progressWord(wordProgress: WordProgress) {
        this.setState({
            wordProgress
        })
    }

    handleTryProgressWord(key: string) {
        // Correct key press
        if (key === this.state.wordProgress?.remainingCharacters[0]) {
            const wordProgress = wordProgressCharacterCompletor(
                this.state.wordProgress
            )

            if (wordProgress.remainingCharacters.length === 0) {
                this.completeWord(wordProgress.word)
            } else {
                this.progressWord(wordProgress)
            }

            return
        }
    }
}
