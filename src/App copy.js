import './App.css';
import MyDiv from './MyDiv';
import VideoCapture from './VideoCapture';
import tallImage from './images/stories.png';
import scrollImage from './images/feed_scroll.png';
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
    <div className="container">
      <div className="column1">
      <div className="column1-top"><a onClick={toggleFullscreen}><img className="stories" src={tallImage} alt='test'/></a></div>
      <div className="column1-bottom"><img className="scroll" src={scrollImage} alt='test'/></div>
    </div>

    <div className='column2'>
      <VideoCapture />
      <MyDiv />
    </div>
  </div>

  );
}


export default App;
