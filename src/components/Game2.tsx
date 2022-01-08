import React, { KeyboardEvent } from 'react'
import { StackWord } from '../types/stack'
import Scores from './Scores'
import Stack from './Stack'
import GameOver from './GameOver'

interface Props {
    stack: StackWord[]
    activeWordId: number | null
    scoreTotal: number
    multiplier: number
    isGameOver: boolean

    onKeyDown: (e: KeyboardEvent) => void
}

export default class Game2 extends React.Component<Props> {
    render() {
        return (
            <div onKeyDown={this.props.onKeyDown}>
                <Scores
                    scoreTotal={this.props.scoreTotal}
                    multiplier={this.props.multiplier}
                />
                <Stack stack={this.props.stack} />
                <GameOver isGameOver={this.props.isGameOver} />
            </div>
        )
    }
}
