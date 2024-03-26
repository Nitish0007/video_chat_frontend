import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSocket } from 'context/SocketContext'

import Button from 'Components/Button/Button'
import InputControl from 'Components/InputControl/InputControl'

import styles from './HomePage.module.scss'

function HomePage() {

  const navigate = useNavigate()

  const socket = useSocket()

  const sendJoinRequest = (roomId) => {
    // send join request
    socket.emit("JOIN_REQUEST", roomId)
  }

  // const replyToJoinRequest = () => {
  //   console
  // }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <h1>Hey! lets Connect 💬</h1>
        <div className={styles.btnBox}>
          <InputControl placeholder={"Enter or Paste Room ID"} onclick={sendJoinRequest} />
          <Button
            className={styles.longButton}
            outlineButton
            onClick={() => navigate("/meeting")}
            >
            New Meeting
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HomePage