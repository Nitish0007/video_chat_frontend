import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSocket } from 'context/SocketContext'
import { useDispatch } from 'react-redux'
import { setRoomId } from '../../redux/features/stream/streamSlice'

import Button from 'Components/Button/Button'
import InputControl from 'Components/InputControl/InputControl'
import Modal from 'Components/Modal/Modal'

import styles from './HomePage.module.scss'

function HomePage() {
  const navigate = useNavigate();
  const socket = useSocket();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  const sendJoinRequest = (enteredRoomId) => {
    socket.emit("JOIN_REQUEST", enteredRoomId)
    setModal(true)
  }

  // const replyToJoinRequest = () => {
  //   console
  // }

  const handleJoinNewMeeting = () => {
    const roomId = socket.id
    console.log("room id: ",roomId)
    dispatch(setRoomId(roomId))
    navigate("/meeting")
  }


  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <h1>Hey! lets Connect 💬</h1>
          <div className={styles.btnBox}>
            <InputControl placeholder={"Enter or Paste Room ID"} onclick={sendJoinRequest} />
            <Button
              className={styles.longButton}
              outlineButton
              onClick={handleJoinNewMeeting}
              >
              New Meeting
            </Button>
          </div>
        </div>
      </div>
      { modal ? <Modal
        onSuccess={() => setModal(false)} 
        onCancel={() => setModal(false)} 
        >
          Waiting for someone to let you in
        </Modal> : "" }
    </>
  )
}

export default HomePage