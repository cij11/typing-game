import React from 'react'
import { StackWord } from '../types/stack'
import Scores from './Scores'
import Stack from './Stack'

interface Props {
    stack: StackWord[]
    activeWordId: number | null
    score: number
}

export default class Game2 extends React.Component<Props> {
    render() {
        return (
            <div>
                <Scores />
                <Stack stack={this.props.stack} />
            </div>
        )
    }
}
