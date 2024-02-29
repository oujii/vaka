import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Link, useHistory } from 'react-router-dom';
import MyPage from './MyPage';
import VideoRec from './VideoRec';
import './App.css';
import AppLayout from './AppLayout';
import MyPageLayout from './MyPageLayout';
import VideoRecLayout from './VideoRecLayout';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout><Home /></AppLayout>} />
        <Route path="/mypage" element={<MyPageLayout><MyPage /></MyPageLayout>} />
        <Route path="/videorec" element={<VideoRecLayout><VideoRec /></VideoRecLayout>} />
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
