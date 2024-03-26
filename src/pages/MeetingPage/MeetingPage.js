import React, { useState, useEffect, useRef } from "react";
import { useSocket } from "context/SocketContext";

import { Video, VideoOff, Mic, MicOff } from "react-feather";

import Modal from 'Components/Modal/Modal'
import SelfCamera from "Components/SelfCamera/SelfCamera";

import styles from "./MeetingPage.module.scss";

function MeetingPage() {
  const [controls, setControls] = useState({
    micOn: false,
    videoOn: false,
  });

  const globalStreamRef = useRef();

  const socket = useSocket();

  const handleJoinRequest = () => {
    socket.on('JOIN_REQUEST', )
  }

  // useEffect(() => {
  //   socket.emit("UPDATE_STREAM", globalStreamRef)
  // })
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
            <div
              className={styles.icon}
              onClick={() =>
                setControls((prev) => ({ ...prev, videoOn: !prev.videoOn }))
              }
            >
              {controls.videoOn ? <Video /> : <VideoOff />}
            </div>
            <div
              className={styles.icon}
              onClick={() =>
                setControls((prev) => ({ ...prev, micOn: !prev.micOn }))
              }
            >
              {controls.micOn ? <Mic /> : <MicOff />}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Modal />
      </div>
    </>
  );
}

export default MeetingPage;
