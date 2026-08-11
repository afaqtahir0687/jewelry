import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import FaqSection from '@/Components/FaqSection';

interface Faq {
    id: number;
    question: string;
    answer: string;
}

interface FaqsPageProps {
    faqs: Faq[];
}

export default function Faqs({ faqs }: FaqsPageProps) {
    return (
        <AppLayout>
            <Head title="Frequently Asked Questions">
                <meta name="description" content="Answers to common questions about buying, customizing and partnering on our jewellery marketplace." />
            </Head>

            {/* ── Page Hero ─────────────────────────────────────────────── */}
            <section className="bg-[#4a0e0e] py-14 md:py-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-[#d4af37] tracking-widest uppercase font-semibold text-xs">Help Center</span>
                    <h1 className="font-luxury text-3xl sm:text-4xl md:text-5xl text-white font-bold mt-2">Frequently Asked Questions</h1>
                    <p className="text-white/70 text-sm md:text-base mt-4">
                        Everything you need to know about finding jewellers, requesting custom pieces and partnering with us.
                    </p>
                </div>
            </section>

            {faqs && faqs.length > 0 ? (
                <FaqSection faqs={faqs} showHeading={false} />
            ) : (
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-gray-500">
                    No FAQs available at the moment.
                </div>
            )}
        </AppLayout>
    );
}
