import React from 'react'
import Game2 from '../components/Game2'
import { demoWords } from '../word-lists/demo'
import {
    getWordFromRemaining,
    createStackWord,
    progressStackWord,
    getStackWordById,
    removeStackWord,
    updateStackWord
} from '../support/game-state-modifier'
import { StackWord } from '../types/stack'
import { audioPlayer } from '../support/audioplayer'
import {
    incrementScore,
    resetRun,
    ScoreState
} from '../features/score/scoreSlice'
import { connect } from 'react-redux'
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit'

audioPlayer.loadClip({ name: 'bell', path: '/bell.mp3' })
audioPlayer.loadPool({
    name: 'keyhit',
    paths: ['keystrike1.mp3', 'keystrike2.mp3', 'keystrike3.mp3']
})
audioPlayer.loadPool({
    name: 'keymiss',
    paths: ['mistype1.mp3', 'mistype2.mp3']
})

interface StoreProps {
    score: ScoreState
}

interface DispatchProps {
    incrementScore: ActionCreatorWithoutPayload<string>
    resetRun: ActionCreatorWithoutPayload<string>
}

interface Props extends StoreProps, DispatchProps {}

interface State {
    selectedWordId: number | null
    allWords: string[]
    remainingWords: string[]
    stack: StackWord[]
    topWordIndex: number
    isGameOver: boolean
}

const TICK_DURATION = 2000
export const STACK_LIMIT = 10

class GameContainer2 extends React.Component<Props, State> {
    tick: NodeJS.Timeout | undefined

    constructor(props: Props) {
        super(props)

        this.state = {
            selectedWordId: null,
            allWords: demoWords,
            remainingWords: [],
            stack: [],
            topWordIndex: 0,
            isGameOver: false
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)

        this.setTick()
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)

        if (this.tick) {
            clearTimeout(this.tick)
        }
    }

    setTick() {
        if (this.state.isGameOver) {
            return
        }

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

        const isGameLost = newStack.length >= STACK_LIMIT

        if (isGameLost && this.tick) {
            console.log(
                'Game over. clearing timeout and removing event listener'
            )
            window.removeEventListener('keydown', this.handleKeyDown)
        }

        this.setState({
            topWordIndex: topWordIndex,
            stack: newStack,
            remainingWords: updates.remainingWords,
            isGameOver: isGameLost
        })
    }

    render() {
        return (
            <Game2
                stack={this.state.stack}
                activeWordId={this.state.selectedWordId}
                score={this.props.score}
                isGameOver={this.state.isGameOver}
                onKeyDown={this.handleKeyDown}
            />
        )
    }

    handleKeyDown = (e: any) => {
        console.log('handling keydown')
        console.log(e.key)

        if (this.state.selectedWordId === null) {
            this.handleTrySelectWord(e.key)
        } else if (this.state.selectedWordId !== null) {
            this.handleTryProgressWord(e.key)
        }
    }

    handleTrySelectWord(key: string) {
        const stackWordsStartingWithKey = this.state.stack.filter((stackWord) =>
            stackWord.word.startsWith(key)
        )

        console.log('stackWords starting with key:', stackWordsStartingWithKey)

        if (stackWordsStartingWithKey.length !== 0) {
            this.selectWord(stackWordsStartingWithKey[0].id)
        }
    }

    handleTryProgressWord(key: string) {
        // Correct key press
        if (!this.state.selectedWordId) {
            console.error('Tried to progress word, but no word selected')
        } else {
            const selectedWord = getStackWordById(
                this.state.selectedWordId,
                this.state.stack
            )

            console.log(
                'remaining characters for selected word:',
                selectedWord.remainingCharacters
            )

            if (key === selectedWord.remainingCharacters[0]) {
                this.progressWord(selectedWord, this.state.stack)

                return
            } else {
                this.missWord(selectedWord, this.state.stack)
                //  audioPlayer.playPool('keymiss')
                return
            }
        }
    }

    selectWord(id: number) {
        const selectedWord = getStackWordById(id, this.state.stack)

        console.log('selecting word:', selectedWord)
        selectedWord.isActive = true
        const stack = updateStackWord(selectedWord, this.state.stack)

        this.setState({ selectedWordId: id })

        this.progressWord(selectedWord, stack)
    }

    progressWord(stackWord: StackWord, stack: StackWord[]) {
        audioPlayer.playPool('keyhit')

        const progressedStackWord = progressStackWord(stackWord)

        let updatedStack = updateStackWord(progressedStackWord, stack)

        if (progressedStackWord.remainingCharacters.length === 0) {
            audioPlayer.playClip('bell')

            this.props.incrementScore()

            updatedStack = removeStackWord(progressedStackWord, stack)

            this.setState({
                stack: updatedStack,
                selectedWordId: null
            })
        } else {
            this.setState({
                stack: updatedStack
            })
        }
    }

    missWord(stackWord: StackWord, stack: StackWord[]) {
        audioPlayer.playPool('keymiss')

        if (stackWord.wasLastCharacterMistake) {
            // Do nothing. Only first mistake matters
        } else {
            stackWord.mistakeCount = stackWord.mistakeCount + 1
            stackWord.wasLastCharacterMistake = true

            this.props.resetRun()
        }

        const updatedStack = updateStackWord(stackWord, stack)

        this.setState({
            stack: updatedStack
        })
    }
}

const mapStateToProps = (state: any) => {
    return {
        score: state.score
    }
}

const mapDispatchToProps = {
    incrementScore,
    resetRun
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer2)
