import React, { useState, useEffect, useRef } from 'react';
import recOverlay from './images/video-rec-overlay.png';
import recOverlay2 from './images/video-rec-overlay2.png';
import commentOverlay from './images/record-desc.png';
import bottomRec from './images/bottombar-recording.png'
import bottomRec2 from './images/bottombar-recording2.png'
import bottomRec3 from './images/bottombar-recording3.png'
import { useNavigate } from 'react-router-dom';
import ZoomVideo from './TextEditor'; 


const VideoRecorder = ({ facing, zoomy }) => {
  const [videoStream, setVideoStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(2); // Initial zoom level


  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();

    } else {  
      if (document.exitFullscreen) {
        document.exitFullscreen(); 

      }
    }
  }


  const init = async (facingDirection, zoomy) => {
    try {
      const constraints = {
        audio: false,
        video: { facingMode: facingDirection, zoom: zoomy }
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setVideoStream(stream);
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    init(facing, zoomy);
  }, [facing, zoomy]);


  const videoRef = useRef(null); 

  const startRecording = () => {
    if (videoStream && !isRecording) {
      setIsRecording(true);
      const recorder = new MediaRecorder(videoStream, { mimeType: 'video/webm;codecs=vp9,opus' });
      recorder.start();
      recorder.ondataavailable = recordVideo;
      setMediaRecorder(recorder);
    }
  };

  const recordVideo = (event) => {
    if (event.data && event.data.size > 0) {
      const videoUrl = URL.createObjectURL(event.data);
      // Handle the recorded video URL as needed (display/save/upload)
      console.log('Recorded video URL:', videoUrl);
      setVideoUrl(videoUrl);
    }
  };


  const handleZoomTap = () => {
    const newZoom = 10; // Define the new zoom level
    setZoomLevel(newZoom);
  };




  
  const handleKeyPress = (event) => {
    // Check if the pressed key is "Enter" or "Go"
    if (event.key === 'Enter' || event.key === 'Go') {
      // Unfocus the input element
      event.target.blur();
  
    } };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };
  const utbyt = videoUrl ? recOverlay2 : recOverlay;
  const utbyt1 = videoUrl ? bottomRec2 : (isRecording ? bottomRec3 : bottomRec);
  const navigate = useNavigate();

  const isLinktoPost = () => {
    navigate('/videorec', { state: { videoUrl } });  } 
  return (
  <div className='video-rec-container'>


        <img 
          className="video-recorder"
          src={utbyt}
          width="100%"
          alt="right column overlay"
          style={{
            opacity: isRecording ? 0 : 1,
            transition: 'opacity 0.5s ease-in-out'
          }}
        />
     
      
      
   

    

    {videoUrl && (
      <video className={`${facing === 'front' ? 'front-camera-style' : ''}`} id="recorded-video" autoPlay loop>
        <source src={videoUrl} loop autoPlay type="video/webm" />
        Your browser does not support the video tag.
      </video>
    )}
    {!videoUrl && (
      <video
        ref={videoRef}
        id="main__video-record"
        className={`${facing === 'front' ? 'front-camera-style' : ''}`}
        autoPlay
        onTouchStart={handleZoomTap}
        loop
        muted
      />
    )}
    <a onClick={toggleFullscreen}><div className='fullscreen'></div></a>
     
    <img src={commentOverlay} width="120px" />
      <div className='comment-container'>
    <textarea className='comment-video'  onKeyDown={handleKeyPress} placeholder="Lägg till beskrivning..."></textarea></div>
    <img className='bottom-rec-row' onClick={isRecording ? stopRecording : (videoUrl ? isLinktoPost : startRecording)} src={utbyt1} />
  </div>
   
  );
};

export default VideoRecorder;
