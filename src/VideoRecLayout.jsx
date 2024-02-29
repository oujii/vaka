// AppLayout.js

import MyDiv from './MyDiv';
import VideoCapture from './VideoCapture';
import tallImage from './images/vid.mp4';
import rightColumn from './images/vaka_stream_overlay.webm';
import './App.css';
import React, { useState } from 'react';


const AppLayout = ({ children }) => {
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
    <div>kkkk</div>
  );
}

export default AppLayout;
