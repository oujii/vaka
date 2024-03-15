// AppLayout.js

import MyDiv from './MyDiv';
import VideoCapture from './VideoCapture';
import tallImage from './images/vid.mp4';
import rightColumn from './images/vaka_stream_overlay.webm';
import VideoRecorder from './VideoRecord';
import './App.css';
import React, { useState, } from 'react';
import { useLocation } from 'react-router-dom';
import Draggable from 'react-draggable';
import MediaUpload from './ChooseFile';
import FeedEntry from './FeedEntry';




const AppLayout = ({ children }) => {
  const location = useLocation();
  const videoUrl = location.state ? location.state.videoUrl : '';
  const comment = location.state ? location.state.comment : '';

  const timestamp = new Date().getTime();
  const filename = `video_${timestamp}.mp4`;

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
    
    <div> 
      
      <a href={videoUrl} download={filename}>
        <FeedEntry userpic="hej.jpg" username="mufflan" entryText={comment} timestamp="4 min" entry={videoUrl} likes="antrl32 och 1453 andra gillar detta" usercomment="frida" comment="finis" numbercomments="34" />
      </a>
  
  

        <MediaUpload />

  
  
  
  
  
  
  </div>
  );
}

export default AppLayout;
