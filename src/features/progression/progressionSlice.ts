import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ProgressionState {
    level: number
}

const initialState: ProgressionState = {
    level: 0
}

export const progressionSlice = createSlice({
    name: 'progression',
    initialState,
    reducers: {
        increment: (state) => {
            state.level += 1
        },
        reset: (state) => {
            state.level = 0
        }
    }
})

// Action creators are generated for each case reducer function
export const { increment, reset } = progressionSlice.actions

export default progressionSlice.reducer
