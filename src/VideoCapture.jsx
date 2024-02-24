import React, { useState, useEffect, useRef } from 'react';

const VideoRecorder = () => {
  const [videoStream, setVideoStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);


  useEffect(() => {
    const init = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
        setVideoStream(stream);

        videoRef.current.srcObject = stream;
      } catch (err) {
        console.log(err);
      }
    };
    init();
  }, []);

  const videoRef = useRef(null); 

  const startRecording = () => {
    if (videoStream && !isRecording) {
      setIsRecording(true);
      const recorder = new MediaRecorder(videoStream, { mimeType: 'video/webm;codecs=vp9,opus' });
      recorder.start();
      recorder.ondataavailable = recordVideo;
      setMediaRecorder(recorder);
    }
  };

  const recordVideo = (event) => {
    if (event.data && event.data.size > 0) {
      const videoUrl = URL.createObjectURL(event.data);
      // Handle the recorded video URL as needed (display/save/upload)
      console.log('Recorded video URL:', videoUrl);
      setVideoUrl(videoUrl);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <div>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop' : 'Record'}
      </button>
      <video id="main__video" autoPlay loop muted src={videoUrl}/>
            <video
                ref={videoRef}
                autoPlay

            />

    </div>
  );
};

export default VideoRecorder;
