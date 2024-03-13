import React, { useState, useEffect, useRef } from 'react';
import recOverlay from './images/video-rec-overlay.png';
import recOverlay2 from './images/video-rec-overlay2.png';
import commentOverlay from './images/record-desc.png';
import bottomRec from './images/bottombar-recording.png'
import bottomRec2 from './images/bottombar-recording2.png'
import bottomRec3 from './images/bottombar-recording3.png'
import { useNavigate } from 'react-router-dom';

const VideoRecorder = ({ facing, zoomy }) => {
  const [videoStream, setVideoStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(2); // Initial zoom level
  const [zoomSliderValue, setZoomSliderValue] = useState(1); // Initial value for the zoom slider
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
  }

  const init = async (facingDirection, zoomy) => {
    try {
      const constraints = {
        audio: false,
        video: { facingMode: 'environment', zoom: 1 }
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setVideoStream(stream);
      videoRef.current.srcObject = stream;

      const [track] = stream.getVideoTracks();
      const capabilities = track.getCapabilities();
      const settings = track.getSettings();

      // Map zoom to a slider element.
      setZoomSliderValue(settings.zoom);

      // Apply zoom constraints when the slider value changes.
      const input = document.querySelector('input[type="range"]');
      input.min = capabilities.zoom.min;
      input.max = capabilities.zoom.max;
      input.step = capabilities.zoom.step;
      input.value = settings.zoom;
      input.oninput = function(event) {
        setZoomSliderValue(event.target.value);
        track.applyConstraints({ advanced: [{ zoom: event.target.value }] });
      };
      input.hidden = false;
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    init(facing, zoomy);
  }, [facing, zoomy]);

  const startRecording = () => {
    if (videoStream && !isRecording) {
      setIsRecording(true);
      const recorder = new MediaRecorder(videoStream, { mimeType: 'video/webm;codecs=vp9,opus' });
      recorder.start();
      recorder.ondataavailable = recordVideo;
      setMediaRecorder(recorder);
    }
  }

  const recordVideo = (event) => {
    if (event.data && event.data.size > 0) {
      const videoUrl = URL.createObjectURL(event.data);
      console.log('Recorded video URL:', videoUrl);
      setVideoUrl(videoUrl);
    }
  }

  const handleZoomTap = () => {
    const newZoom = 10; // Define the new zoom level
    setZoomLevel(newZoom);
  }

  const handleZoomChange = (event) => {
    setZoomSliderValue(event.target.value);
    // Apply zoom level to the video stream
    setZoomLevel(event.target.value);
    // You might need to apply zoom constraints here as well
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === 'Go') {
      event.target.blur();
    }
  }

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  }

  const utbyt = videoUrl ? recOverlay2 : recOverlay;
  const utbyt1 = videoUrl ? bottomRec2 : (isRecording ? bottomRec3 : bottomRec);

  const isLinktoPost = () => {
    navigate('/videorec', { state: { videoUrl } });  
  } 

  return (
    <div className='video-rec-container' >
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
          style={{ transform: 'scale(1.8)' }} // Hardcoded zoom level
          muted
        />
      )}
      <a onClick={toggleFullscreen}><div className='fullscreen'></div></a>
      <img src={commentOverlay} style={{ position: 'relative', zIndex: '999', backgroundColor: 'black', marginBottom: '-5px' }} width="100%" />
      <div className='comment-container' style={{ position: 'relative', zIndex: '999', backgroundColor: 'black' }}>

        <textarea className='comment-video' onKeyDown={handleKeyPress} placeholder="Lägg till beskrivning..."></textarea>
      </div>
      <input 
        type="range" 
        min="1" 
        max="10" 
        value={zoomSliderValue} 
        onChange={handleZoomChange} 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, 100px)',
          zIndex: '999',
          height: '1px', // Set height of the track


        }}
      />
      <img className='bottom-rec-row' onClick={isRecording ? stopRecording : (videoUrl ? isLinktoPost : startRecording)} src={utbyt1} />
    </div>
  );
};

export default VideoRecorder;
