import React from 'react';
import bannerImg3 from '../../../assets/images/banner.jpg'

const Content2 = () => {
    return (
        <section className="bg-gray-50 py-16 md:py-24 font-sans">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

                    {/* LEFT */}
                    <div className="w-full lg:w-5/12 text-center lg:text-left">

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
                            LessonsVerse: <br className="hidden sm:inline" />
                            The <span className="text-pink-600">Learning Hub</span>
                        </h1>

                        <p className="text-xl sm:text-2xl text-gray-600 font-light mb-8">
                            The standard, trustworthy aesthetic for modern educational platforms.
                        </p>
                        <button className="w-full sm:w-auto px-10 py-4 text-lg font-bold text-white bg-blue-600 rounded-lg shadow-lg shadow-blue-500/50 hover:bg-blue-700 transition duration-300 transform hover:scale-105">
                            Start Building Your Skills
                        </button>

                    </div>

                    {/* RIGHT */}
                    <div className="w-full lg:w-7/12 flex justify-center relative mt-10 lg:mt-0">
                        {/* <img src={bannerImg3} alt="" /> */}
                        <div className="bg-gray-200 rounded-2xl p-6 shadow-xl w-full max-w-lg lg:max-w-none aspect-square flex items-center justify-center">
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80">
                                <div className="p-8 bg-white/70 backdrop-blur-sm rounded-lg border-4 border-dashed border-gray-400 text-center text-gray-700">
                                    <img src={bannerImg3} alt="" />
                                    <p className="mt-4 text-2xl font-extrabold text-blue-600">“Learn. Create. Grow.”</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Content2;