import './App.css';
import { motion } from 'framer-motion';
import VideoRecord from './VideoRecord';

function MyPage1() {
return (
    <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
           
           
           
            <VideoRecord facing="front" zoomy="1"/> 
            
        </motion.div>
)
}

export default MyPage1;
