import React, { KeyboardEvent } from 'react'
import { StackWord } from '../types/stack'
import Scores from './Scores'
import Stack from './Stack'
import GameOver from './GameOver'

interface Props {
    stack: StackWord[]
    activeWordId: number | null
    score: number
    isGameOver: boolean

    onKeyDown: (e: KeyboardEvent) => void
}

export default class Game2 extends React.Component<Props> {
    render() {
        return (
            <div onKeyDown={this.props.onKeyDown}>
                <Scores score={this.props.score} />
                <Stack stack={this.props.stack} />
                <GameOver isGameOver={this.props.isGameOver} />
            </div>
        )
    }
}
