import React, { useState } from 'react';
import Squares from '../component/Squares';
import NavBar from '../component/NavBar';

function ProjectEditor() {
  // State for the active tab in the right panel
  const [activeTab, setActiveTab] = useState('RAM');

  // Mock data for the table rows to visualize the UI
  const memoryRows = Array(8).fill("0000 0000 0000 0000");

  return (
    <div className="relative min-h-screen w-full font-mono text-black flex flex-col">
      
      {/* Background Layer (Optional - mostly covered by opaque panels in this view) */}
      <div className="absolute inset-0 z-0 pointer-events-none hidden md:block">
        <Squares
          speed={0.25}
          squareSize={50}
          direction="diagonal"
          borderColor="#EB8714"
          hoverFillColor="#EB8714"
        />
      </div>

      {/* --- HEADER --- */}
      <div className="relative z-10 bg-white/80 border-b-2 border-black">

            {/* Reuse your existing NavBar component here */}
            <NavBar />
      </div>

      {/* --- MAIN SPLIT VIEW --- */}
      <div className="relative z-10 flex flex-col lg:flex-row flex-1 overflow-hidden">
        
        {/* LEFT PANEL: EDITOR (Orange) */}
        <section className="w-full lg:w-1/2 bg-[#EB8714]/95 p-6 lg:p-10 flex flex-col border-r-2 border-black">
          
          {/* Top Controls */}
          <div className="flex flex-wrap gap-6 mb-6 text-sm md:text-base font-bold">
            <button className="hover:underline">← Back</button>
            <span className="opacity-80">Untitled_project.asm</span>
            <button className="hover:underline">Save</button>
            <button className="hover:underline">Settings</button>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap gap-6 mb-4 text-sm md:text-base font-bold">
            <button className="hover:underline">Assemble / Build</button>
            <button className="hover:underline">Import file</button>
            <button className="hover:underline">Copy</button>
            <button className="hover:underline ml-auto">Clear</button>
          </div>

          {/* Code Editor Area */}
          <div className="flex-1 bg-[#1a1814] rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.5)] p-4 text-green-400 font-mono overflow-auto">
            <textarea 
              className="w-full h-full bg-transparent outline-none resize-none"
              defaultValue="; Write your assembly code here..."
            />
          </div>
        </section>


        {/* RIGHT PANEL: SIMULATOR (White) */}
        <section className="w-full lg:w-1/2 bg-white/80 p-6 lg:p-10 flex flex-col items-center overflow-y-auto">
          
          {/* Display Screen */}
          <div className="w-full max-w-lg aspect-[4/3] bg-[#1f2e2e] rounded-3xl border-4 border-gray-300 shadow-inner mb-6 relative">
             {/* Screen Glare/Reflection effect optional */}
             <div className="absolute top-4 right-4 w-20 h-20 bg-white opacity-5 rounded-full blur-xl"></div>
          </div>

          {/* Playback Controls Container */}
          <div className="bg-gray-200 border-2 border-gray-400 rounded-xl p-4 w-full max-w-lg mb-10 shadow-md">
            
            {/* Main Buttons (Dark Strip) */}
            <div className="bg-[#2b2010] text-[#EB8714] p-2 rounded flex justify-between items-center mb-3 px-4 font-bold">
              <button className="flex items-center gap-2 hover:text-white">▶ Run</button>
              <button className="hover:text-white">Pause</button>
              <button className="hover:text-white">Step</button>
              <button className="hover:text-white">Reset</button>
            </div>

            {/* Speed Controls */}
            <div className="flex justify-center gap-4 text-sm font-bold text-black">
              <button className="border-2 border-black bg-white px-3 py-1 shadow-[2px_2px_0px_#000] active:translate-y-[2px] active:shadow-none">Slow</button>
              <button className="border-2 border-black bg-white px-3 py-1 shadow-[2px_2px_0px_#000] active:translate-y-[2px] active:shadow-none">1x</button>
              <button className="border-2 border-black bg-white px-3 py-1 shadow-[2px_2px_0px_#000] active:translate-y-[2px] active:shadow-none">Fast</button>
            </div>
          </div>

          {/* --- TABS SECTION (Registers/RAM/VRAM) --- */}
          <div className="w-full max-w-lg">
            
            {/* Tab Headers */}
            <div className="flex">
              {['CPU REGISTERS', 'RAM', 'VRAM'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    px-4 py-2 font-bold text-sm border-t-2 border-l-2 border-r-2 border-black rounded-t-lg mr-1
                    transition-colors duration-150
                    ${activeTab === tab 
                      ? 'bg-[#fdfbf7] -mb-[2px] pb-3 z-10'  // Active: Connects to body, slightly larger
                      : 'bg-[#EB8714] text-black hover:bg-[#d97810]' // Inactive: Darker, sits behind
                    }
                  `}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Body */}
            <div className="bg-[#fdfbf7] border-2 border-black p-4 min-h-[200px] shadow-[4px_4px_0px_#000]">
              
              {/* Content changes based on activeTab */}
              <div className="flex flex-col gap-2">
                {/* Header Row */}
                <div className="flex justify-between border-b-2 border-gray-300 pb-2 mb-2 font-bold text-gray-500 text-xs tracking-wider">
                   <span>ADDRESS</span>
                   <span>VALUE</span>
                </div>

                {/* Data Rows (Mock Data) */}
                {memoryRows.map((row, i) => (
                  <div key={i} className="flex justify-between text-sm font-mono bg-white p-2 rounded border border-gray-100 odd:bg-gray-50">
                    <span className="text-gray-500 font-bold">0x{i.toString(16).padStart(4, '0').toUpperCase()}</span>
                    <span className="text-[#EB8714] font-bold">
                       {activeTab === 'CPU REGISTERS' ? `R${i}: 0000` : "0000 0000 0000 0000"}
                    </span>
                  </div>
                ))}
              </div>
            
            </div>
          </div>

        </section>
      </div>

      {/* FOOTER */}
      <footer className="w-full bg-[#2b2010] text-gray-500 py-4 text-center text-xs z-20">
        Copyright © Derin Alex
      </footer>

    </div>
  );
}

export default ProjectEditor;