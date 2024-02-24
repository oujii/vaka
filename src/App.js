import './App.css';
import MyDiv from './MyDiv';
import VideoCapture from './VideoCapture';
import tallImage from './images/stories.png';
import React, { useState } from 'react';


function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {  
      if (document.exitFullscreen) {
        document.exitFullscreen(); 
        setIsFullscreen(false);
      }
    }
  }

  return (
    <div className="container">
      <div className="column1">
      <div className="column1-top"><img src={tallImage} alt='test'/></div>
      <div className="column1-bottom"><button onClick={toggleFullscreen}>
        {isFullscreen ? 'Exit Fullscreen' : 'Go Fullscreen'}  
      </button></div>
    </div>

    <div className='column2'>
      <VideoCapture />
      <MyDiv />
    </div>
  </div>

  );
}


export default App;
