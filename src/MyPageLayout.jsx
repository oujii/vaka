// MyPageLayout.js

import React from 'react';

const MyPageLayout = ({ children }) => {
  return (
    <div className='wrapper'>
      <div className="container">
        <div className="column1-record">
          {/* No video or right column in MyPage layout */}
          
        </div>
        <div className='column2-record'>
          {children}
        </div>
      </div>
    </div>
  );
}

export default MyPageLayout;
