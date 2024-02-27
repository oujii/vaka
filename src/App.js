import './App.css';
import MyDiv from './MyDiv';
import VideoCapture from './VideoCapture';
import tallImage from './images/vid.mp4';
import rightColumn from './images/overlay.png';
import topBar from './images/overlay.png';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Link, useHistory } from 'react-router-dom';
import MyPage from './MyPage';


function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();

    } else {  
      if (document.exitFullscreen) {
        document.exitFullscreen(); 

      }
    }
  }
  function handleOverlayClick() {
    // Handle click event for the overlay
    window.location.href = '/mypage';
    console.log('Overlay clicked');
  }


  return (
    <BrowserRouter>
    <div className='wrapper'>
   
    <div className="container"><a onClick={toggleFullscreen}>
      <div className="column1">
        <video width="100%" src={tallImage} autoPlay loop alt="tall image"/>
        
    </div>
</a>
    <div className='column2'>
      <div className="video-container">
      <VideoCapture />
      
      </div>
    <div className="overlay" onClick={handleOverlayClick}></div> {/* Invisible overlay */}
    <img src={rightColumn} width="100%" alt="right column overlay"/>
      
      <Routes>
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
      
      
      <MyDiv />
      sdsds
    </div>
    
  </div>
  </div>
  </BrowserRouter>
  );
}


export default App;
