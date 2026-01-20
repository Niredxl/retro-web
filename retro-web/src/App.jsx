import { useLocation, Routes, Route } from 'react-router-dom';
import {useState, useEffect } from 'react';
import { AnimatePresence, motion} from "framer-motion";
import PageLoader from './component/PageLoader'
import Squares from './component/Squares';
import AnimatedLink from './component/AnimatedLinks';
import NavBar from './component/NavBar';
import Code from './reference/Codeg'
import Home from "./links/Home"
import Documentation from './reference/Docg';

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // loading time
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
      <>
        <div>
        <Squares
        speed={0.30}
        squareSize={65}
        direction="diagonal"
        borderColor="#EB8714"
        hoverFillColor="#EB8714"
        />
      </div>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <PageLoader />
          ) : ( 
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}>
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/docs" element={<Documentation />} />
                  <Route path="/code" element={<Code />} />
                </Routes>
              </motion.div>
          )}
          
        </AnimatePresence>
      </>
  );
}

export default App;