import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const WORDS_PER_LEVEL = 8
const SCORE_PER_BOMB = 1000
const MAX_BOMBS = 5

export interface ScoreState {
    scoreTotal: number
    run: number
    multiplier: number
    words: number
    level: number
    isGameOver: boolean
    bombs: number
    nextBombScore: number
    nextLevelWords: number
}

const initialState: ScoreState = {
    scoreTotal: 0,
    run: 0,
    multiplier: 1,
    words: 0,
    level: 1,
    isGameOver: false,
    bombs: 2,
    nextBombScore: SCORE_PER_BOMB,
    nextLevelWords: WORDS_PER_LEVEL
}

export const scoreSlice = createSlice({
    name: 'score',
    initialState,
    reducers: {
        incrementScore: (state) => {
            state.run += 1
            state.words += 1

            state.multiplier = Math.min(5, Math.ceil(state.run / 5))

            state.scoreTotal += 10 * state.multiplier

            if (state.words >= state.nextLevelWords) {
                state.nextLevelWords += WORDS_PER_LEVEL
                state.level += 1
            }

            if (state.scoreTotal >= state.nextBombScore) {
                state.nextBombScore += SCORE_PER_BOMB
                if (state.bombs < MAX_BOMBS) {
                    state.bombs += 1
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
        },
        useBomb: (state) => {
            state.bombs -= 1
        }
    }
})

// Action creators are generated for each case reducer function
export const { incrementScore, resetGame, resetRun, endGame, useBomb } =
    scoreSlice.actions

export default scoreSlice.reducer
