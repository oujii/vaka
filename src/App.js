import './App.css';
import MyDiv from './MyDiv';
import VideoCapture from './VideoCapture';
import tallImage from './images/stories.png';


function App() {
  return (
    <div className="container">
      <div className="column1">
      <div className="column1-top"><img src={tallImage} /></div>
      <div className="column1-bottom">bottom 80%ss</div>
    </div>

    <div className='column2'>
      <VideoCapture />
      <MyDiv />
    </div>
  </div>

  );
}


export default App;
