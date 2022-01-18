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
    secondsRunning: number
    wordsPerMinute: number
    a: number
    b: number
    c: number
    d: number
    longestCombo: number
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
    nextLevelWords: WORDS_PER_LEVEL,
    secondsRunning: 0,
    wordsPerMinute: 0,
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    longestCombo: 0
}

export const scoreSlice = createSlice({
    name: 'score',
    initialState,
    reducers: {
        addA(state) {
            state.a += 1
        },
        addB(state) {
            state.b += 1
        },
        addC(state) {
            state.c += 1
        },
        addD(state) {
            state.d += 1
        },
        incrementScore: (state) => {
            state.run += 1

            if (state.run > state.longestCombo) {
                state.longestCombo = state.run
            }

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
            Object.assign(state, initialState)
            //  state = initialState
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
        },
        addSecond: (state) => {
            state.secondsRunning += 1

            const wordsPerSecond = state.words / state.secondsRunning
            state.wordsPerMinute = wordsPerSecond * 60
        }
    }
})

// Action creators are generated for each case reducer function
export const {
    incrementScore,
    resetGame,
    resetRun,
    endGame,
    useBomb,
    addSecond,
    addA,
    addB,
    addC,
    addD
} = scoreSlice.actions

export default scoreSlice.reducer
