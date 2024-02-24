import logo from './logo.svg';
import './App.css';
import MyDiv from './MyDiv';
import VideoCapture from './VideoCapture';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: 'flex' }}>
          <div style={{ width: '50%' }}>
            <MyDiv />
          </div>

          <div style={{ width: '100%'}}>
            <VideoCapture />
          </div>
          </div>

        
      </header>
    </div>
  );
}


export default App;
