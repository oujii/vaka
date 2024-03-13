import React, { useState, useEffect, useRef } from 'react';
import recOverlay from './images/video-rec-overlay.png';
import recOverlay2 from './images/video-rec-overlay2.png';
import commentOverlay from './images/record-desc.png';
import bottomRec from './images/bottombar-recording.png';
import bottomRec2 from './images/bottombar-recording2.png';
import bottomRec3 from './images/bottombar-recording3.png';
import { useNavigate } from 'react-router-dom';

const VideoRecorder = () => {
  const [videoStream, setVideoStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [zoom, setZoom] = useState(1);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {  
      if (document.exitFullscreen) {
        document.exitFullscreen(); 
      }
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: 'environment' } });
        setVideoStream(stream);
        videoRef.current.srcObject = stream;
        const [track] = stream.getVideoTracks();
        const capabilities = track.getCapabilities();
        const { min, max } = capabilities.zoom;
        videoRef.current.min = min;
        videoRef.current.max = max;
      } catch (err) {
        console.log(err);
      }
    };
    init();

    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handlePinchToZoom = (event) => {
    event.preventDefault(); // Prevent default scroll behavior
    // Increase or decrease the zoom level based on pinch gesture
    setZoom(prevZoom => {
      // Calculate new zoom value based on pinch gesture
      const newZoom = prevZoom + event.deltaY * 0.01; // Adjust the sensitivity as needed
      // Ensure the new zoom value is within the allowable range
      const minZoom = videoRef.current.min;
      const maxZoom = videoRef.current.max;
      return Math.min(Math.max(newZoom, minZoom), maxZoom);
    });
  };

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
      console.log('Recorded video URL:', videoUrl);
      setVideoUrl(videoUrl);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const isLinktoPost = () => {
    navigate('/videorec', { state: { videoUrl } });  
  };

  return (
    <div className='video-rec-container'>
      <img 
        className="video-recorder"
        src={isRecording ? recOverlay2 : recOverlay}
        width="100%"
        alt="right column overlay"
        style={{
          opacity: isRecording ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out'
        }}
      />
      {videoUrl && (
        <video id="recorded-video" autoPlay loop>
          <source src={videoUrl} loop autoPlay type="video/webm" />
          Your browser does not support the video tag.
        </video>
      )}
      {!videoUrl && (
        <video
          ref={videoRef}
          id="main__video-record"
          autoPlay
          loop
          muted
          onWheel={handlePinchToZoom}
          style={{
            position: 'relative',
            backgroundSize: 'cover',
            willChange: 'transform',
            cursor: 'grab',
            touchAction: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: '500',
            fontSize: '22px',
            textAlign: 'center',
            color: '#ffffffaa',
            transform: `scale(${zoom})`,
          }}
        />
      )}
      <a onClick={toggleFullscreen}><div className='fullscreen'></div></a>
      <img src={commentOverlay} width="120px" />
      <div className='comment-container'>
        <textarea className='comment-video' placeholder="Lägg till beskrivning..."></textarea>
      </div>
      <img className='bottom-rec-row' onClick={isRecording ? stopRecording : (videoUrl ? isLinktoPost : startRecording)} src={isRecording ? bottomRec3 : bottomRec2} />
    </div>
  );
};

export default VideoRecorder;
