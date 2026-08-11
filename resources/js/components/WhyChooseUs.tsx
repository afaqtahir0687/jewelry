import React from 'react';
import { motion } from 'framer-motion';

const FEATURES = [
    {
        icon: 'fa-solid fa-stamp',
        title: 'Certified & Hallmark Jewellery',
        description: 'Every piece is sourced from verified jewellers with authentic hallmark certification.',
    },
    {
        icon: 'fa-solid fa-truck-fast',
        title: 'Free Delivery',
        description: 'Enjoy complimentary, fully insured delivery on orders from our verified partner shops.',
    },
    {
        icon: 'fa-solid fa-rotate-left',
        title: 'Easy Returns',
        description: 'Hassle-free return and exchange policy so you can shop with complete confidence.',
    },
    {
        icon: 'fa-solid fa-headset',
        title: '24/7 Support',
        description: 'Our dedicated support team is available around the clock to assist with any query.',
    },
    {
        icon: 'fa-solid fa-award',
        title: 'Quality Guarantee',
        description: 'Rigorous quality checks ensure every ornament meets our premium craftsmanship standards.',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function WhyChooseUs() {
    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-10 md:mb-14"
                >
                    <span className="text-[#d4af37] tracking-widest uppercase font-semibold text-xs">Our Promise</span>
                    <h2 className="font-luxury text-2xl sm:text-3xl md:text-5xl text-[#4a0e0e] font-bold mt-2">Why Choose Us</h2>
                    <div className="w-24 h-0.5 bg-[#d4af37] mx-auto mt-4" />
                </motion.div>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
                >
                    {FEATURES.map((feature) => (
                        <motion.div
                            key={feature.title}
                            variants={itemVariants}
                            className="group bg-[#fff8f0] border border-[#d4af37]/15 rounded-xl p-6 text-center transition-all duration-300 hover:shadow-xl hover:border-[#d4af37]/50"
                        >
                            <motion.div 
                                animate={{ y: [0, -8, 0] }}
                                transition={{ repeat: Infinity, duration: 3 + Math.random() * 2, ease: "easeInOut" }}
                                className="w-16 h-16 rounded-full bg-[#4a0e0e] flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:bg-[#d4af37] group-hover:scale-110"
                            >
                                <i className={`${feature.icon} text-2xl text-[#d4af37] group-hover:text-[#4a0e0e] transition-colors duration-300`} />
                            </motion.div>
                            <h3 className="font-luxury font-bold text-base text-[#4a0e0e] mb-2">{feature.title}</h3>
                            <p className="text-xs text-gray-500 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
