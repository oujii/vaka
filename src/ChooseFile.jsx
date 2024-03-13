import React from 'react';

const MediaUpload = () => {
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    // Handle the selected file (e.g., upload or display it)
  };

  return (
    <div>
      <input type="file" accept="image/*, video/*" onChange={handleFileInputChange} />
    </div>
  );
};

export default MediaUpload;
