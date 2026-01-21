import React from 'react';
import Squares from '../component/Squares';
import NavBar from '../component/NavBar';

function App() {
  // Data for the core cards
  const coreData = [
    { title: "Lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.", status: "Available" },
    { title: "Lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.", status: "Coming Soon" },
    { title: "Lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.", status: "Coming Soon" },
    { title: "Lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.", status: "Coming Soon" },
    { title: "Lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.", status: "Coming Soon" },
    { title: "Lorem ipsum dolor", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.", status: "Coming Soon" },
  ];

  return (
    // Main Container: Relative to hold the absolute background
    <div className="relative min-h-screen w-full font-mono text-black overflow-x-hidden">
      
      {/* --- BACKGROUND LAYER --- 
          absolute, inset-0, z-0 puts it behind everything */}
      <div className="absolute inset-0 z-0">
        <Squares
          speed={0.25}
          squareSize={50}
          direction="diagonal"
          borderColor="#EB8714"
          hoverFillColor="#EB8714"
        />
      </div>

      {/* --- CONTENT LAYER --- 
          relative, z-10 puts it on top of the background */}
        
      <div className="relative z-10 flex flex-col min-h-screen bg-white/50">
        <header>
            <NavBar />
          </header>
        <div className="flex-1 max-w-7xl mx-auto px-6 w-full pt-6">
          
          {/* HEADER */}
          {/* border-b-2 border-dashed border-blue-300 simulates the blue dashed line */}
          

          {/* HERO SECTION */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight">
                Instruction Set Architecture Simulation
              </h1>
              <p className="text-lg leading-relaxed text-gray-800">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                commodo consequat.
              </p>
            </div>
            
            {/* Hero Image Placeholder */}
            <div className="h-64 border-2 border-primary bg-white/50 flex items-center justify-center text-primary text-xl font-bold">
              IMAGE
            </div>
          </section>

          {/* ACTION BUTTONS */}
          {/* Border-y-2 border-dotted simulates the horizontal guide lines */}
          <section className="flex flex-col md:flex-row justify-center gap-8 py-10 mb-16 border-y-2 border-dotted border-blue-400">
            <button className="
              px-8 py-4 bg-white 
              border-2 border-primary text-primary 
              font-bold hover:bg-primary hover:text-white 
              transition-all duration-200
            ">
              Launch New Project
            </button>
            <button className="
              px-8 py-4 bg-white 
              border-2 border-primary text-primary 
              font-bold hover:bg-primary hover:text-white 
              transition-all duration-200
            ">
              Launch Saved Project
            </button>
          </section>

          {/* AVAILABLE CORES GRID */}
          <section className="mb-20">
            {/* Section Title with Hard Shadow */}
            <div className="inline-block bg-primary text-white px-6 py-2 mb-8 text-xl font-bold shadow-[4px_4px_0px_#000]">
              Available Cores
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {coreData.map((item, index) => (
                <div key={index} className="flex flex-col bg-white/80 p-4">
                  <h3 className="text-xl font-bold mb-3 border-b-2 border-black pb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                    {item.desc}
                  </p>
                  <span className={`text-sm font-bold mt-auto ${
                    item.status === 'Available' ? 'text-primary' : 'text-gray-500'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <footer className="w-full bg-[#2b2010] text-gray-400 py-8 text-center border-t-4 border-primary mt-auto">
          <p className="text-sm">Copyright © Derin Alex</p>
        </footer>

      </div>
    </div>
  );
}

export default App;