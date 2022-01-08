import { configureStore } from '@reduxjs/toolkit'
import scoreReducer from '../features/score/scoreSlice'
import configReducer from '../features/config/configSlice'

export const store = configureStore({
    reducer: {
        score: scoreReducer,
        config: configReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
