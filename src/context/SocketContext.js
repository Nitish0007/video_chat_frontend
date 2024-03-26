import React, { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);
const URL = 'http://localhost:5500'

export const useSocket = () => {
  const socket = useContext(SocketContext)
  console.log(socket)
  return socket
}

export const SocketProvider = (props) => {
  const socket = useMemo(() => io(URL), [])
  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  )
}
