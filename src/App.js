import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Link, useHistory } from 'react-router-dom';
import MyPage from './MyPage';
import MyPage1 from './MyPage1';
import BackPhoto from './BackPhoto';
import VideoCaptureSelfie from './VideoCaptureSelfie';
import VideoRec from './VideoRec';
import AppLayout from './AppLayout';
import AppLayout2 from './AppLayout2';
import AppLayout3 from './AppLayout3';
import AppLayoutHome from './AppLayoutHome';
import Camura from './Camura';
import Browsephotos from './Browsephotos';
import Photocam from './Photocam';
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
        <Route path="/livestream" element={<AppLayout><Home /></AppLayout>} />
        <Route path="/livestream2" element={<AppLayout2><Home /></AppLayout2>} />
        <Route path="/stoppedlivestream" element={<AppLayout3><Home /></AppLayout3>} />
        <Route path="/camura" element={<MyPageLayout><Camura /></MyPageLayout>} />
        <Route path="/photocam" element={<MyPageLayout><Photocam /></MyPageLayout>} />
        <Route path="/photos" element={<Browsephotos />} />

      </Routes>
    </BrowserRouter>
  );
}

const Home = () => {
 
}

export default App;
