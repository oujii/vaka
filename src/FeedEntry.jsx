import './App.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import MyPage from './MyPage';
import interact from './images/interact.png';


function FeedEntry({ userpic, username, entryText, entry, likes, comment, numbercomments, usercomment, timestamp }) {
return (
  <div className='feedentry' style={{backgroundColor: 'black', color:'white', paddingBottom:'35px'}}>
    
<div style={{ display: 'flex', paddingTop: '10px', paddingBottom: '10px', width: '100vw', backgroundColor: 'black', alignItems: 'center', justifyContent: 'space-between'}}>
    <img style={{ width: '35px', paddingRight:'6px' }} src={userpic} />
    <div style={{ flex: '1', paddingRight: '6px' }}><b>{username}</b> <span style={{paddingLeft: '6px' }}>{entryText}</span></div>
    <div style={{ paddingRight:'3px', fontSize:'10px', color:'grey' }}>{timestamp}</div>
</div>


<img style={{maxWidth: '100%', paddingBottom: '5px'}} src={entry} />
<div style={{display: 'flex', alignItems: 'center'}}>
    <img src={interact} style={{width: '90px', paddingLeft: '6px', paddingRight: '10px'}} />
                
    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', paddingRight:'3px' }}>{likes}</div>
                
</div>
<div style={{paddingLeft:'5px', paddingTop:'12px'}}><b>{usercomment}</b> {comment} </div>
<div style={{paddingLeft: '5px', paddingTop: '5px'}}>Visa alla {numbercomments} kommentarer</div> 
<div style={{paddingTop:'10px', paddingLeft: '5px', color:'grey'}}>Skriv en kommentar...</div>




  </div>
)
}

export default FeedEntry;
