import Squares from './component/Squares';

function App() {
  return (
    <>
    <div >
  <Squares
    speed={0.25}
    squareSize={50}
    direction="diagonal"
    borderColor="#EB8714"
    hoverFillColor="#EB8714"
  /></div>
    <div className="Header"><p>Hello</p></div>
    <div className="Hero"></div>
    <div className="LaunchButtons"></div>
    <div className="CoreList"></div>
    <div className="Footer"></div>
    </>
  );
}

export default App;