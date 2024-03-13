// AppLayout.js

import MyDiv from './MyDiv';
import FeedEntry from './FeedEntry';
import VideoCapture from './VideoCapture';
import feedTop from './images/feedTop.png';
import rightColumn from './images/vaka_stream_overlay.webm';
import './App.css';
import React, { useState } from 'react';
import pic1 from './images/profilepic.png';
import pic1entry from './images/entry.png';
import { Link } from 'react-router-dom';


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
    <div className='wrapper'>

     


      
      <div className="feed-container" style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'black', fontSize:'14px' }}>
         <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 999
        }}>

          <a onClick={toggleFullscreen}>
            <img src={feedTop} style={{ maxWidth: '100vw' }} />
          </a>

        </div>


 <FeedEntry userpic={pic1} username="ouji" entryText="mitt inlägg adsd asd a ds dsdsddd dd" timestamp="4 min" entry={pic1entry} likes="antrl32 och 1453 andra gillar detta" usercomment="frida" comment="finis" numbercomments="34" />
 <FeedEntry userpic={pic1} username="ouji" entryText={<Link to="/scener" className="link-style">mitt inlägg</Link>} timestamp="4 min" entry={pic1entry} likes="antrl32 och 1453 andra gillar detta" usercomment="frida" comment="finis" numbercomments="34" />
 <FeedEntry userpic={pic1} username="mufflan" entryText="mitt inlägg" timestamp="4 min" entry={pic1entry} likes="antrl32 och 1453 andra gillar detta" usercomment="frida" comment="finis" numbercomments="34" />

      </div>
    </div>

      



  );
}

export default AppLayout;
