
import React from 'react';
import bannerImg from '../../../assets/images/banner2.jpg'
import { Link } from 'react-router'; // Fixed import to standard
import { motion } from 'framer-motion';

const Content1 = () => {
    return (
        <section className="relative w-full min-h-[70vh] flex items-center overflow-hidden bg-base-100 transition-colors duration-300">
            
            {/* Background Decorative Glows (Using Theme Colors) */}
            <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-primary rounded-full opacity-40 blur-sm"></div>
            <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-accent rounded-full opacity-50 blur-sm"></div>
            <div className="absolute top-10 right-[10%] w-[300px] h-[300px] bg-primary/10 rounded-full blur-[120px] -z-0"></div>

            {/* MAIN CONTENT */}
            <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12">

                {/* LEFT COLUMN: Text Content */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/2 text-center md:text-left"
                >
                    <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-[0.2em] mb-6 backdrop-blur-sm uppercase">
                        Welcome to the Verse
                    </span>

                    <h1 className="text-4xl md:text-5xl font-black leading-[1.1] mb-6 text-neutral">
                        LESSONS<span className="text-primary italic">VERSE</span>
                    </h1>

                    <p className="text-lg md:text-xl text-neutral-content mb-8 font-medium max-w-lg mx-auto md:mx-0 leading-relaxed">
                        A community-driven social platform where experiences become lessons. Share your journey, discover insights, and learn together.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Link 
                            to='/dashboard/add-lesson' 
                            className="btn btn-primary btn-lg shadow-lg shadow-primary/20 text-white rounded-xl transform hover:scale-105 transition-all"
                        >
                            Share Your Story
                        </Link>
                        <Link 
                            to='/public-lessons' 
                            className="btn btn-outline btn-secondary btn-lg rounded-xl hover:scale-105 transition-all"
                        >
                            Explore Lessons
                        </Link>
                    </div>
                </motion.div>

                {/* RIGHT COLUMN: Image with Theme Adaptation */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full md:w-1/2 flex justify-center relative"
                >
                    {/* Decorative Circle behind image using Primary/Accent */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[450px] md:h-[450px] bg-linear-to-tr from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse"></div>

                    {/* IMAGE CONTAINER */}
                    <div className="relative z-10 w-full max-w-md group">
                        <div className="absolute -inset-1 bg-linear-to-r from-primary/50 to-accent/50 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <img
                            src={bannerImg}
                            alt="Student and Universe"
                            className="relative rounded-2xl shadow-2xl border border-base-300 object-cover h-[450px] w-full grayscale-20 hover:grayscale-0 transition-all duration-700"
                        />

                        {/* Floating Status Card (Updated Colors) */}
                        <motion.div 
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4 }}
                            className="absolute -bottom-6 -left-6 bg-base-200/90 backdrop-blur-md p-5 rounded-2xl border border-base-300 shadow-xl hidden md:block min-w-[200px]"
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 text-white">
                                    <span className="text-xl font-black">LV</span>
                                </div>
                                <div>
                                    <p className="text-primary text-[10px] font-black tracking-widest uppercase">System Status</p>
                                    <p className="text-neutral font-bold text-sm">Verse Active 🚀</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Content1;