
import SidebarLayout from "../component/SidebarLayout";
import PageTransition from "../component/PageTransition";


function DocsHome(){
    let expanded = "300px"
    let collapsed = "64px"
    let test = "2"
    return (
        <PageTransition>
            <SidebarLayout props="Content">
                <div className="flex justify-center min-h-screen p-6 md:p-20 bg-white/87">
                    <div className="pd-10 ">
                        <div className="text-4xl  text-center mb-5 md:text-6xl ">Architecture & Emulation Documentation</div>
                        <div>
                            <p className="text-lg text-gray-600 leading-relaxed">
                            Emulation can feel like magic, but it boils down to reading bytes, interpreting them, and updating a simulated state. If you are new to emulator development, do not start with a physical processor. Head straight to our CHIP-8 Reference. It provides a simplified, 35-instruction virtual machine environment that will teach you the fundamentals of graphics, input, and program counters without the headache of hardware interrupts.
                            </p>
                        </div>
                           

                    </div>
                    

                </div>
                
            </SidebarLayout>
        </PageTransition>
    ); 
};

export default DocsHome;