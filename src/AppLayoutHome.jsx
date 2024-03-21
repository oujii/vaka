// AppLayout.js

import MyDiv from './MyDiv';
import FeedEntry from './FeedEntry';
import VideoCapture from './VideoCapture';
import feedTop from './images/feedTop.png';
import rightColumn from './images/vaka_stream_overlay.webm';
import React, { useState, useEffect } from 'react';
import pic1 from './images/profilepic.png';
import pic1entry from './images/entry.png';
import newPost from './images/new-post.png';
import profilePic from './images/profilepic.png';
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
    { userpic: pic1, username: "wall", entryText: 'mitt inlägg 22', timestamp: "4 min", entry: pic1entry, likes: "antrl32 och 1453 andra gillar detta", usercomment: "frida", comment: "finis", numbercomments: "34" },
    { userpic: pic1, username: "gunnnar", entryText: 'mitt inlägg', timestamp: "4 min", entry: pic1entry, likes: "antrl32 och 1453 andra gillar detta", usercomment: "frida", comment: "finis", numbercomments: "34" },
    { 
      userpic: pic1, 
      username: "kalle_j", 
      entryText: "Träning är bästa medicinen 💪", 
      timestamp: "2 timmar sedan", 
      entry: './feed/entry.png',
      likes: "sara87 och 76 andra gillar detta", 
      usercomment: "emma02", 
      comment: "Håller med! Alltid skönt efteråt.", 
      numbercomments: "8" 
    },
    // Add more variations of FeedEntry here
  ];
  const shuffledFeedEntries = shuffle(feedEntries);
  const location = useLocation();
  const [videoUrl, setVideoUrl] = useState(location.state ? location.state.videoUrl : '');
  const [photoUrl, setPhotoUrl] = useState(location.state ? location.state.photoUrl : '');
  const [facingDir, setFacingDir] = useState(location.state ? location.state.facingDir : '');
  const comment = location.state ? location.state.comment : '';
  const timestamp = new Date().getTime();
  const filename = `video_${timestamp}.mp4`;
  const filenamePhoto = `photo_${timestamp}.jpg`;
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [randomFeedTop, setRandomFeedTop] = useState('');
  const [likes, setLikes] = useState(0); // Initial likes count
  const [likeText, setLikeText] = useState(""); // Initial like text
  const likeTextArray = ["Love this!", "Great content!", "Awesome!", "Fantastic!"];


  useEffect(() => {
    // Array containing file paths or URLs of 10 similar photos
    const feedTopImages = [
      './events/story1.png',
      './events/story2.png',
      './events/story3.png',
      './events/story4.png',
      './events/story5.png',
      './events/story6.png',
      './events/story7.png',
      './events/story8.png',
      './events/story9.png',
      './events/story10.png',
      // Add paths for the other images here
    ];

    // Function to select a random photo from the array
    const getRandomFeedTop = () => {
      const randomIndex = Math.floor(Math.random() * feedTopImages.length);
      return feedTopImages[randomIndex];
    };
    setRandomFeedTop(getRandomFeedTop());

  }, []); // Empty dependency array to run only once when component mounts
    

  console.log(facingDir);

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();

    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();

      }
    }
  }

  const updateLikes = () => {
    // Update likes count randomly or based on some logic
    const newLikes = Math.floor(Math.random() * 100); // Example: Random likes count
    setLikes(newLikes);

    // Update like text from array
    const randomIndex = Math.floor(Math.random() * likeTextArray.length);
    setLikeText(likeTextArray[randomIndex]);

    
  };



  return (
    <div className='wrapper'>





      <div className="feed-container" style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'black', fontSize: '14px' }}>
        <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 999
        }}>

          <a onClick={toggleFullscreen}>
            <img src={randomFeedTop} style={{ maxWidth: '100vw'}} />
          </a>

        </div>

        {videoUrl ? (
          <a href={videoUrl} download={filename} onClick={() => {localStorage.clear(); setVideoUrl('');}}>
          <FeedEntry userpic={profilePic} username="EverLastingLinda" entryText={comment} timestamp="Nu" entry={videoUrl} likes={`${likes} personer gillar detta`} usercomment="" comment={likeText} numbercomments="" facingDir={facingDir}/>


          </a>) : (photoUrl ? (
                      <a href={photoUrl} download={filenamePhoto} onClick={() => {localStorage.clear(); setPhotoUrl('');}}><FeedEntry userpic={profilePic} username="EverLastingLinda" entryText={comment} timestamp="Nu" entry={photoUrl} likes="3 personer gillar detta" usercomment="" comment="" numbercomments="" /></a>

        ) : (null))
        }

        {/* Render the shuffled feed entries */}
        {shuffledFeedEntries.map((entry, index) => (
          <FeedEntry key={index} {...entry} />
        ))} 

      
        <Link to="/camura" style={{
          position: 'sticky',
          bottom: 20,
        }}><img src={newPost} style={{
          position: 'sticky',
          marginLeft: '137px',
          width: '70px',
        }}></img>
        </Link>







      </div>
    </div>





  );
}

export default AppLayout;
