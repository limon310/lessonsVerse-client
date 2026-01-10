
import React from 'react';
import bannerImg3 from '../../../assets/images/banner.jpg';
import { Link } from 'react-router'; // Using standard react-router-dom
import { motion } from 'framer-motion';
import { FiUsers, FiArrowRight, FiBookOpen } from 'react-icons/fi';

const Content2 = () => {
    return (
        <section className="bg-base-100 py-8 md:py-12 transition-colors duration-300 relative overflow-hidden min-h-[70vh]">
            
            {/* Subtle background glow for social vibe */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-0"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

                    {/* LEFT: Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-5/12 text-center lg:text-left"
                    >
                        <div className="flex justify-center lg:justify-start mb-4">
                            <span className="badge badge-accent badge-outline px-4 py-3 font-bold gap-2">
                                <FiUsers /> Social Learning
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral leading-tight mb-6">
                            Learn, Engage,<br className="hidden sm:inline" />
                            <span className="text-primary italic">and Grow Together</span>
                        </h1>

                        <p className="text-xl text-neutral-content font-medium mb-10 leading-relaxed">
                            A social space to discover bite-sized lessons, join discussions, and follow your favorite creators.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            {/* Primary Action */}
                            <Link to='/public-lessons' className="btn btn-primary btn-lg shadow-lg shadow-primary/20 text-white rounded-2xl hover:scale-105 transition-transform">
                                Join the Community
                            </Link>

                            {/* Secondary Action */}
                            <Link to='/public-lessons' className="btn btn-ghost btn-lg text-neutral-content hover:text-primary rounded-2xl border border-base-300 flex items-center gap-2">
                                <FiBookOpen /> Read Stories <FiArrowRight />
                            </Link>
                        </div>
                    </motion.div>

                    {/* RIGHT: Image with Floating Effect */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-7/12 flex justify-center relative mt-10 lg:mt-0"
                    >
                        {/* Decorative elements behind image */}
                        <div className="absolute inset-0 bg-primary/10 rounded-[3rem] rotate-3 blur-sm"></div>
                        <div className="absolute inset-0 bg-accent/5 rounded-[3rem] -rotate-3 blur-sm"></div>

                        <div className="relative group overflow-hidden rounded-[2.5rem] border-4 border-base-200 shadow-2xl">
                            <img 
                                src={bannerImg3} 
                                alt="LessonVerse Community" 
                                className="w-full h-auto max-h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            
                            {/* Image Overlay (Dark Gradient) */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                        </div>

                        {/* Floating Experience Tag */}
                        <motion.div 
                            animate={{ y: [0, -15, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute -bottom-8 right-4 md:right-10 bg-base-200 border border-base-300 p-4 rounded-2xl shadow-xl z-20 flex items-center gap-4"
                        >
                            <div className="avatar-group -space-x-4">
                                <div className="avatar border-base-200 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[10px] text-white">R</div>
                                <div className="avatar border-base-200 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-[10px] text-white">M</div>
                            </div>
                            <div className="text-left">
                                <p className="text-neutral font-bold text-xs italic">"Life is a lesson"</p>
                                <p className="text-[10px] text-neutral-content">Shared by 1k+ Users</p>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Content2;