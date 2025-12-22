import React from 'react';
import bannerImg3 from '../../../assets/images/banner.jpg'
import { Link } from 'react-router';

const Content2 = () => {
    return (
        <section className="bg-gray-50 py-16 md:py-24 font-sans">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

                    {/* LEFT */}
                    <div className="w-full lg:w-5/12 text-center lg:text-left">

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
                            Where Experiences<br className="hidden sm:inline" /><span className="text-pink-600">Turn Into Life Lessons</span>
                        </h1>

                        <p className="text-xl sm:text-2xl text-gray-600 font-light mb-8">
                            Read real stories, share your insights, and engage with a growing community through likes, comments, and discussions.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <button className="button">
                                Join the Community
                            </button>

                            <Link to='/public-lessons' className="w-full sm:w-auto px-10 py-4 text-lg font-bold text-white bg-blue-600 rounded-lg shadow-lg shadow-blue-500/50 hover:bg-blue-700 transition duration-300 transform hover:scale-105">
                                Read Stories
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="w-full lg:w-7/12 h-[500px] flex justify-center relative mt-10 lg:mt-0">
                        <img src={bannerImg3} alt="" />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Content2;