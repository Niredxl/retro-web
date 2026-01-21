
import SidebarLayout from "../component/SidebarLayout";
import PageTransition from "../component/PageTransition";


function Docs(){
    let expanded = "300px"
    let collapsed = "64px"
    let test = "2"
    return (
        <PageTransition>
            <SidebarLayout props="Content">
                <div className="flex justify-center p-20 mg-10 h-dvh  bg-white/87">
                    <div className="pd-10 ">
                        <div className="text-8xl text-center mb-5 ">Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
                        <div>
                            <p className="text-lg text-gray-600 leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque  faucibus ex sapien vitae pellentesque sem placerat. 
                            In id cursus mi  pretium tellus duis convallis. Tempus leo eu aenean sed diam urna  tempor. Pulvinar vivamus fringilla
                            lacus nec metus bibendum egestas.  Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit  semper vel
                            class aptent taciti sociosqu. Ad litora torquent per conubia  nostra inceptos himenaeos.
                            </p>
                        </div>
                           

                    </div>
                    

                </div>
                
            </SidebarLayout>
        </PageTransition>
    ); 
};

export default Docs;