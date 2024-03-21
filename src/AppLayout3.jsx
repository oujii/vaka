// AppLayout.js (stopped Livestream)

import MyDiv from './MyDiv';
import VideoCapture from './VideoCapture';
import leftImage from './images/livestream-stop_left.png';
import rightImage from './images/livstream-quit_right.png';
import rightColumn from './images/vaka_stream_overlay.webm';
import { useNavigate, Link } from 'react-router-dom';



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
      navigate('/livestream');  
    } 

    const stopStream = () => {
      navigate('/stoppedlivestream');  
    } 
    


 
   
  return (
    <div className='wrapper'>
      <div className="container">
      <a onClick={toggleFullscreen}>
        <div className="column1">
          <img width="100%" src={leftImage} autoPlay loop alt="tall image"/>
        </div></a>
        <div className='column2'>
          <div className="video-container">
            <VideoCapture />
          </div>
          <img src={rightImage} autoPlay loop width="100%" alt="right column overlay"/>
          {children}
          <MyDiv />
        </div>
        <div className='bottom-row-stopped'> </div>
        <a onClick={nextStream}><div className='toggleStream'></div></a>
        <a onClick={stopStream}><div className='stopStream'></div></a>


      </div>
    </div>
  );
}

export default AppLayout;
