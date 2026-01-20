import Squares from '../component/Squares';
import AnimatedLink from '../component/AnimatedLinks';
import NavBar from '../component/NavBar';

function App() {
  return (
    <>
    <div>
  <Squares
    speed={0.25}
    squareSize={50}
    direction="diagonal"
    borderColor="#EB8714"
    hoverFillColor="#EB8714"
  />
  </div>
  <div className="pr-4 bg-white/50">
    <NavBar/>
  </div>
  
  <div className="flex-1 max-w-7xl mx-auto px-6 w-full pt-6 font-mono">
    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
      <div className="space-y-6">
        <h1 className="text-4x1 font-bold tracking-tight">
          Hello World
        </h1>
      </div>

    </section>
  </div>
  

    </>
  );
}

export default App;