import React, { useState } from 'react'
import SelfCamera from 'Components/SelfCamera/SelfCamera'
import { Video, VideoOff, Mic, MicOff } from 'react-feather';

import styles from './MeetingPage.module.scss'

function MeetingPage() {
  const [mic, setMic] = useState(true);
  const [video, setVideo] = useState(true);

  const toggleMic = () => {
    setMic(!mic)
  }

  const toggleVideo = () => {
    setVideo(!video)
  }

  return (
    <div className={styles.mainPage}>
      <div className={styles.meetingContainer}>
        <div className={styles.webcamContainer}>
          <SelfCamera className={styles.videoCam} audio={mic} video={video} handleVideoFromChild={toggleVideo} handleAudioFromChild={toggleMic} />
        </div>
        <div className={styles.toolbox}>
          {
            video ? (<Video onClick={toggleVideo} />) : (<VideoOff onClick={toggleVideo} />) 
          }
          {
            mic ? (<Mic onClick={toggleMic} />) : (<MicOff onClick={toggleMic} />)
          }
        </div>
      </div>
    </div>
  )
}

export default MeetingPage