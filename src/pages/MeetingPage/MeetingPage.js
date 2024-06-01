import React, { useState, useEffect, useRef } from "react";
import { useSocket } from "context/SocketContext";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";

// import { Video, VideoOff, Mic, MicOff, Copy } from "react-feather";

import Modal from 'Components/Modal/Modal'
import SelfCamera from "Components/SelfCamera/SelfCamera";

import styles from "./MeetingPage.module.scss";
// import { updateStream } from "redux/features/stream/streamSlice";

function MeetingPage() {
  const [controls, setControls] = useState({
    micOn: false,
    videoOn: false,
  });
  const [modal, setModal] = useState(false)
  const globalStreamRef = useRef();
  const socket = useSocket();
  const roomId = useSelector((state) => state.roomId)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleJoinRequest = () => {
    console.log("add user to room")
    setModal(false)
    dispatch()
  }

  const copyRoomId = () => {
    if (!navigate.clipboard) {
      console.error('Clipboard API not supported');
      return;
    }
    navigate.clipboard.writeText(roomId).then(() => {
      console.log("Copied")
    }).catch(() => {
      console.log("Not Copied")
    })
  }

  useEffect(() => {
    socket.on('JOIN_REQUEST_RESPONSE', (data) => {
      if(data.roomId == roomId){
        setModal(true)
      }
    })
  }, [])
  // useEffect(() => {
  //   socket.emit("MAKE_CALL", JSON.stringify(globalStreamRef.current))
  // },[])

  return (
    <>
      <div className={styles.mainPage}>
        <div className={styles.meetingContainer}>
          <div className={styles.webcamContainer}>
            <SelfCamera
              className={styles.videoCam}
              useAudio={controls.micOn}
              useVideo={controls.videoOn}
              currentStream={globalStreamRef} 
            />
          </div>
          <div className={styles.toolbox}>
            <span>{`Copy room ID: ${roomId}`}</span>
            {/* <Copy onClick={copyRoomId}></Copy> */}
          </div>
        </div>
      </div>
      { modal ? <Modal
        onSuccess={(data) => handleJoinRequest(data)} 
        onCancel={() => setModal(false)} 
        success={"Accept"} 
        cancel={"Deny"}>
          One User want to join the room
        </Modal> : "" }
    </>
  );
}

export default MeetingPage;
