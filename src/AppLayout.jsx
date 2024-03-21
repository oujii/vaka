// AppLayout.js

import MyDiv from './MyDiv';
import VideoCapture from './VideoCapture';
import tallImage from './images/vaka_stream_chat.webm';
import rightColumn from './images/vaka_stream_overlay.webm';
import { useNavigate, Link } from 'react-router-dom';
import './App.css';



import React, { useState } from 'react';


const AppLayout = ({ children }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isStopStream, setStopStream] = useState(false);
    const navigate = useNavigate();


    function toggleFullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
  
      } else {  
        if (document.exitFullscreen) {
          document.exitFullscreen(); 
  
        }
      }
    }

    const nextStream = () => {
      navigate('/livestream2');  
    } 
    
    const stopStream = () => {
      navigate('/stoppedlivestream');  
    } 
    

 
   
  return (
    <div className='wrapper'>
    
      <div className="container">
      <a onClick={toggleFullscreen}>
        <div className="column1">
          <video width="100%" src={tallImage} autoPlay loop alt="tall image"/>
        </div></a>
        <div className='column2'>
          <div className="video-container">
            <VideoCapture />
          </div>
          <video src={rightColumn} autoPlay loop width="100%" alt="right column overlay"/>
          {children}
          <MyDiv />
        </div>
        <div className='bottom-row'> </div>
        <a onClick={nextStream}><div className='toggleStream'> </div></a>


       


      </div>
    </div>
  );
}

export default AppLayout;
