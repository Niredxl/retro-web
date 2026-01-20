import { motion } from 'framer-motion';
import { AiOutlineLoading } from "react-icons/ai";

const PageLoader = () => (
    <motion.div
        key="loader"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0}}
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100%'
        }}>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                    <AiOutlineLoading size={50} color="#EB8714"/>
            </motion.div>

    </motion.div>
);

export default PageLoader;