import './App.css';
import { motion } from 'framer-motion';
import VideoRecord from './VideoRecord';

function MyPage() {
return (
    <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            <VideoRecord facing="environment" zoomy="4"/> // facing är front eller environment
        </motion.div>
)
}

export default MyPage;
