import React from 'react'
import Game2 from '../components/Game2'
import { demoWords } from '../word-lists/demo'
import {
    getWordFromRemaining,
    createStackWord
} from '../support/game-state-modifier'
import { StackWord } from '../types/stack'

interface Props {}

interface State {
    activeWordId: number | null
    allWords: string[]
    remainingWords: string[]
    stack: StackWord[]
    score: number
    topWordIndex: number
}

const TICK_DURATION = 1000

export default class GameContainer2 extends React.Component<Props, State> {
    tick: NodeJS.Timeout | undefined

    constructor(props: Props) {
        super(props)

        this.state = {
            activeWordId: null,
            allWords: demoWords,
            remainingWords: [],
            stack: [],
            score: 10,
            topWordIndex: 0
        }
    }

    componentDidMount() {
        this.setTick()
    }

    componentWillUnmount() {
        if (this.tick) {
            clearTimeout(this.tick)
        }
    }

    setTick() {
        this.tick = setTimeout(() => {
            this.addWordToStack()
            this.setTick()
        }, TICK_DURATION)
    }

    addWordToStack() {
        const topWordIndex = this.state.topWordIndex + 1

        const updates = getWordFromRemaining(
            this.state.remainingWords,
            this.state.stack,
            this.state.allWords
        )

        const newStack = [
            ...this.state.stack,
            createStackWord(updates.selectedWord, topWordIndex)
        ]

        this.setState({
            topWordIndex: topWordIndex,
            stack: newStack,
            remainingWords: updates.remainingWords
        })
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
