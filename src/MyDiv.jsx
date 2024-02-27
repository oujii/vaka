import './App.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import MyPage from './MyPage';

function MyDiv() {
return (
    <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
                  <Link to="/mypage" className='linky'>Go to New Page</Link>
        </motion.div>
)
}

export default MyDiv;
