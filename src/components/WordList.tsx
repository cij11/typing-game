import React from 'react'
import { WordLists, WordProgress } from '../types/encounter'

interface Props {
    wordProgress: WordProgress | null
    wordLists: WordLists
}

export default class WordList extends React.Component<Props> {
    render() {
        return (
            <div>
                {this.renderAvailableWords()}
                {this.renderActiveWord()}
                {this.renderDoneWords()}
            </div>
        )
    }

    renderActiveWord() {
        const { wordProgress } = this.props
        if (wordProgress === null) {
            return (
                <div>
                    <h3>Active</h3>-No active word-
                </div>
            )
        }

        return (
            <div>
                <h3>Active</h3>
                <strong>{wordProgress.correctCharacters}</strong>
                {wordProgress.remainingCharacters}
            </div>
        )
    }

    renderAvailableWords() {
        const { wordLists: encounterProgress } = this.props
        return (
            <div>
                <h3>Available</h3>
                <ul>
                    {encounterProgress.availableWords.map((word) => (
                        <li key={word}>{word}</li>
                    ))}
                </ul>
            </div>
        )
    }

    renderDoneWords() {
        return (
            <div>
                <h3>Done</h3>
                <ul></ul>
            </div>
        )
    }
}
