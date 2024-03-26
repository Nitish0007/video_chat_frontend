import React, { useEffect, useRef, useState } from "react";
import { Video, VideoOff, Mic, MicOff } from "react-feather";
import { useSelector, useDispatch } from "react-redux";

import { updateStream } from "../../redux/features/stream/streamSlice";

import styles from "./SelfCamera.module.scss";

const SelfCamera = ({ useAudio = false, useVideo = false}) => {
  const globalStream = useSelector((state) => state.stream)
  const dispatch = useDispatch();
  const [cameraSettings, setCameraSettings] = useState({
    audio: useAudio || false,
    video: useVideo || false,
    width: '497px',
    height: '280px'
  });
  const [constraints, setConstraints] = useState({
    video: {
      width: { min: 640, ideal: 1920 },
      height: { min: 400, ideal: 1080 },
      aspectRatio: { ideal: 1.7777777778 },
    },
    audio: {
      sampleSize: 16,
      channelCount: 2,
    }
  })
  const streamRef = useRef();
  const videoElemRef = useRef();

  // stop only camera
  function stopVideoOnly(stream) {
    if (!stream) return;
    stream.getTracks().forEach((track) => {
      if (track.readyState == "live" && track.kind === "video") {
        track.stop();
      }
    });

    if (!cameraSettings.audio) streamRef.current = null;
  }

  // stop only audio
  function stopAudioOnly(stream) {
    if (!stream) return;
    stream.getTracks().forEach((track) => {
      if (track.readyState == "live" && track.kind === "audio") {
        track.stop();
      }
    });

    if (!cameraSettings.video) streamRef.current = null;
  }

  const calculateStream = async ({ useAudio = false, useVideo = false }) => {
    let navigator = window.navigator;

    if (!navigator.mediaDevices && !navigator.mediaDevices.getUserMedia) {
      return console.error("Unable to access media devices");
    }

    try {
      const myStream = await navigator.mediaDevices.getUserMedia({
        video: useVideo,
        audio: useAudio
      });
      
      videoElemRef.current.srcObject = myStream
      videoElemRef.current.play()
      streamRef.current = myStream;
    } catch (error) {
      console.error("Error accessing video", error);
    }
  };

  const toggleVideo = async () => {
    if (cameraSettings.video) stopVideoOnly(streamRef.current);
    else
      await calculateStream({
        useVideo: true,
        useAudio: cameraSettings.audio,
      });

    setCameraSettings((prev) => ({ ...prev, video: !prev.video }));
  };

  const toggleAudio = async () => {
    if (cameraSettings.audio) stopAudioOnly(streamRef.current);
    else
      await calculateStream({
        useAudio: true,
        useVideo: cameraSettings.video,
      });

    setCameraSettings((prev) => ({ ...prev, audio: !prev.audio }));
  };

  return (
    <div className={styles.cameraContainer}>
      <div className={styles.videoPlayer}>
        <video className={`${styles.videoPlayer} ${!cameraSettings.video ? styles.hide : ""}`} ref = {videoElemRef} ></video>
        <div className={`${styles.videoPlayer} ${cameraSettings.video ? styles.hide : ""}`}>
          <div className={styles.noVideo}>
            <div className={styles.nameContainer}>
              <p>N</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.controlsContainer}>
        <div className={styles.controlsBox}>
          <div className={styles.icon} onClick={toggleVideo}>
            {cameraSettings.video ? <Video /> : <VideoOff />}
          </div>

          <div className={styles.icon} onClick={toggleAudio}>
            {cameraSettings.audio ? <Mic /> : <MicOff />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfCamera;
