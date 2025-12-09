import React from 'react';
import { FaGem } from "react-icons/fa";
import { BsStopwatch } from "react-icons/bs";
import { GiShakingHands } from "react-icons/gi";
import { GoRocket } from "react-icons/go";

const WhyLearningFromLife = () => {
    return (
        <section className="py- sm:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Why Learning From Life <span className="text-indigo-600">Matters</span>
                    </h2>
                    <p className="mt-4 text-xl text-gray-600">
                        Turn your everyday experiences into actionable wisdom for growth.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">

                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-[1.02]">
                        <div className="shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white text-2xl font-bold">
                                <FaGem />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-xl font-semibold text-gray-900">Preserve Your Wisdom</h3>
                            <p className="mt-2 text-base text-gray-600">
                                Don't let valuable insights fade away. Capture your hard-won life lessons in a structured, digital format.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-[1.02]">
                        <div className="shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white text-2xl font-bold">
                                <BsStopwatch />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-xl font-semibold text-gray-900">Avoid Past Mistakes</h3>
                            <p className="mt-2 text-base text-gray-600">
                                Review your past failures and triumphs to recognize patterns, creating a clearer roadmap for future challenges.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-[1.02]">
                        <div className="shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-yellow-500 text-white text-2xl font-bold">
                                <GiShakingHands />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-xl font-semibold text-gray-900">Find Shared Humanity</h3>
                            <p className="mt-2 text-base text-gray-600">
                                By sharing and exploring lessons from others, you build empathy and feel connected to a community growing together.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-[1.02]">
                        <div className="shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white text-2xl font-bold">
                                <GoRocket />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-xl font-semibold text-gray-900">Accelerate Your Growth</h3>
                            <p className="mt-2 text-base text-gray-600">
                                Turn passive experience into an engine for rapid personal development through mindful documentation and review.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyLearningFromLife;