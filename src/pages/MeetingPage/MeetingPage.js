import React, { useState, useEffect } from "react";
import { socket } from '../../socket'
import SelfCamera from "Components/SelfCamera/SelfCamera";
import { Video, VideoOff, Mic, MicOff } from "react-feather";

import styles from "./MeetingPage.module.scss";

function MeetingPage() {
  const [controls, setControls] = useState({
    micOn: false,
    videoOn: false,
  });

  useEffect(() => {
    
    socket.emit("MAKE_CALL", 'your friend is calling')
    
  },[])

  return (
    <div className={styles.mainPage}>
      <div className={styles.meetingContainer}>
        <div className={styles.webcamContainer}>
          <SelfCamera
            className={styles.videoCam}
            useAudio={controls.micOn}
            useVideo={controls.videoOn}
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
  );
}

export default MeetingPage;
