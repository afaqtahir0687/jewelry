import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
                        <h2 className="font-luxury text-2xl sm:text-3xl md:text-4xl text-[#4a0e0e] font-bold mt-2">Frequently Asked Questions</h2>
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
                                        <span className={`font-medium text-sm md:text-base transition-colors duration-300 ${isOpen ? 'text-[#4a0e0e]' : 'text-gray-800'}`}>
                                            {faq.question}
                                        </span>
                                        <motion.div
                                            animate={{ rotate: isOpen ? 180 : 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="w-6 h-6 flex items-center justify-center rounded-full bg-[#4a0e0e]/5 shrink-0"
                                        >
                                            <i className={`fa-solid ${isOpen ? 'fa-minus' : 'fa-plus'} text-[#d4af37] text-xs`} />
                                        </motion.div>
                                    </button>
                                    
                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial="collapsed"
                                                animate="open"
                                                exit="collapsed"
                                                variants={{
                                                    open: { opacity: 1, height: "auto", marginBottom: 20 },
                                                    collapsed: { opacity: 0, height: 0, marginBottom: 0 }
                                                }}
                                                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                            >
                                                <div className="px-5 md:px-6 text-sm text-gray-600 leading-relaxed">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
