import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ScoreState {
    scoreTotal: number
    run: number
    multiplier: number
}

const initialState: ScoreState = {
    scoreTotal: 0,
    run: 0,
    multiplier: 1
}

export const scoreSlice = createSlice({
    name: 'score',
    initialState,
    reducers: {
        incrementScore: (state) => {
            state.run += 1

            state.multiplier = Math.min(5, Math.ceil(state.run / 5))

            state.scoreTotal += 10 * state.multiplier
        },
        resetScore: (state) => {
            state = initialState
        },
        resetRun: (state) => {
            state.run = 0
            state.multiplier = 1
        }
    }
})

// Action creators are generated for each case reducer function
export const { incrementScore, resetScore, resetRun } = scoreSlice.actions

export default scoreSlice.reducer
