import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // roomId: "",
  videoOn: false,
  micOn: false
}

export const streamSlice = createSlice({
  name: 'stream',
  initialState,
  reducers: {
    updateStream: (state, action) => {
      const mediaStream = action.payload
      // console.log("payload: ", mediaStream)
      const serializedStream = JSON.stringify(mediaStream)
      // console.log("serialized payload: ", serializedStream)
      state.stream = serializedStream
    },
    toggleVideo: (state, action) => {
      state.videoOn = action.payload
    },
    toggleMic :(state, action) => {
      state.micOn = action.payload
    }
  },
})

export const { updateStream, toggleVideo, toggleMic } = streamSlice.actions

export default streamSlice.reducer