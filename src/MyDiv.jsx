import './App.css';
import { motion } from 'framer-motion';

function MyDiv() {
return (
    <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            Hello, Framer Motion!
        </motion.div>
)
}

export default MyDiv;
