
import SidebarLayout from "../component/SidebarLayout";
import PageTransition from "../component/PageTransition";

import Intro from "../documentation/docs/chip-8/introduction.mdx";

function Docs () {
    return(
     <PageTransition>
            <SidebarLayout props="Content">
                <div className="flex justify-center min-h-screen p-6 md:p-20 bg-white/87">
                    <div className="pd-10 w-full max-w-4xl">
                        
                        <article className="prose lg:prose-xl prose-headings:text-gray-800 text-gray-600">
                            <Intro />

                        </article>
                           

                    </div>
                    

                </div>
                
            </SidebarLayout>
        </PageTransition>
    );
}

export default Docs;