import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Squares from './component/Squares';
import AnimatedLink from './component/AnimatedLinks';
import NavBar from './component/NavBar';
import Code from './reference/Codeg'
import Home from "./links/Home"
import Documentation from './reference/Docg';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Documentation />} />
        <Route path="/code" element={<Code />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;