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
import tallImage from './images/vid.mp4';
import VideoRecorder from './VideoRecord';
import { useLocation } from 'react-router-dom';
import Draggable from 'react-draggable';
import MediaUpload from './ChooseFile';
import { shuffle } from 'lodash';


const AppLayout = ({ children }) => {

  const clearLocalStorage = () => {
    localStorage.clear();
  };
  

  const feedEntries = [
    { userpic: pic1, username: "bajs", entryText: "mitt inlägg 1", timestamp: "4 min", entry: pic1entry, likes: "antrl32 och 1453 andra gillar detta", usercomment: "frida", comment: "finis", numbercomments: "34" },
    { userpic: pic1, username: "wall", entryText: <Link to="/scener" className="link-style">mitt inlägg 2</Link>, timestamp: "4 min", entry: pic1entry, likes: "antrl32 och 1453 andra gillar detta", usercomment: "frida", comment: "finis", numbercomments: "34" },
    { userpic: pic1, username: "gunnnar", entryText: <Link to="/scener" className="link-style">mitt inlägg 2</Link>, timestamp: "4 min", entry: pic1entry, likes: "antrl32 och 1453 andra gillar detta", usercomment: "frida", comment: "finis", numbercomments: "34" },
    // Add more variations of FeedEntry here
  ];
  const shuffledFeedEntries = shuffle(feedEntries);
  const location = useLocation();
  const [videoUrl, setVideoUrl] = useState(location.state ? location.state.videoUrl : '');
  const comment = location.state ? location.state.comment : '';
  const timestamp = new Date().getTime();
  const filename = `video_${timestamp}.mp4`;
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





      <div className="feed-container" style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'black', fontSize: '14px' }}>
        <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 999
        }}>

          <a onClick={toggleFullscreen}>
            <img src={feedTop} style={{ maxWidth: '100vw' }} />
          </a>

        </div>

        {videoUrl &&
          <a href={videoUrl} download={filename} onClick={() => {localStorage.clear(); setVideoUrl('');}}>
            <FeedEntry userpic="hej.jpg" username="mufflan" entryText={comment} timestamp="4 min" entry={videoUrl} likes="antrl32 och 1453 andra gillar detta" usercomment="frida" comment="finis" numbercomments="34" />
          </a>
        }

        {/* Render the shuffled feed entries */}
        {shuffledFeedEntries.map((entry, index) => (
          <FeedEntry key={index} {...entry} />
        ))}

      
        <Link to="/camura" style={{
          position: 'sticky',
          marginLeft: '150px',
          marginRight: '150px',
          bottom: 10,
          borderRadius: '50%',
          height: '50px',
          backgroundColor: 'red',
          boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
        }}><div
        ></div></Link>







      </div>
    </div>





  );
}

export default AppLayout;
