import Squares from './component/Squares';
import Header from './component/header'

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
    <Header />
    <div className="Hero"></div>
    <div className="LaunchButtons"></div>
    <div className="CoreList"></div>
    <div className="Footer"></div>
    </>
  );
}

export default App;