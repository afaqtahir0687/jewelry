import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Reveal from '@/Components/Reveal';

interface Faq {
    id: number;
    question: string;
    answer: string;
}

interface FaqSectionProps {
    faqs: Faq[];
    showHeading?: boolean;
}

export default function FaqSection({ faqs, showHeading = true }: FaqSectionProps) {
    const [openId, setOpenId] = useState<number | null>(faqs?.[0]?.id ?? null);

    if (!faqs || faqs.length === 0) return null;

    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {showHeading && (
                    <Reveal className="text-center mb-10 md:mb-12">
                        <span className="text-[#d4af37] tracking-widest uppercase font-semibold text-xs">Got Questions?</span>
                        <h2 className="font-luxury text-2xl sm:text-3xl md:text-4xl text-[#5c1a1b] font-bold mt-2">Frequently Asked Questions</h2>
                        <div className="w-24 h-0.5 bg-[#d4af37] mx-auto mt-4" />
                    </Reveal>
                )}

                <div className="space-y-3">
                    {faqs.map((faq, index) => {
                        const isOpen = openId === faq.id;
                        return (
                            <Reveal key={faq.id} delay={Math.min(index * 60, 300)}>
                                <div className={`rounded-xl border transition-colors duration-300 ${isOpen ? 'border-[#d4af37]/60 bg-[#fff8f0]' : 'border-gray-200 bg-white'}`}>
                                    <button
                                        type="button"
                                        onClick={() => setOpenId(isOpen ? null : faq.id)}
                                        aria-expanded={isOpen}
                                        className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 md:px-6 md:py-5"
                                    >
                                        <span className={`font-medium text-sm md:text-base transition-colors duration-300 ${isOpen ? 'text-[#5c1a1b]' : 'text-gray-800'}`}>
                                            {faq.question}
                                        </span>
                                        <ChevronDown
                                            size={18}
                                            className={`shrink-0 text-[#d4af37] transition-transform duration-300 ease-out ${isOpen ? 'rotate-180' : ''}`}
                                        />
                                    </button>
                                    <div
                                        className="grid transition-[grid-template-rows] duration-300 ease-out"
                                        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="px-5 pb-4 md:px-6 md:pb-5 text-sm text-gray-600 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
