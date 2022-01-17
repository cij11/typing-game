import React, { KeyboardEvent } from 'react'
import { StackWord } from '../types/stack'
import Scores from './Scores'
import Stack from './Stack'
import { ScoreState } from '../features/score/scoreSlice'

interface Props {
    stack: StackWord[]
    activeWordId: number | null
    score: ScoreState

    onKeyDown: (e: KeyboardEvent) => void
}

export default class Game extends React.Component<Props> {
    render() {
        return (
            <div onKeyDown={this.props.onKeyDown}>
                <div className="uk-container-large uk-flex">
                    <div className="uk-width-1-2 uk-card uk-card-secondary uk-card-body">
                        <Stack stack={this.props.stack} />
                    </div>
                    <div className="uk-width-1-2 uk-card uk-card-primary uk-card-body">
                        <Scores score={this.props.score} />
                    </div>
                </div>
                <div className="uk-section uk-section-secondary"></div>
            </div>
        )
    }
}
