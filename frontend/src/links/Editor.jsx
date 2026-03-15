import SidebarLayout from "../component/SidebarLayout";
import PageTransition from "../component/PageTransition";

import {useState, useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp'; // Good fallback for Assembly
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';
import { animate, m } from "framer-motion";

const retroTheme = createTheme({
  theme: 'dark',
  settings: {
    background: '#2B1B09', // Matches your inner editor color
    foreground: '#E1AD66', // Retro orange-tinted text
    caret: '#FFFFFF',
    selection: '#4D361A',
    gutterBackground: '#2B1B09',
    gutterForeground: '#8a7b6a',
    lineHighlight: '#362512',
  },
  styles: [
    { tag: t.keyword, color: '#FF8C00' },
    { tag: t.comment, color: '#705e4a' },
    { tag: t.number, color: '#f8f8f2' },
  ],
});

// helper to convert hex text into a byte array
const compileHexToBytes = (codeString) => {
  const cleanCode = codeString.replace(/;.*/g, '').replace(/\s+/g,'');

  if (cleanCode.length % 2 !== 0) {
    throw new Error("Invalid hex code length. Must be pairs of characters.");
  }

  const bytes = new Uint8Array(cleanCode.length / 2);
  for (let i = 0; i < cleanCode.length; i += 2){
    bytes[i/2] = parseInt(cleanCode.substring(i, i + 2), 16);
  }
  return bytes;
};

function Editor(){
  const [activeTab, setActiveTab] = useState('RAM');
  const [code, setCode] = useState('; Basic CHIP-8 Hex\n00E0 ; Clear Screen\n1200 ; Jump to 0x200 (Loop)');
  const [cpuState, setCpuState] = useState({
    v: new Uint8Array(16),
    pc: 0,
    i: 0,
    sp: 0
  });
  const [isPaused, setIsPaused] = useState(true);
  const [speed, setSpeed] = useState(10);
  const isPausedRef = useRef(isPaused);
  const speedRef = useRef(speed);
  const frameCountRef = useRef(0)
  const memoryRows = Array(8).fill("0000 0000 0000 0000");

  const canvasRef = useRef(null);
  const coreRef = useRef(null);
  const requestRef = useRef(null);
  const wasmLoaded = useRef(false);

  const handleStep = () => {
    if (coreRef.current && isPaused) {
      // Execute a single CPU instruction
      coreRef.current.cycle(); 
      
      // Instantly update the visuals and Inspector
      const videoBuffer = coreRef.current.getVideoBufferPointer();
      renderToCanvas(videoBuffer);
      updateInspectorState();
    }
  };

  const updateInspectorState = () => {
    if(!coreRef.current) return;
    const vRegs = coreRef.current.getRegisters();
    setCpuState({
      v: new Uint8Array(vRegs),
      pc: coreRef.current.getPC(),
      i: coreRef.current.getI(),
      sp: coreRef.current.getSP()
    });
  };

  // [NEW] Reset function for the new UI
  const handleReset = () => {
    setIsPaused(true); // Pause execution
    if (coreRef.current) {
      try {
        const romBytes = compileHexToBytes(code);
        coreRef.current.loadROM(romBytes); // Reload the current code
        
        // Force a screen and inspector update
        const videoBuffer = coreRef.current.getVideoBufferPointer();
        renderToCanvas(videoBuffer);
        updateInspectorState();
      } catch (err) {
        console.error("Reset failed: ", err);
      }
    }
  };

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);
  // WASM Bridge logic
  useEffect(() => {
    if (wasmLoaded.current) return;
    wasmLoaded.current = true;

    const initCore = async () => {
      // 1. Check if the script loaded correctly in index.html
      if (typeof window.createRetroCore === 'undefined') {
        console.error("Error: createRetroCore not found. Did you add the script to public/index.html?");
        return;
      }

      // 2. Initialize the WASM module
      // We wrap this in a try/catch to catch any specific Embind errors
      try {
        const module = await window.createRetroCore();
        
        // 3. Create the C++ instance
        coreRef.current = new module.RetroCore();
        console.log("RetroCore Initialized successfully!");

        // 4. Start the render loop
        renderLoop();
      } catch (err) {
        console.error("Failed to initialize RetroCore:", err);
      }
    };

    initCore();

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      // Optional: Add a cleanup method to your C++ class if you need to free memory manually
      // if (coreRef.current) coreRef.current.delete(); 
    };
  }, []);
  
  // Render Loop
  const renderLoop = () => {
    if (coreRef.current && canvasRef.current){
      if (!isPausedRef.current){
        for (let i = 0; i < speedRef.current; i++){
        coreRef.current.cycle();

        const videoBuffer = coreRef.current.getVideoBufferPointer();
        renderToCanvas(videoBuffer);

        frameCountRef.current++;
        if (frameCountRef.current % 10 === 0) {
          updateInspectorState();
        }
      }
      
      }
      
    }
    requestRef.current = requestAnimationFrame(renderLoop);
  };

  const renderToCanvas = (videoBuffer) => {
    const ctx = canvasRef.current.getContext('2d');
    const width = 64;
    const height = 32;

    const imgData = ctx.createImageData(width, height);

    const canvasUint32 = new Uint32Array(imgData.data.buffer);

    if (videoBuffer && videoBuffer.length > 0) {
        canvasUint32.set(videoBuffer);
    }

    ctx.putImageData(imgData, 0, 0);
  };

  const handleAssemble = () => {
    try {
      if (!coreRef.current){
        alert("Emulator core is still loading...");
        return;
      }
      const romBytes = compileHexToBytes(code);

      coreRef.current.loadROM(romBytes);

      console.log("Build successful! ROM injected into memory.");
    } catch (error){
      alert("Compilation error: " + error.message);
    }
  };

  return(
  <div className="relative z-10 flex flex-col lg:flex-row flex-1 overflow-hidden border-t-2">
    <section className="w-full h-auto lg:w-1/2 bg-primary/95 p-6 lg:p-10 flex flex-col border-r-2 border-black font-mono">

      <div className="flex flex-wrap gap-6 mb-2 text-sm md:text-base font-bold justify-between border-t-1">
          <button className="hover:underline">← Back</button>
          <span className="opacity-80">Untitled_project.asm</span>
          <button className="hover:underline">Save</button>
          <button className="hover:underline">Settings</button>
      </div>

      <div className="flex flex-wrap gap-6 mb-6 text-sm md:text-base justify-between border-b-1 ">
          <button onClick={handleAssemble} className="hover:underline">Assemble / Build</button>
          <span className="opacity-80">Import file</span>
          <button className="hover:underline">Copy</button>
          <button className="hover:underline">Clear</button>
      </div>

      <CodeMirror
      value={code}
      height="100%"
      theme={retroTheme}
      extensions={[cpp()]}
      onChange={(value) => setCode(value)}
      style={{
          fontSize: '16px',
          height: '100%',
          border: '2px solid #000' // Optional: match the UI stroke
      }}
      />

    </section>
    {/*video output*/}
    <section className="w-full lg:w-1/2 bg-white/80 p-6 lg:p-10 flex flex-col items-center overflow-y-auto">  
      {/* The "Device" Container */}
      <div className={`w-full max-w-md mb-10 border border-[#333] rounded-[2.5rem] p-4 sm:p-6 shadow-xl flex flex-col items-center font-mono transition-colors duration-500 ${
          !isPaused ? 'bg-[#e2e6d8]' : 'bg-[#dedede]'
      }`}>
        
        {/* 1. The Screen */}
        <div className="w-full aspect-[4/3] bg-[#2e3b2c] rounded-3xl mb-6 relative flex items-center justify-center p-2 shadow-inner overflow-hidden">
             <canvas 
                ref={canvasRef} 
                width={64} 
                height={32}
                className="w-full h-full image-pixelated"
                style={{ imageRendering: 'pixelated' }} 
             />
        </div>

        <div 
                className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-500 ${
                    !isPaused 
                    ? 'bg-primary opacity-30 mix-blend-overlay' 
                    : 'opacity-0'
                }`}
             ></div>

        {/* 2. Main Control Bar */}
        <div className="w-11/12 bg-[#36210b] flex justify-between items-center rounded-xl px-6 py-3 shadow-[0_0_15px_rgba(0,0,0,0.3)] text-[#f8e8d4] text-sm md:text-base mb-6">
            <button 
              onClick={() => setIsPaused(false)} 
              className={`hover:text-white flex items-center gap-2 transition-opacity ${!isPaused ? 'opacity-50 cursor-default' : ''}`}
            >
               <span className="text-[10px]"></span> Run
            </button>
            <button 
              onClick={() => setIsPaused(true)} 
              className={`hover:text-white transition-opacity ${isPaused ? 'opacity-50 cursor-default' : ''}`}
            >
                Pause
            </button>
            <button 
              onClick={handleStep} 
              disabled={!isPaused} 
              className={`hover:text-white transition-opacity ${!isPaused ? 'opacity-30 cursor-not-allowed' : ''}`}
            >
                Step
            </button>
            <button 
              onClick={handleReset} 
              className="hover:text-white transition-colors"
            >
                Reset
            </button>
        </div>

        {/* 3. Speed Controls */}
        <div className="flex gap-4 text-[#36210b] text-sm font-bold">
            <button 
              onClick={() => setSpeed(2)} 
              className={`border border-[#333] px-5 py-1 transition-colors ${speed === 2 ? 'bg-[#c4c4c4] shadow-inner' : 'bg-transparent hover:bg-[#d0d0d0]'}`}
            >
              Slow
            </button>
            <button 
              onClick={() => setSpeed(10)} 
              className={`border border-[#333] px-5 py-1 transition-colors ${speed === 10 ? 'bg-[#c4c4c4] shadow-inner' : 'bg-transparent hover:bg-[#d0d0d0]'}`}
            >
              1x
            </button>
            <button 
              onClick={() => setSpeed(30)} 
              className={`border border-[#333] px-5 py-1 transition-colors ${speed === 30 ? 'bg-[#c4c4c4] shadow-inner' : 'bg-transparent hover:bg-[#d0d0d0]'}`}
            >
              Fast
            </button>
        </div>

      </div>
      
        
        <div className="grid grid-cols-1 md:grid-cols- gap-2">
          <div className="w-full max-w-lg bg-[#2B1B09] border-2 border-black rounded-xl p-4 font-mono text-[#E1AD66] shadow-lg">
            <div className="flex justify-between items-center gap-10 border-b border-[#4D361A] pb-2 mb-4">
                <h3 className="font-bold text-lg">CPU Inspector</h3>
                <span className="text-xs opacity-70">Live State Tracking</span>
            </div>

            {/* Pointers Row */}
            <div className="grid grid-cols-3 gap-4 mb-4 text-center bg-[#1a1005] py-2 rounded">
                <div><span className="text-white opacity-50 text-xs block">PC</span> 0x{cpuState.pc.toString(16).padStart(4, '0').toUpperCase()}</div>
                <div><span className="text-white opacity-50 text-xs block">INDEX (I)</span> 0x{cpuState.i.toString(16).padStart(4, '0').toUpperCase()}</div>
                <div><span className="text-white opacity-50 text-xs block">STACK (SP)</span> 0x{cpuState.sp.toString(16).padStart(2, '0').toUpperCase()}</div>
            </div>

            {/* V-Registers Grid */}
            <h4 className="text-sm font-bold mb-2 opacity-80">V-Registers (Flags)</h4>
            <div className="grid grid-cols-4 gap-2 text-sm text-center">
                {Array.from(cpuState.v).map((val, idx) => (
                    <div key={idx} className={`p-1 border border-[#4D361A] rounded ${idx === 15 ? 'bg-red-900/30 border-red-500' : 'bg-[#1a1005]'}`}>
                        <span className="text-white opacity-50 mr-1">V{idx.toString(16).toUpperCase()}</span> 
                        {val.toString(16).padStart(2, '0').toUpperCase()}
                    </div>
                ))}
            </div>
            <p className="text-[10px] mt-2 text-center text-red-400 opacity-80">*VF acts as the Carry/Collision Flag</p>
        </div>
        </div>
    </section>
    
  </div>
);
}

export default Editor;