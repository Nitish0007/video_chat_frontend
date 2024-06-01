import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  userId: sessionStorage.getItem('userId') || null,
  roomId: null,
  videoOn: false,
  micOn: false,
  usersJoined: []
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
    toggleMic: (state, action) => {
      state.micOn = action.payload
    },
    setUserId: (state) => {
      if(!state.userId){
        const newUserId = uuidv4();
        sessionStorage.setItem('userId', newUserId);
        state.userId = newUserId;
      }
    },
    setRoomId: (state, action) => {
      console.log(state.roomId, action)
      state.roomId = action.payload
    }
  },
})

export const { updateStream, toggleVideo, toggleMic, setUserId, setRoomId } = streamSlice.actions

export default streamSlice.reducer