import './App.css';
import { motion } from 'framer-motion';

function MyPage() {
return (
    <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            Hello, NY SIDA
        </motion.div>
)
}

export default MyPage;
