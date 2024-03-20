import React, { useState, useEffect, useRef } from 'react';
import recOverlay from './images/video-rec-overlay.png';
import recOverlay2 from './images/video-rec-overlay2.png';
import commentOverlay from './images/record-desc.png';
import bottomRec from './images/bottombar-recording.png'
import bottomRec2 from './images/bottombar-recording2.png'
import bottomRec3 from './images/bottombar-recording3.png'
import bottomBar from './images/bottom-bar_photo.png'
import flip from './images/flip.png'
import utbyt from './images/OVERLAY_photo.png'
import bottomBarPost from './images/bottom-bar_photo-post.png'
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './Photocam.css';


const VideoRecorder = () => {
  const [videoStream, setVideoStream] = useState(null);
  const [comment, setComment] = useState(''); // State variable to hold textarea content
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(2); // Initial zoom level
  const [zoomSliderValue, setZoomSliderValue] = useState(1); // Initial value for the zoom slider
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [videoAdded, setVideoAdded] = useState(false); // Initialize videoAdded state
  const [facingDir, setFacingDir] = useState('environment'); // Initial facing mode
  const [photoUrl, setPhotoUrl] = useState(null); // State variable to hold the photo URL
  const [imageUrl, setImageUrl] = useState(null); // State variable to hold the photo URL
  const [imageAdded, setImageAdded] = useState(null); // State variable to hold the photo URL
  const canvasRef = useRef(null); // Create a ref for the canvas element
  const [savedPhotos, setSavedPhotos] = useState([]); // State variable to store saved photos

  const location = useLocation();
  const capturedPhotoUrl = location.state?.photoUrl; // Access photoUrl from location state

  useEffect(() => {
    if (capturedPhotoUrl) {
      setPhotoUrl(capturedPhotoUrl);
    }
  }, [capturedPhotoUrl]);

  const refreshPage = () => {

    setPhotoUrl(null);
    setImageUrl(null);
    setImageAdded(false);
    init();
  
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

  const init = async () => {
    try {
      const constraints = {
        audio: false,
        video: { facingMode: facingDir } // Remove zoom property

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
    init();
  }, [facingDir]);


 

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


  const flipCam = async () => {
    try {
     
      facingDir == 'user' ? setFacingDir('environment') : setFacingDir('user');
      init(); // Re-initialize to update the video stream with the new device
    } catch (err) {
      console.log(err);
    }
  }
  
  
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
      setImageAdded(true);
    } else {
      setImageAdded(false);
    }
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const photoUrl = canvas.toDataURL('image/png');
    
    setPhotoUrl(photoUrl);
    // Use photoUrl as needed (e.g., display in an image element, upload to server)

      // Add the last taken photo URL to the array of saved photos
  setSavedPhotos(prevPhotos => {
    const newPhotos = [...prevPhotos, photoUrl];
    // Keep only the last 8 saved photos
    return newPhotos.slice(-8);
  });
  }


  const handleCommentChange = (event) => {
    setComment(event.target.value); // Update the textarea content
  }
    const isLinktoPost = () => {
    if (imageAdded) {
      const photoUrl = imageUrl;
      navigate('/', { state: { photoUrl, comment } });
    } else {
      navigate('/', { state: { photoUrl, comment } });
    }
  }


  
  const browsePhotos = () => {
    navigate('/photos', {state: {savedPhotos, facingDir}});
  }

  return (
    <div className='video-rec-container' >
       <img 
        className="video-recorder"
        src={utbyt}
        width="100%"
        alt="right column overlay"
        style={{
          marginTop: '10vh'
        }}  
      />

{!capturedPhotoUrl && photoUrl && (
  <img className={`${facingDir === 'user' ? 'thumbnail' : 'thumbnail-reverse'}`}  onClick={browsePhotos} src={photoUrl} alt="Captured Photo" />
)}
        {capturedPhotoUrl || imageAdded ? (<img id="main__video-record" className='attached-pic' style={{marginTop: '10vh'}} src={imageAdded ? imageUrl: photoUrl} />) : (
          
          <video
          ref={videoRef}
          id="main__video-record"
          className={`${facingDir === 'user' ? 'front-camera-style' : ''}`} 
          autoPlay
          onTouchStart={handleZoomTap}
          loop

          muted
        />)}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      
      
      <a onClick={toggleFullscreen}><div className='fullscreen'></div></a>
      <Link to={'/livestream'}><div className='video-roll'></div></Link>
      <a onClick={flipCam}>
  <div className='flipcam' style={{display:'hidden'}}></div>
</a>
<a onClick={refreshPage}>
  <div className='refresh'></div> 
</a>

      <Link to={'/camura'}><div className='stream'></div></Link>
      <input type="file" id="laddaupp" className='upload' accept="image/*" onChange={handleFileInputChange} />
      <Link to={'/'}>
      <div className='goback'></div></Link>

      <img src={commentOverlay} style={{ position: 'relative', zIndex: '999', backgroundColor: 'black', marginBottom: '-5px' }} width="100%" />
      <div className='comment-container' style={{ position: 'relative', zIndex: '999', backgroundColor: 'black' }}>

        <textarea className='comment-video' onKeyDown={handleKeyPress}  value={comment}
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
          width: '200px',
          height: '1px',
          top: '40%',
          right: '-25%',
          opacity: '0.01',
          zIndex: '999',
          background: 'linear-gradient(to right, #007bff, #007bff)',
          borderRadius: '0px',
          transform: 'rotate(-90deg)', // Rotate the container instead of the input
          transformOrigin: 'center', // Ensure rotation is around the center
      }}
      />
      {!capturedPhotoUrl && !imageUrl ? (
        <img className='bottom-rec-row' src={bottomBar} onClick={capturePhoto} />
      ) : (
        <img className='bottom-rec-row' onClick={isLinktoPost} src={bottomBarPost} />
      )}



    
    </div>
  );
};

export default VideoRecorder;
