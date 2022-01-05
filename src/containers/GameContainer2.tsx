import React from 'react'
import Game2 from '../components/Game2'
import { demoWords } from '../word-lists/demo'

interface Props {}

interface State {
    activeWordId: number | null
    allWords: string[]
    stack: []
    score: number
}

export default class GameContainer2 extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            activeWordId: null,
            allWords: demoWords,
            stack: [],
            score: 10
        }
    }
    render() {
        return (
            <Game2
                stack={this.state.stack}
                activeWordId={this.state.activeWordId}
                score={this.state.score}
            />
        )
    }
}
