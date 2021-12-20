import React, { KeyboardEvent } from 'react'
import Game from '../components/Game'
import { EncounterProgress, WordProgress } from '../types/encounter'
import {
    encounterContentFactory,
    encounterProgressFactory
} from '../factories/encounter'

interface Props {}

interface State {
    wordProgress: WordProgress | null
    encounterProgress: EncounterProgress
}

export default class GameContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        const encounterContent = encounterContentFactory({ numWords: 4 })
        const encounterProgress = encounterProgressFactory(encounterContent)

        this.state = {
            wordProgress: null,
            encounterProgress
        }
    }

    render() {
        const { wordProgress, encounterProgress } = this.state

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
            this.handleSelectWord(e.key)
        } else {
            this.handleProgressWord(e.key)
        }
    }

    handleSelectWord(key: string) {
        const availableWordsStartingWithKey =
            this.state.encounterProgress.availableWords.filter((word) =>
                word.startsWith(key)
            )

        console.log(
            'availableWordsStartingWithKey',
            availableWordsStartingWithKey
        )
    }

    handleProgressWord(key: string) {}
}
