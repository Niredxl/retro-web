import React from 'react';
import PageTransition from "../component/PageTransition";
import Squares from '../component/Squares';
import NavBar from '../component/NavBar';


function Documentation() {
  // Mock data for the sidebar to keep code clean
  const sidebarLinks = [
    { 
      title: "Lorem Ipsum", 
      subitems: [] 
    },
    { 
      title: "Lorem Ipsum", 
      subitems: ["Lorem Ipsum"] 
    },
    { 
      title: "Lorem Ipsum", 
      subitems: ["Lorem Ipsum", "Lorem Ipsum"] 
    },
    { 
      title: "Lorem Ipsum", 
      subitems: ["Lorem Ipsum", "Lorem Ipsum"] 
    },
    { 
      title: "Lorem Ipsum", 
      subitems: ["Lorem Ipsum", "Lorem Ipsum", "Lorem Ipsum"] 
    },
  ];

  return (
    <PageTransition>
    <div className="relative min-h-screen w-full font-mono text-black">
      
      {/* --- BACKGROUND LAYER --- */}

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* TOP NAVIGATION */}
        <header>
            <NavBar />
        </header>

        {/* MAIN SPLIT LAYOUT */}
        {/* We use flex-1 to make this take up the remaining height between nav and footer */}
        <div className="flex flex-col md:flex-row flex-1 max-w-7xl mx-auto w-full my-8 shadow-[8px_8px_0px_#000] border-2 border-black">
          
          {/* LEFT SIDEBAR (Orange) */}
          <aside className="w-full md:w-64 bg-[#EB8714] border-b-2 md:border-b-0 md:border-r-2 border-black flex-shrink-0">
            <div className="p-6 border-b-2 border-black/20">
              <h2 className="text-xl font-bold underline decoration-2 underline-offset-4">Documentation</h2>
            </div>
            
            <nav className="p-6 space-y-6">
              {sidebarLinks.map((section, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <h3 className="font-bold text-lg cursor-pointer hover:underline">
                    {section.title}
                  </h3>
                  {section.subitems.length > 0 && (
                    <div className="flex flex-col gap-1 ml-4 border-l-2 border-black/20 pl-3">
                      {section.subitems.map((sub, subIdx) => (
                        <span key={subIdx} className="text-sm cursor-pointer hover:text-white transition-colors">
                          {sub}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </aside>

          {/* RIGHT CONTENT (Translucent White) */}
          <main className="flex-1 bg-white/90 p-8 md:p-12 overflow-y-auto">
            {/* Main Header */}
            <h1 className="text-4xl font-bold mb-2">Lorem Ipsum</h1>
            <p className="text-gray-500 font-bold text-sm mb-12">Lorem Ipsum</p>

            {/* Text Blocks */}
            <div className="space-y-8 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien 
                vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. 
                Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus 
                bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit 
                semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
              </p>

              <p>
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien 
                vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. 
                Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus 
                bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit 
                semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
              </p>

              <p>
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien 
                vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. 
                Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus 
                bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit 
                semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
              </p>
              
              <p>
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien 
                vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. 
                Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus 
                bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit 
                semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
              </p>
            </div>
          </main>

        </div>

        {/* FOOTER */}
        <footer className="w-full bg-[#2b2010] text-gray-400 py-6 text-center border-t-4 border-[#EB8714] mt-auto relative z-20">
          <p className="text-sm">Copyright © Derin Alex</p>
        </footer>

      </div>
    </div>
    </PageTransition>
  );
}

export default Documentation;