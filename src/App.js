import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Link, useHistory } from 'react-router-dom';
import MyPage from './MyPage';
import MyPage1 from './MyPage1';
import BackPhoto from './BackPhoto';
import VideoCaptureSelfie from './VideoCaptureSelfie';
import VideoRec from './VideoRec';
import AppLayout from './AppLayout';
import './App.css';
import AppLayoutHome from './AppLayoutHome';
import Camura from './Camura';
import PinchToZoom from './PinchToZoom';
import MyPageLayout from './MyPageLayout';
import ScenerIndex from './ScenerIndex';
import VideoRecLayout from './VideoRecLayout';
import { motion } from 'framer-motion';


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayoutHome><Home /></AppLayoutHome>} />
        <Route path="/scener" element={<ScenerIndex><Home /></ScenerIndex>} />
        <Route path="/selfie" element={<MyPageLayout><MyPage1 /></MyPageLayout>} />
        <Route path="/backphoto" element={<MyPageLayout><BackPhoto /></MyPageLayout>} />
        <Route path="/back" element={<MyPageLayout><MyPage /></MyPageLayout>} />
        <Route path="/livestream" element={<AppLayout><Home /></AppLayout>} />
        <Route path="/camura" element={<MyPageLayout><Camura /></MyPageLayout>} />
        <Route path="/pinch" element={<MyPageLayout><PinchToZoom /></MyPageLayout>} />
        <Route path="/videorec" element={<motion.div
    initial={{ x: 0 }}
    animate={{ x: '-150%' }}
    exit={{ x: '-150%' }}
    transition={{ duration: 0.5 }}
      ><VideoRecLayout><VideoRec /></VideoRecLayout></motion.div>} />
      </Routes>
    </BrowserRouter>
  );
}

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Link to="/mypage">Go to My Page</Link>
    </div>
  );
}

export default App;
