import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { Zap, ArrowRight, Sparkles } from 'lucide-react';

const InnerCircleCTA = () => {
    return (
        <section className="py-10 px-6 bg-base-100 transition-colors duration-300 overflow-hidden">
            <div className="max-w-7xl mx-auto relative">

                {/* Background Glows - Using OKLCH Primary/Accent with transparency */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative bg-base-200 border border-base-300 rounded-2xl p-8 md:p-20 text-center shadow-xl overflow-hidden"
                >
                    {/* Animated Decorative Icon */}
                    <motion.div
                        animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="absolute top-8 right-12 text-accent/20 hidden md:block"
                    >
                        <Sparkles size={80} />
                    </motion.div>

                    <div className="relative z-10 max-w-3xl mx-auto">
                        {/* Small Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-primary/10 border border-primary/20">
                            <Zap size={14} className="text-primary fill-current" />
                            <span className="text-[10px] uppercase font-black tracking-[0.2em] text-primary">
                                Exclusive Access
                            </span>
                        </div>

                        {/* Heading */}
                        <h2 className="text-3xl md:text-5xl font-black text-neutral mb-8 leading-[1.1] tracking-tight">
                            Don't Let Your Wisdom <br />
                            <span className="text-primary italic">Fade Away.</span>
                        </h2>

                        {/* Subtext */}
                        <p className="text-neutral-content text-lg md:text-xl mb-12 leading-relaxed font-medium">
                            Join the **Inner Circle** of LessonsVerse. Capture your hard-won life lessons, share with a growing community, and build a digital legacy.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link to="/signup" className="w-full sm:w-auto">
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px oklch(var(--p) / 0.3)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn btn-primary btn-lg rounded-2xl px-12 font-bold text-lg group w-full"
                                >
                                    Get Started
                                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </Link>

                            <Link to="/" className="w-full sm:w-auto">
                                <button className="btn btn-ghost btn-lg text-neutral hover:bg-base-300 rounded-2xl px-10 w-full">
                                    See How it Works
                                </button>
                            </Link>
                        </div>

                        {/* Bottom Link */}
                        <p className="mt-10 text-sm text-neutral-content font-medium opacity-80">
                            Already preserving wisdom?
                            <Link to="/login" className="ml-2 text-primary font-bold hover:underline underline-offset-4 transition-all">
                                Sign in here
                            </Link>
                        </p>
                    </div>

                    {/* Subtle Texture Overlay */}
                    {/* <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" /> */}
                </motion.div>
            </div>
        </section>
    );
};

export default InnerCircleCTA;