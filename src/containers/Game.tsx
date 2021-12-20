import React from 'react'
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

    soundIndex: number
}

const keystrike1 = new Audio('/keystrike1.mp3')
const k11 = new Audio('/keystrike1.mp3')
const k12 = new Audio('/keystrike1.mp3')
const k13 = new Audio('/keystrike1.mp3')
const k14 = new Audio('/keystrike1.mp3')
const keystrike2 = new Audio('/keystrike2.mp3')
const keystrike3 = new Audio('/keystrike3.mp3')
const keystrike4 = new Audio('/keystrike4.mp3')

const k1Collection = [k11, k12, k13, k14]

export default class GameContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        const encounterContent = encounterContentFactory({ numWords: 4 })
        const wordLists = wordListFactory(encounterContent)

        this.state = {
            wordProgress: null,
            wordLists: wordLists,
            soundIndex: 0
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
        k1Collection[this.state.soundIndex].play()
        console.log('sound index', this.state.soundIndex)

        this.setState({ soundIndex: (this.state.soundIndex + 1) % 4 })

        console.log('handling keydown')
        console.log(e.key)

        if (this.state.wordProgress === null) {
            this.handleTrySelectWord(e.key)
        }

        if (this.state.wordProgress !== null) {
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
