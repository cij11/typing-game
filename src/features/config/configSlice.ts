import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const enum Mode {
    CONTINUOUS = 'CONTINUOUS',
    STAGES = 'STAGES' // Note. Stages != Levels. Stage are discrete sessions of play with a begining and an end. In both Continuous and Stages mode, levels go up as the game progresses, increasing speed/difficulty
}

export interface ConfigState {
    mode: Mode
}

const initialState: ConfigState = {
    mode: Mode.STAGES
}

export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<Mode>) => {
            state.mode = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { set } = configSlice.actions

export default configSlice.reducer
