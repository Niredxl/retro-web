import SidebarLayout from "../component/SidebarLayout";
import PageTransition from "../component/PageTransition";

import React,{ useState, useEffect, Suspense } from 'react';
import { useParams } from 'react-router-dom';

import Intro from "../documentation/docs/chip-8/introduction.mdx";

const mdxModules = import.meta.glob('../documentation/docs/**/*.mdx');

function Docs () {
    const { '*': slug } = useParams();

    const [MDXComponent, setMDXComponent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const loadMDX = async () => {
            if (!slug) return; // Don't try to load if there's no path

            setIsLoading(true);
            setHasError(false);

            try {
                // 2. Reconstruct the exact path string that matches the glob map
                const targetPath = `../documentation/docs/${slug}.mdx`;
                
                // 3. Check if Vite found this file during its glob scan
                if (mdxModules[targetPath]) {
                    // Call the function Vite prepared for us to actually load the file
                    const module = await mdxModules[targetPath]();
                    setMDXComponent(() => module.default);
                } else {
                    // If the path doesn't exist in the map, throw an error
                    throw new Error(`File not found: ${targetPath}`);
                }

            } catch (error) {
                console.error(`Failed to load MDX at ${slug}:`, error);
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        };

        loadMDX();
    }, [slug]);
    return(
     <PageTransition>
            <SidebarLayout props="Content">
                <div className="flex justify-center min-h-screen   bg-white/87">
                    <div className="pd-10 w-full max-w-4xl">
                        
                        <article className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-4xl prose-code:before:content-none prose-code:after:content-noneprose-code:bg-gray-100 prose-code:text-rose-600 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mediumprose-pre:bg-slate-900 prose-pre:shadow-2xl prose-pre:rounded-xlprose-li:my-1">
                            {isLoading && <p className="animate-pulse">Loading documentation...</p>}
                            
                            {hasError && (
                                <div className="p-4 bg-red-50 text-red-600 rounded-md border border-red-200">
                                    <h3>Page Not Found</h3>
                                    <p>We couldn't find a document matching: <code>{slug}</code></p>
                                </div>
                            )}

                            {!isLoading && !hasError && MDXComponent && (
                                <Suspense fallback={<p>Rendering...</p>}>
                                    {/* Render the dynamically loaded component */}
                                    <MDXComponent />
                                </Suspense>
                            )}

                        </article>
                           

                    </div>
                    

                </div>
                
            </SidebarLayout>
        </PageTransition>
    );
}

export default Docs;