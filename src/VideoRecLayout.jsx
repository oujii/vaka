// AppLayout.js

import MyDiv from './MyDiv';
import VideoCapture from './VideoCapture';
import tallImage from './images/vid.mp4';
import rightColumn from './images/vaka_stream_overlay.webm';
import VideoRecorder from './VideoRecord';
import './App.css';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import TextEditor from './TextEditor';



const AppLayout = ({ children }) => {
  const location = useLocation();
  const videoUrl = location.state ? location.state.videoUrl : '';
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
    <div> <TextEditor /></div>
  );
}

export default AppLayout;
