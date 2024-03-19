import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import pickPhoto from './images/pick-photo.png';



const PhotosComponent = () => {
  const location = useLocation();
  const savedPhotos = location.state.savedPhotos; // Access savedPhotos from location state
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const navigate = useNavigate();

  const handleSelectPhoto = (photoUrl) => {
    setSelectedPhoto(photoUrl);
    // Here you can send the selected photoUrl back to another component
    // For demonstration purposes, let's log the selected photoUrl
    console.log("Selected Photo:", photoUrl);


    navigate('/photocam', {state: {photoUrl}});

  };

  return (
    <div style={{ 
  maxWidth: "100%", 
  minHeight: '100vh', 
  overflow: 'hidden', 
  backgroundColor: 'black',
}}>
<img src={pickPhoto} className='pickphoto-overlay'></img>

      <SwipeableViews enableMouseEvents>
        {savedPhotos.map((photoUrl, index) => (
          <div key={index} style={{ position: 'relative' }}>
            <img className='mirror' style={{ maxWidth: "100vw", paddingTop: '50%' }} src={photoUrl} alt={`Photo ${index}`} />
            <button
              style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', padding: '10px', borderRadius: '5px', background: 'white', color: 'black', border: 'none', cursor: 'pointer' }}
              onClick={() => handleSelectPhoto(photoUrl)}
            >
              Pick this photo
            </button>
          </div>
        ))}
      </SwipeableViews>
    </div>
  );
};

export default PhotosComponent;
