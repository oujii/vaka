import './App.css';
import MyDiv from './MyDiv';
import VideoCapture from './VideoCapture';
import tallImage from './images/vid.mp4';
import rightColumn from './images/overlay.png';
import React, { useState } from 'react';


function App() {
  const [setIsFullscreen] = useState(false);
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();

    } else {  
      if (document.exitFullscreen) {
        document.exitFullscreen(); 

      }
    }
  }

  return (
    <div className="container"><a onClick={toggleFullscreen}>
      <div className="column1"></a>
        <video width="100%" src={tallImage} autoPlay alt="tall image"/>

    </div>

    <div className='column2'>
      <div className="video-container">
      <VideoCapture />
      </div>
      <img src={rightColumn} width="100%" alt="right column overlay"/>
      <MyDiv />
    </div>
  </div>

  );
}


export default App;
