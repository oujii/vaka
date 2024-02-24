import React, { Component } from 'react';

class WebcamCapture extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        this.videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error accessing webcam:', error);
      });
  }

  render() {
    return (
      <div>
        <h2>Webcam Capture</h2>
        <video ref={this.videoRef} autoPlay />
      </div>
    );
  }
}

export default WebcamCapture;
