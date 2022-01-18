import React from 'react'
import Game from '../components/Game'
import {
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
    ScoreState,
    endGame,
    useBomb,
    addSecond,
    addA,
    addB,
    addC,
    addD
} from '../features/score/scoreSlice'
import { connect } from 'react-redux'
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit'
import pickWord from '../support/word-picker'

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
    endGame: ActionCreatorWithoutPayload<string>
    useBomb: ActionCreatorWithoutPayload<string>
    addSecond: ActionCreatorWithoutPayload<string>
    addA: ActionCreatorWithoutPayload<string>
    addB: ActionCreatorWithoutPayload<string>
    addC: ActionCreatorWithoutPayload<string>
    addD: ActionCreatorWithoutPayload<string>
}

interface Props extends StoreProps, DispatchProps {}

interface State {
    selectedWordId: number | null
    stack: StackWord[]
    topWordIndex: number
    isInBombBreathingRoom: boolean
    nextWord: StackWord
}

const TICK_DURATION = 2000
const BREATHING_ROOM_TIME = 3000
export const STACK_LIMIT = 12

let lastKeydownEventTimestamp = 0

class GameContainer extends React.Component<Props, State> {
    tick: NodeJS.Timeout | undefined
    wpmTick: NodeJS.Timeout | undefined

    constructor(props: Props) {
        super(props)

        this.state = {
            selectedWordId: null,
            stack: [],
            topWordIndex: 1,
            isInBombBreathingRoom: false,
            nextWord: createStackWord(pickWord(1, []), 1)
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)

        this.setTick()
        this.setWPMTick()
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)

        if (this.tick) {
            clearTimeout(this.tick)
        }
    }

    setTick() {
        if (this.props.score.isGameOver) {
            return
        }

        this.tick = setTimeout(() => {
            if (!this.state.isInBombBreathingRoom) {
                this.addWordToStack()
            }
            this.setTick()
        }, this.getTickDuration())
    }

    getTickDuration(): number {
        if (this.props.score.level < 10) {
            return TICK_DURATION - this.props.score.level * 100
        }

        if (this.props.score.level < 20) {
            return TICK_DURATION - 10 * 100 - (this.props.score.level - 10) * 60
        }

        return 200
    }

    setWPMTick() {
        if (this.props.score.isGameOver) {
            return
        }

        this.wpmTick = setTimeout(() => {
            this.props.addSecond()
            this.setWPMTick()
        }, 1000)
    }

    addWordToStack() {
        const newStack = [...this.state.stack, this.state.nextWord]

        const topWordIndex = this.state.topWordIndex + 1
        const currentWords = newStack.map((stackWord) => stackWord.word)
        const selectedWord = pickWord(this.props.score.level, currentWords)

        const isGameLost = newStack.length >= STACK_LIMIT

        if (isGameLost && this.tick) {
            console.log(
                'Game over. clearing timeout and removing event listener'
            )
            window.removeEventListener('keydown', this.handleKeyDown)

            this.props.endGame()
        }

        this.setState({
            topWordIndex: topWordIndex,
            stack: newStack,
            nextWord: createStackWord(selectedWord, topWordIndex)
        })
    }

    render() {
        return (
            <Game
                stack={this.state.stack}
                activeWordId={this.state.selectedWordId}
                score={this.props.score}
                onKeyDown={this.handleKeyDown}
                nextWord={this.state.nextWord.word}
            />
        )
    }

    handleKeyDown = (e: any) => {
        console.log(e)

        if (e.timeStamp == lastKeydownEventTimestamp) {
            return
        }
        lastKeydownEventTimestamp = e.timeStamp

        e.preventDefault()

        console.log('handling keydown')
        console.log(e.key)

        if (['Enter', 'Return'].includes(e.key)) {
            console.log('trying to use bomb')
            this.handleTryUseBomb()
        }

        if (this.state.selectedWordId === null) {
            this.handleTrySelectWord(e.key)
        } else if (this.state.selectedWordId !== null) {
            this.handleTryProgressWord(e.key)
        }
    }

    handleTryUseBomb() {
        if (this.props.score.bombs > 0) {
            this.useBomb()
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

    useBomb() {
        if (this.state.isInBombBreathingRoom) {
            return
        }

        this.props.useBomb()

        const clearedStack = this.state.stack.filter(
            (stackWord) => stackWord.isActive
        )

        setTimeout(() => this.endBreathingRoom(), BREATHING_ROOM_TIME)

        this.setState({
            isInBombBreathingRoom: true,
            stack: clearedStack
        })
    }

    endBreathingRoom() {
        this.setState({
            isInBombBreathingRoom: false
        })
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

            const mistakes = progressedStackWord.mistakeCount
            if (mistakes < 1) {
                this.props.addA()
            } else if (mistakes < 2) {
                this.props.addB()
            } else if (mistakes < 4) {
                this.props.addC()
            } else {
                this.props.addD()
            }

            this.setState({
                stack: updatedStack,
                selectedWordId: null
            })

            // If the stack is empty, add a word
            if (updatedStack.length === 0) {
                this.addWordToStack()
            }
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
    resetRun,
    endGame,
    useBomb,
    addSecond,
    addA,
    addB,
    addC,
    addD
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
