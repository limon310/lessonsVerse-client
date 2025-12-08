import React from 'react';
import bannerImg from '../../../assets/images/network.jpg'
const Content3 = () => {
    return (
        <section className="relative w-full min-h-[500px] flex items-center bg-white font-sans overflow-hidden">
            <div className="relative z-10 container mx-auto px-6 md:px-12 py-20">

                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

                    {/* LEFT*/}
                    <div className="w-full lg:w-1/2 text-center lg:text-left">

                        <span className="inline-block py-2 px-4 mb-4 text-xs font-semibold uppercase rounded-full tracking-wider" style={{ color: '#4c1d95', backgroundColor: '#e9d5ff' }}>
                            The Digital Highway of Skills
                        </span>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                            LessonsVerse: <br className="hidden sm:inline" />
                            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600">Connected Mind</span>
                        </h1>

                        <p className="text-xl text-gray-700 mb-8 max-w-lg mx-auto lg:mx-0 font-medium">
                            **Master New Skills. Expand Your World.** Experience the platform where knowledge nodes are seamlessly connected.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button className="px-8 py-3 text-lg font-bold text-white rounded-lg transition duration-300" style={{ backgroundColor: '#4c1d95', boxShadow: '0 4px 15px rgba(76, 29, 149, 0.4)' }}>
                                See How it Connects
                            </button>
                            <button className="px-8 py-3 text-lg font-bold border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-100 transition duration-300">
                                Browse Topics
                            </button>
                        </div>

                    </div>

                    {/* RIGHT */}
                    <div className="w-full lg:w-1/2 flex justify-center relative mt-10 lg:mt-0">

                        <div className="w-full max-w-md h-[350px] md:h-[450px] bg-white rounded-xl p-6 shadow-2xl border-4 border-gray-100 flex items-center justify-center">
                            <img src={bannerImg} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Content3;