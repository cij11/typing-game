import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ScoreState {
    scoreTotal: number
    run: number
    multiplier: number
    words: number
    level: number
    isGameOver: boolean
}

const initialState: ScoreState = {
    scoreTotal: 0,
    run: 0,
    multiplier: 1,
    words: 0,
    level: 1,
    isGameOver: false
}

const WORDS_PER_LEVEL = 8

export const scoreSlice = createSlice({
    name: 'score',
    initialState,
    reducers: {
        incrementScore: (state) => {
            state.run += 1
            state.words += 1

            state.multiplier = Math.min(5, Math.ceil(state.run / 5))

            state.scoreTotal += 10 * state.multiplier

            if (state.words % WORDS_PER_LEVEL === 0) {
                console.log('words mod level == 0')
                console.log('word count: ', state.words)

                if (state.words / WORDS_PER_LEVEL !== state.level - 1) {
                    state.level += 1
                }
            }
        },
        resetGame: (state) => {
            state = initialState
        },
        resetRun: (state) => {
            state.run = 0
            state.multiplier = 1
        },
        endGame: (state) => {
            state.isGameOver = true
        }
    }
})

// Action creators are generated for each case reducer function
export const { incrementScore, resetGame, resetRun, endGame } =
    scoreSlice.actions

export default scoreSlice.reducer
