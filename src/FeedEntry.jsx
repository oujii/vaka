import './App.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import MyPage from './MyPage';
import interact from './images/interact.png';


function FeedEntry({ userpic, username, entryText, entry, likes, comment, numbercomments, usercomment, timestamp, facingDir }) {

  const mirrorName = facingDir === 'user' ? 'mirror' : '';

  return (
  <div className='feedentry' style={{backgroundColor: 'black', color:'white', paddingBottom:'35px'}}>
    
<div style={{ display: 'flex', paddingTop: '10px', paddingBottom: '10px', width: '100vw', backgroundColor: 'black', alignItems: 'center', justifyContent: 'space-between'}}>
    <img style={{ width: '35px', paddingRight:'6px' }} src={userpic} />
    <div style={{ flex: '1', paddingRight: '6px' }}><b>{username}</b> </div>
    <div style={{ paddingRight:'3px', fontSize:'10px', color:'grey' }}>{timestamp}</div>
</div>


{isImage(entry) ? (
        <img style={{ maxWidth: '100%', paddingBottom: '5px' }} src={entry} />
      ) : (
        <video style={{ maxWidth: '100%', paddingBottom: '5px' }} className={mirrorName} loop autoPlay>
          <source src={entry} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      
      <div style={{display: 'flex', alignItems: 'center'}}>
    <img src={interact} style={{width: '90px', paddingLeft: '6px', paddingRight: '10px'}} />
                
    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', paddingRight:'3px' }}>{likes}</div>
                
</div>
<div style={{paddingLeft: '5px', paddingTop: '12px' }}><div style={{ paddingRight: '6px' }}><b>{username}</b> {entryText}</div></div>
<div style={{paddingLeft:'5px', paddingTop:'5px'}}><b>{usercomment}</b> {comment} </div>
<div style={{paddingLeft: '5px', paddingTop: '5px'}}>Visa {numbercomments} kommentarer</div> 
<div style={{paddingTop:'10px', paddingLeft: '5px', color:'grey'}}>Skriv en kommentar...</div>




  </div>
)
function isImage(entry) {
  // Check if entry is a string and starts with the base64 prefix for PNG images
  const isBase64Image = typeof entry === 'string' && entry.startsWith('data:image/png;base64,');
  
  // Check if entry is a string and ends with one of the specified image file extensions
  const isFileExtensionImage = typeof entry === 'string' && entry.match(/\.(jpeg|jpg|gif|png)$/) != null;

  // Return true if entry is either a base64 encoded image or an image with a file extension
  return isBase64Image || isFileExtensionImage;
}
}

export default FeedEntry;
