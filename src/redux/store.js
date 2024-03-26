import { configureStore } from '@reduxjs/toolkit'

import streamReducer from './features/stream/streamSlice'

export const store = configureStore({
  reducer: streamReducer,
})