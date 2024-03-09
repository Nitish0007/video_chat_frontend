import React, {useEffect, useRef, useMemo, useState} from 'react'
import ReactPlayer from 'react-player';
import { Video, VideoOff, Mic, MicOff } from 'react-feather';

import styles from './SelfCamera.module.scss'

const SelfCamera = (props) => {
  const [video, setVideo] = useState(false)
  const [audio, setAudio] = useState(false)
  // const [videoStream, setVideoStream] = useState(null)
  // const [audioStream, setAudioStream] = useState(null)

  const videoStreamRef = useRef();
  const audioStreamRef = useRef();
  const streamRef = useRef();

  function stopBothVideoAndAudio(stream) {
    if(!stream) return
    stream.getTracks().forEach((track) => {
      if (track.readyState == "live") {
        track.stop();
      }
    });
  }

  // stop only camera
  function stopVideoOnly(stream) {
    if(!stream) return
    stream.getTracks().forEach((track) => {
      if (track.readyState == "live" && track.kind === "video") {
        track.stop();
      }
    });
  }

  // stop only mic
  function stopAudioOnly(stream) {
    if(!stream) return
    stream.getTracks().forEach((track) => {
      if (track.readyState == "live" && track.kind === "audio") {
        track.stop();
      }
    });
  }

  const calculateVideoStream = async () => {
    let navigator = window.navigator;

    if (!navigator.mediaDevices && !navigator.mediaDevices.getUserMedia) {
      return console.error("Browser does not support media devices");
    }

    try {
      const myStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      videoStreamRef.current = myStream;
      setVideo(!video)
      console.log(videoStreamRef.current)
    } catch (error) {
      console.log("Error accessing video", error);
    }
  };

  const calculateAudioStream = async () => {
    let navigator = window.navigator;

    if (!navigator.mediaDevices && !navigator.mediaDevices.getUserMedia) {
      return console.error("Browser does not support media devices");
    }

    try {
      const myStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      console.log(myStream)
      audioStreamRef.current = myStream;
    } catch (error) {
      console.log("Error accessing video", error);
    }
  };

  const calculateBothAudioAndVideoStream = async () => {
    let navigator = window.navigator;

    if (!navigator.mediaDevices && !navigator.mediaDevices.getUserMedia) {
      return console.error("Browser does not support media devices");
    }

    try {
      const myStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      });
      console.log(myStream)
      streamRef.current = myStream;
    } catch (error) {
      console.log("Error accessing media devices", error);
    }
  }

  // const handleVideoStream = useMemo(async () => {
  //   let navigator = window.navigator

  //   if(!navigator.mediaDevices && !navigator.mediaDevices.getUserMedia){
  //     return console.error("Browser does not support media devices");
  //   }

  //   if(video){
  //     console.log("only video")
  //     try{
  //       const myStream = await navigator.mediaDevices.getUserMedia({video: true})
  //         console.log(myStream)
  //         setVideoStream(myStream)
  //       }
  //     catch(error){
  //       console.log("Error accessing camera: ",error)
  //     }
  //   }
  //   else{
  //     console.log("no video")
  //     setVideoStream(null)
  //   }
  // }, [video])

  // const handleAudioStream = useMemo(async () => {
  //   let navigator = window.navigator

  //   if(!navigator.mediaDevices && !navigator.mediaDevices.getUserMedia){
  //     return console.error("Browser does not support media devices");
  //   }

  //   if(audio){
  //     console.log("only audio")
  //     try{
  //       const myStream = await navigator.mediaDevices.getUserMedia({audio: true})
  //         console.log(myStream)
  //         setAudioStream(myStream)
  //       }
  //     catch(error){
  //       console.log("Error accessing mic: ",error)
  //     }
  //   }
  //   else{
  //     console.log("no audio")
  //     setAudioStream(null)
  //   }
  // }, [audio])

  const toggleVideo = () => {
    calculateVideoStream()
  }

  const toggleAudio= () => {
    setAudio(!audio)
  }

  useEffect(() => {
    if (audio && video) calculateBothAudioAndVideoStream();
    else if(audio && !video){
      calculateAudioStream();
      stopVideoOnly(videoStreamRef.current);
    }
    else if(video && !audio){
      calculateVideoStream();
      stopAudioOnly(audioStreamRef.current);
    }
    else stopBothVideoAndAudio(streamRef.current);
  }, [audio, video]);

  // useEffect(() => {
  //   toggleVideo();
  // }, [props.video])

  // useEffect(() => {
  //   toggleAudio();
  // }, [props.audio])


  return (
    <div className={styles.cameraContainer} >
      {
        videoStreamRef.current ? (
          audioStreamRef.current ? ( 
          <ReactPlayer className={styles.playerStyle} url={streamRef.current} playing height='260px' width='340px' /> 
          ) : (
          <ReactPlayer className={styles.playerStyle} url={videoStreamRef.current} playing height='260px' width='340px' />
          )
        ) 
        : 
        // (
          // audioStreamRef.current ?
          // <ReactPlayer className={styles.playerStyle} url={audioStreamRef.current} playing height='260px' width='340px' />
          // :
          // (
            <div className={styles.noVideo}>
              <div className={styles.nameContainer}>
                <p>N</p>
              </div>
            </div>
        //   )
        // )
      }
      <div className={styles.controlsContainer}>
        <div className={styles.controlsBox}>
          {
            video ? (
              <div className={styles.icon} onClick={toggleVideo} >
                <Video />
              </div>
            ) : (
              <div className={styles.icon} onClick={toggleVideo}>
                <VideoOff />
            </div>
            ) 
          }
          {
            audio ? (
              <div className={styles.icon} onClick={toggleAudio}>
                <Mic />
              </div>
            ) : (
              <div className={styles.icon} onClick={toggleAudio}>
                <MicOff />
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default SelfCamera