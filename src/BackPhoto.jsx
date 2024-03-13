import React, { useState, useEffect, useRef } from 'react';
import recOverlay from './images/video-rec-overlay.png';
import commentOverlay from './images/record-desc.png';
import bottomRec from './images/bottombar-recording.png';
import bottomRec2 from './images/bottombar-recording2.png';
import { useNavigate } from 'react-router-dom';
import './photo-recorder.css'; // Import the CSS file

const PhotoRecorder = ({ facing, zoomy }) => {
  const [photoUrls, setPhotoUrls] = useState([]);
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const miniatureContainerRef = useRef(null);

  const initCamera = async (facingDirection, zoomy) => {
    try {
      const constraints = {
        audio: false,
        video: { facingMode: 'environment', zoom: zoomy }
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video = document.createElement('video');
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        video.play();
      };
      const previewContainer = document.getElementById('camera-preview');
      // Clear any existing children before appending the video
      previewContainer.innerHTML = '';
      previewContainer.appendChild(video);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    initCamera(facing, zoomy);
  }, []);

  const takePhoto = () => {
    const canvas = document.createElement('canvas');
    const video = document.querySelector('video');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    const photoUrl = canvas.toDataURL('image/jpeg');
    setPhotoUrls([photoUrl, ...photoUrls]); // Add new photo URL at the beginning
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const selectPhoto = (photoUrl) => {
    setSelectedPhotoUrl(photoUrl);
  };

  const navigate = useNavigate();

  const isLinktoPost = () => {
    navigate('/photorec', { state: { photoUrls } });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === 'Go') {
      event.target.blur();
    }
  };

  const utbyt = photoUrls.length > 0 ? bottomRec2 : bottomRec;

  return (
    <div className='photo-rec-container'>
      <img
        className="photo-overlay"
        src={recOverlay}
        width="100%"
        alt="photo overlay"
      />
      <div id="camera-preview" className={`camera-preview ${selectedPhotoUrl ? 'hidden' : ''}`}></div>
      {selectedPhotoUrl ? (
        <img src={selectedPhotoUrl} alt="selected-photo" className="selected-photo" onClick={() => setSelectedPhotoUrl(null)} />
      ) : (
        <div ref={miniatureContainerRef} className='miniature-photos-container'>
          {photoUrls.map((url, index) => (
            <img key={index} src={url} alt={`photo-${index}`} className="miniature-photo" onClick={() => selectPhoto(url)} />
          ))}
        </div>
      )}
      <a onClick={toggleFullscreen}><div className='fullscreen'></div></a>
      
      <div className='comment-container'>
        <textarea className='comment-photo' onKeyDown={handleKeyPress} placeholder="Lägg till beskrivning..."></textarea>
      </div>
      <img className='bottom-rec-row' onClick={takePhoto} src={utbyt} />
    </div>
  );
};

export default PhotoRecorder;
