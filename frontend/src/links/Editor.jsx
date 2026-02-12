import SidebarLayout from "../component/SidebarLayout";
import PageTransition from "../component/PageTransition";

import {useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp'; // Good fallback for Assembly
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';

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
function Editor(){
    const [activeTab, setActiveTab] = useState('RAM');

    const memoryRows = Array(8).fill("0000 0000 0000 0000");

    const [code, setCode] = useState('; Start coding your .asm file\nMOV A, 0xFF');
    return(
   <div className="relative z-10 flex flex-col lg:flex-row flex-1 overflow-hidden border-t-2">
      <section className="w-full h-screen lg:w-1/2 bg-primary/95 p-6 lg:p-10 flex flex-col border-r-2 border-black font-mono">

        <div className="flex flex-wrap gap-6 mb-2 text-sm md:text-base font-bold justify-between border-t-1">
            <button className="hover:underline">← Back</button>
            <span className="opacity-80">Untitled_project.asm</span>
            <button className="hover:underline">Save</button>
            <button className="hover:underline">Settings</button>
        </div>

        <div className="flex flex-wrap gap-6 mb-6 text-sm md:text-base justify-between border-b-1 ">
            <button className="hover:underline">Assemble / Build</button>
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
      
      <section className="w-full lg:w-1/2 bg-white/80 p-6 lg:p-10 flex flex-col items-center overflow-y-auto">  
        <div className="w-full max-w-lg aspect-[4/3] bg-[#1f2e2e] rounded-3xl border-4 border-gray-300 shadow-inner mb-6 relative"></div>
      </section>
      
    </div>
);
}

export default Editor;