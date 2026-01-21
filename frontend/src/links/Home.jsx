import PageTransition from "../component/PageTransition";
import Squares from '../component/Squares';
import AnimatedLink from '../component/AnimatedLinks';
import NavBar from '../component/NavBar';
import { createScopedAnimate } from 'framer-motion';

function App() {
  const coreData = [
    { title: "Lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.", status: "Available" },
    { title: "Lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.", status: "Coming Soon" },
    { title: "Lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.", status: "Coming Soon" },
    { title: "Lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.", status: "Coming Soon" },
    { title: "Lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.", status: "Coming Soon" },
    { title: "Lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.", status: "Coming Soon" },
  ];
  return (
    <PageTransition>
      
  
      <div className="flex flex-col min-h-[calc(100vh-64px)] max-w-7xl mx-auto px-6 w-full font-mono justify-center">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-[#2F2204]">
              Instruction Set Architecture Simulation
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
              commodo consequat.
            </p>
          </div>
          <div>
            <div className="h-auto border-2 border-[#EB8714] flex items-center justify-center">
              <img src="/cassete.jpg" alt="Hero Banner"
              className="w-full h-auto rounded-lg shadow-md"></img>
            </div>
          </div>

        </section>

        <section className="flex flex-col md:flex-row md:gap-40 justify-center py-10 gap-8">
          <button className="px-8 py-4 bg-white border-2 border-[#EB8714] text-[#EB8714] font-bold
          hover:bg-[#EB8714] hover:text-white
          transition-all duration-200">
            Launch New Project
          </button>

          <button className="px-8 py-4 bg-white border-2 border-[#EB8714] text-[#EB8714] font-bold
          hover:bg-[#EB8714] hover:text-white
          transition-all duration-200">
            Launch Saved Project
          </button>
        </section>
      </div>
      <div className="relative max-w-7xl mx-auto w-full font-mono">
        
        <section className="mb-20">
          <div className="sticky top-2 flex justify-center">
            <div className=" inline-block bg-[#EB8714] text-white px-6 py-2 mb-8 text-2xl font-bold ">
              Available Cores
            </div>
          </div>
            

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {coreData.map((item,index) => (
                  <div key={index} className="flex flex-col bg-white/80 p-4">
                    <h3 className="text-xl font-bold mb-3  pd-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                      {item.desc}
                    </p>
                    <span className={`text-sm font-bold mt-auto ${
                      item.status === 'Available' ? 'text-[#EB8714]' : 'text-gray-500'}`}>
                        {item.status}
                      </span>
                    </div>
                ))}
            </div>
        </section>
        
      </div>
      <footer className="w-full bg-[#2F2204] text-gray-400 py-8 text-center border-t-4 border-[#EB8714] mt-auto">
        <p className="text-sm">THE PAGE ENDS HERE</p>
      </footer>
    </PageTransition>
  );
}

export default App;