
import React from 'react';
import bannerImg from '../../../assets/images/banner3.jpg';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FiEdit, FiSearch, FiZap } from 'react-icons/fi';

const Content3 = () => {
    return (
        <section className="relative w-full min-h-[70vh] flex items-center bg-base-100 font-sans overflow-hidden transition-colors duration-300">

            {/* Background Decorative Elements */}
            <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 -ml-36"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px]"></div>

            <div className="relative z-10 container mx-auto px-6 md:px-12 py-16">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

                    {/* LEFT: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="w-full lg:w-1/2 text-center lg:text-left"
                    >
                        <span className="inline-flex items-center gap-2 py-2 px-4 mb-6 text-xs font-bold uppercase rounded-full tracking-[0.15em] bg-accent/10 text-accent border border-accent/20">
                            <FiZap className="animate-pulse" /> The Social Verse of Skills
                        </span>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral leading-[1.1] mb-6">
                            Your Experience<br className="hidden sm:inline" />
                            <span className="text-primary italic">Inspires Others</span>
                        </h1>

                        <p className="text-lg md:text-xl text-neutral-content mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                            A single story can change a perspective. Share your journey, connect with creators, and make an impact.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link
                                to='/dashboard/add-lesson'
                                className="btn btn-primary btn-lg shadow-xl shadow-primary/20 text-white rounded-2xl hover:scale-105 transition-all gap-2"
                            >
                                <FiEdit /> Post a Lesson
                            </Link>
                            <Link
                                to='/public-lessons'
                                className="btn btn-outline btn-secondary btn-lg rounded-2xl hover:bg-secondary hover:text-white transition-all gap-2"
                            >
                                <FiSearch /> Discover Insights
                            </Link>
                        </div>
                    </motion.div>

                    {/* RIGHT: Image/Illustration Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 flex justify-center relative mt-10 lg:mt-0"
                    >
                        {/* Abstract Background Shapes */}
                        <div className="absolute -z-10 w-full h-full max-w-md bg-gradient-to-br from-primary/20 to-accent/20 rounded-[3rem] rotate-6 scale-105 blur-sm opacity-30"></div>

                        <div className="relative w-full max-w-md aspect-square bg-base-200 rounded-[2.5rem] p-4 shadow-2xl border border-base-300 flex items-center justify-center overflow-hidden group">
                            {/* Theme Adaptive Image */}
                            <img
                                src={bannerImg}
                                alt="Knowledge Sharing"
                                className="w-full h-full object-cover rounded-[2rem] transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Floating Overlay Badge */}
                            <div className="absolute top-6 right-6 bg-base-100/80 backdrop-blur-md px-4 py-2 rounded-xl border border-base-300 shadow-lg">
                                <p className="text-[10px] font-black text-primary uppercase tracking-widest">Trending</p>
                                <p className="text-xs font-bold text-neutral">#Creative_Verse</p>
                            </div>
                        </div>

                        {/* Social Engagement Small Card */}
                        <motion.div
                            animate={{ x: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 6 }}
                            className="absolute -bottom-6 -right-4 md:right-0 bg-base-100 border border-base-300 p-4 rounded-2xl shadow-2xl z-20 hidden md:block"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-2">
                                    <div className="w-7 h-7 rounded-full bg-primary ring-2 ring-base-100"></div>
                                    <div className="w-7 h-7 rounded-full bg-accent ring-2 ring-base-100"></div>
                                </div>
                                <p className="text-[10px] font-bold text-neutral-content uppercase">12+ joined now</p>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Content3;