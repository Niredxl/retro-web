import SidebarLayout from "../component/SidebarLayout";
import PageTransition from "../component/PageTransition";
import React, { useState, useEffect, Suspense, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';

const mdxModules = import.meta.glob('../documentation/docs/**/*.mdx');

// 1. Define custom components to make the MDX "pop"
const mdxComponents = {
    h1: (props) => <h1 className="text-4xl font-extrabold text-slate-900 mb-8 tracking-tight" {...props} />,
    h2: (props) => <h2 className="text-2xl font-bold text-slate-800 mt-12 mb-4 border-b border-slate-100 pb-2" {...props} />,
    blockquote: (props) => (
        <blockquote className="border-l-4 border-indigo-500 bg-indigo-50/50 px-6 py-4 italic text-slate-700 my-8 rounded-r-lg" {...props} />
    ),
    code: (props) => <code className="bg-slate-100 text-pink-600 px-1.5 py-0.5 rounded-md font-mono text-sm border border-slate-200" {...props} />,
};

function Docs() {
    const { '*': slug } = useParams();
    const [MDXComponent, setMDXComponent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const loadMDX = async () => {
            if (!slug) return;
            setIsLoading(true);
            setHasError(false);

            try {
                const targetPath = `../documentation/docs/${slug}.mdx`;
                if (mdxModules[targetPath]) {
                    const module = await mdxModules[targetPath]();
                    setMDXComponent(() => module.default);
                } else {
                    throw new Error(`File not found: ${targetPath}`);
                }
            } catch (error) {
                console.error(`Failed to load MDX:`, error);
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        };

        loadMDX();
    }, [slug]);

    // 2. Breadcrumbs helper to show path (e.g., Docs > Chip-8 > Introduction)
    const breadcrumbs = useMemo(() => slug?.split('/') || [], [slug]);

    return (
        <PageTransition>
            <SidebarLayout props="Content">
                <div className="flex justify-center min-h-screen bg-slate-50/50">
                    <div className="w-full max-w-4xl px-6 py-12 md:px-12 bg-white/80">
                        
                        {/* Breadcrumbs for better UX */}
                        {!hasError && (
                            <nav className="flex items-center text-sm text-slate-400 mb-8 capitalize">
                                <Link to="/" className="hover:text-indigo-600 transition">Docs</Link>
                                {breadcrumbs.map((crumb, i) => (
                                    <React.Fragment key={i}>
                                        <span className="mx-2 text-slate-300">/</span>
                                        <span className={i === breadcrumbs.length - 1 ? "text-slate-600 font-medium" : ""}>
                                            {crumb.replace(/-/g, ' ')}
                                        </span>
                                    </React.Fragment>
                                ))}
                            </nav>
                        )}

                        <article className="prose prose-slate max-w-none 
                            prose-headings:scroll-mt-20 
                            prose-p:leading-7 
                            prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
                            prose-pre:p-0 prose-pre:bg-transparent">
                            
                            {isLoading && (
                                <div className="space-y-4 animate-pulse">
                                    <div className="h-8 bg-slate-200 rounded w-1/4"></div>
                                    <div className="h-4 bg-slate-200 rounded w-full"></div>
                                    <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                                </div>
                            )}

                            {hasError && (
                                <div className="p-8 bg-white border border-red-100 rounded-xl shadow-sm text-center">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Documentation Not Found</h3>
                                    <p className="text-slate-500 mb-6">The page you're looking for doesn't exist or has been moved.</p>
                                    <Link to="/" className="text-indigo-600 font-medium hover:underline">Return to Home</Link>
                                </div>
                            )}

                            {!isLoading && !hasError && MDXComponent && (
                                <Suspense fallback={null}>
                                    {/* Pass the custom components here */}
                                    <MDXComponent components={mdxComponents} />
                                </Suspense>
                            )}
                        </article>

                        {/* Pagination footer (Optional Next Step) */}
                        {!isLoading && !hasError && (
                             <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between text-slate-500">
                                <p className="text-xs italic">Last updated: {new Date().toLocaleDateString()}</p>
                             </div>
                        )}
                    </div>
                </div>
            </SidebarLayout>
        </PageTransition>
    );
}

export default Docs;