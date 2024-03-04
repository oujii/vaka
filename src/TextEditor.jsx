// AppLayout.js

import MyDiv from './MyDiv';
import VideoCapture from './VideoCapture';
import tallImage from './images/vid.mp4';
import rightColumn from './images/vaka_stream_overlay.webm';
import VideoRecorder from './VideoRecord';
import './App.css';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Draggable from 'react-draggable';




const AppLayout = ({ children }) => {
  const location = useLocation();
  const videoUrl = location.state ? location.state.videoUrl : '';
  const inputValue = location.state && location.state.inputValue;
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
   
  return (
    
    <div> <a href='{videoUrl}' download='video.mp4'>download video</a><video id="recorded-video" autoPlay loop>
    <source src={videoUrl} loop autoPlay type="video/webm" />
    Your browser does not support the video tag.
  </video>
  
  
  <Draggable handle=".handle">
        <h1 className='handle'
          style={{
            position: 'absolute',
            zIndex: '999',
            color: 'black',
            left: '50%',
            top: '50%',
            backgroundColor: 'yellow',
            border: 'hidden',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {inputValue}
        </h1></Draggable>

  
  
  
  
  
  
  </div>
  );
}

export default AppLayout;
