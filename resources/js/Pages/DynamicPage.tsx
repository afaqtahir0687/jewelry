import React, { Component, ErrorInfo, ReactNode } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';

interface DynamicPageProps {
    page: {
        title: string;
        content: string;
    } | null;
}

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
    constructor(props: { children: ReactNode }) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("DynamicPage Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-8 m-8 bg-red-50 text-red-600 rounded border border-red-200">
                    <h2 className="text-xl font-bold mb-4">Something went wrong rendering this page.</h2>
                    <pre className="text-sm whitespace-pre-wrap">{this.state.error?.toString()}</pre>
                </div>
            );
        }
        return this.props.children;
    }
}

export default function DynamicPage({ page }: DynamicPageProps) {
    if (!page) {
        return (
            <AppLayout>
                <div className="py-20 text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Page Not Found</h1>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <Head title={page.title}>
                <meta name="description" content={`Read about ${page.title} at Online Jewelry Shop`} />
            </Head>

            <ErrorBoundary>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 animate-fade-in-up">
                    <div className="bg-white p-8 md:p-12 rounded-lg shadow-sm border border-[#d4af37]/10 relative">
                        {/* Top Decorative Line */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent rounded-t-lg opacity-50"></div>
                        
                        <h1 className="text-3xl md:text-4xl font-luxury text-[#0f172a] mb-8 pb-4 border-b border-gray-100 text-center">
                            {page.title}
                        </h1>
                        
                        {/* Render HTML content safely */}
                        <div 
                            className="prose prose-sm sm:prose lg:prose-lg max-w-none prose-headings:font-luxury prose-h2:text-2xl prose-h3:text-xl prose-a:text-[#d4af37] hover:prose-a:text-[#0f172a] transition-colors prose-strong:text-[#0f172a]"
                            dangerouslySetInnerHTML={{ __html: page.content || '' }} 
                        />
                    </div>
                </div>
            </ErrorBoundary>
        </AppLayout>
    );
}
