import { motion } from "framer-motion";

const animations = {
    initial:{ opacity: 0, y: 10 },
    animate:{ opacity: 1, y: 0 },
    exit:{ opacity: 0, y: -10 },
    transition:{ duration: 0.4 }, 
    
};

const PageTransition = ({ children }) => {
    return (
        <motion.div 
        variants={animations}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.4, ease: "easeInOut"}}>
        {children}
        </motion.div>
    );
};

export default PageTransition;