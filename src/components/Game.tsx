import React, { KeyboardEvent } from 'react'
import WordList from './WordList'
import { WordProgress, WordLists } from '../types/encounter'

interface AttributeProps {
    wordProgress: WordProgress | null
    encounterProgress: WordLists

    onKeyDown: (e: KeyboardEvent) => void
}

interface Props extends AttributeProps {}

export default class Game extends React.Component<Props> {
    render() {
        const { wordProgress, encounterProgress } = this.props

        return (
            <div onKeyDown={this.props.onKeyDown}>
                <WordList
                    wordProgress={wordProgress}
                    wordLists={encounterProgress}
                />
            </div>
        )
    }
}
