import React from 'react';
import bannerImg from '../../../assets/images/banner2.jpg'

const Content1 = () => {
    return (
        <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-slate-900">

            {/* Small Stars (Dots) */}
            <div className="absolute top-1/4 left-1/2 w-1 h-1 bg-white rounded-full opacity-60 neon-glow"></div>
            <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-80 neon-glow"></div>
            <div className="absolute top-10 right-1/2 w-1 h-1 bg-violet-400 rounded-full opacity-50 neon-glow"></div>

            {/* 3. MAIN CONTENT HERE */}
            <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">

                {/* LEFT COLUMN: Text */}
                <div className="w-full md:w-1/2 text-center md:text-left mb-12 md:mb-0">
                    <span className="inline-block py-1 px-3 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-300 text-xs font-bold tracking-[0.2em] mb-6 backdrop-blur-sm uppercase">
                        Welcome to the Verse
                    </span>

                    <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-violet-200 neon-text-glow">
                        LESSONS<span className="text-cyan-400">VERSE</span>
                    </h1>

                    <p className="text-lg md:text-2xl text-slate-300 mb-8 font-light tracking-wide max-w-lg mx-auto md:mx-0">
                        Explore the universe of knowledge. Your journey into the infinite library begins here.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <button className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-lg rounded-sm transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:shadow-[0_0_25px_rgba(6,182,212,0.8)] tracking-wider uppercase">
                            Start Journey
                        </button>
                        <button className="px-8 py-4 bg-transparent border border-violet-500 text-violet-300 hover:text-white hover:bg-violet-900/50 font-medium text-lg rounded-sm transition-all duration-300 tracking-wider uppercase">
                            View Lessons
                        </button>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="w-full md:w-1/2 flex justify-center relative">
                    {/* Decorative Circle behind image */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-full blur-3xl"></div>

                    {/* IMAGE PLACEHOLDER */}
                    <div className="relative z-10 w-full max-w-md">
                        <img
                            src={bannerImg}
                            alt="Student looking at universe"
                            className="rounded-2xl shadow-2xl shadow-cyan-900/50 border border-slate-700/50 object-cover h-[400px] w-full opacity-90 hover:opacity-100 transition duration-500"
                        />

                        {/* Floating Card Effect over image */}
                        <div className="absolute -bottom-6 -left-6 bg-slate-900/90 backdrop-blur-md p-4 rounded-lg border-l-4 border-cyan-400 shadow-lg hidden md:block">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-violet-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold">LV</span>
                                </div>
                                <div>
                                    <p className="text-cyan-300 text-sm font-bold tracking-widest uppercase">Status</p>
                                    <p className="text-white text-xs">Learning Mode: Active</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Content1;