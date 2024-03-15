import React, { useState, useEffect, useRef } from 'react';
import recOverlay from './images/video-rec-overlay.png';
import recOverlay2 from './images/video-rec-overlay2.png';
import commentOverlay from './images/record-desc.png';
import bottomRec from './images/bottombar-recording.png'
import bottomRec2 from './images/bottombar-recording2.png'
import bottomRec3 from './images/bottombar-recording3.png'
import { useNavigate, Link } from 'react-router-dom';


const VideoRecorder = ({ facing, zoomy }) => {
  const [facingcamMode, setFacingcamMode] = useState('dd1be32de69f4ac0178be19039aca7958ef6f5ae3759e0fec4ff9aef012ed467'); // Initialize facing mode state
  const [videoStream, setVideoStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [comment, setComment] = useState(''); // State variable to hold textarea content
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(2); // Initial zoom level
  const [zoomSliderValue, setZoomSliderValue] = useState(1); // Initial value for the zoom slider
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [videoAdded, setVideoAdded] = useState(false); // Initialize videoAdded state
  const [cameraIds, setCameraIds] = useState([]); // Initialize state to hold camera IDs
  const [cameraIdsFetched, setCameraIdsFetched] = useState(false);
  const refreshPage = () => {

    window.location.reload();
  
  }

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
      const deviceIds = [
        'e6fda4cd899527b6afc6c3d1c16b6c7224b1597eed3b9eff22e62358695a083e',
        '37886fffb19a841faf57f04e73eb59c89d84a66ad9a8186670fcbad2232bfe20',
        '7c30901f7985b174d3a0810cd0168d3870346d1407ae4c1b7df74a9a8d74e2b9',
        '438bfea109dc35a819c7cc5253b0e65d58cb40e06add9a2bdebb1e9394e57591'
      ];      const currentDeviceIndex = deviceIds.indexOf(facingcamMode);
      const nextDeviceIndex = (currentDeviceIndex + 1) % deviceIds.length;
      const nextDeviceId = deviceIds[nextDeviceIndex];
  
      const constraints = {
        audio: false,
        video: { deviceId: { exact: nextDeviceId }, zoom: zoomy }
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setVideoStream(stream);
      videoRef.current.srcObject = stream;
  
      const [track] = stream.getVideoTracks();
      const capabilities = track.getCapabilities();
      const settings = track.getSettings();
  
      setZoomSliderValue(settings.zoom);
  
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
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        const cameras = devices.filter(device => device.kind === 'videoinput');
        const ids = cameras.map(camera => camera.deviceId);
        setCameraIds(ids);
        setCameraIdsFetched(true); // Set cameraIdsFetched to true after fetching camera IDs
      })
      .catch(err => console.log(err));
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
  const flipCam = () => {
    try {
      const deviceIds = ['4015aa0f5696f01fd9cffc3fe980739ce287c4fd83074ca821dd658dd63aecf0', 'b95bced424013fa7d35a3de3ad2ce76c5c4f5aace9e3088d05637d5fd6d53954', 'fc320b79c6cf0915cc6bc9d6a6a69d6a6ae4c9e1e3ace41a22bfed9a756eb7f2', '2247a091306ac9f22f4a0a17cca5154fea83f45e05721d350ee19cc9224e5b45'];
      const currentDeviceIndex = deviceIds.indexOf(facingcamMode);
      const nextDeviceIndex = (currentDeviceIndex + 1) % deviceIds.length;
      const nextDeviceId = deviceIds[nextDeviceIndex];
      setFacingcamMode(nextDeviceId);
      init(facing, zoomy); // Reinitialize with the new device ID
    } catch (err) {
      console.log(err);
    }
  }

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) {
      const videoUrl = URL.createObjectURL(file);
      setVideoUrl(videoUrl);
      setVideoAdded(true); // Set videoAdded to true when a video is added
    } else {
      setVideoAdded(false); // Reset videoAdded to false if a non-video file is selected// Handle the case where a non-video file is selected, if needed
    }
  };

  const utbyt = videoUrl ? recOverlay2 : recOverlay;
  const utbyt1 = videoUrl ? bottomRec2 : (isRecording ? bottomRec3 : bottomRec);

  const handleCommentChange = (event) => {
    setComment(event.target.value); // Update the textarea content
  }
  const isLinktoPost = () => {
    navigate('/', { state: { videoUrl, comment } });  
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
        <video className={`${facing === 'front' ? 'front-camera-style' : ''}`}   id={videoAdded ? "recorded-video-from-os" : "recorded-video"} autoPlay loop>
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
      <a onClick={flipCam}><div className='flipcam'></div></a>
      <a onClick={refreshPage}><div className='refresh'></div></a>
      <input type="file" id="laddaupp" className='upload' accept="video/*" onChange={handleFileInputChange} />
      <Link to={'/'}>
      <div className='goback'></div></Link>

      <img src={commentOverlay} style={{ position: 'relative', zIndex: '999', backgroundColor: 'black', marginBottom: '-5px' }} width="100%" />
      <div className='comment-container' style={{ position: 'relative', zIndex: '999', backgroundColor: 'black' }}>

        <textarea className='comment-video' onKeyDown={handleKeyPress}  value={`Camera IDs: ${cameraIds.join(', ')}`} 
          onChange={handleCommentChange} placeholder="Lägg till beskrivning..."></textarea>
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
