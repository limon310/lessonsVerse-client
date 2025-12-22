
import React from 'react';
import { FaLock } from "react-icons/fa";
import { Link } from 'react-router';

const SemilarLessonCard
    = ({ recommended, isUserPremium }) => {
        // Destructure lesson properties for easier use
        const {
            title,
            description,
            category,
            emotional_tone,
            authorInfo,
            access_level,
            _id
            // createdDate
        } = recommended;

        // Conditional Logic
        const isPremiumLocked = access_level === 'Premium' && !isUserPremium;
        const accessColor = access_level === 'Premium' ? 'text-yellow-600' : 'text-blue-600';
        const buttonClasses = isPremiumLocked
            ? 'text-gray-400 bg-gray-50 cursor-not-allowed'
            : 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100';

        return (
            <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl ">

                {/* Card Content Area */}
                <div className="p-6 relative w-full max-w-[380px] h-full">

                    {/* 1. Content: Blurred or Clear */}
                    <div className={isPremiumLocked ? 'filter blur-sm pointer-events-none' : ''}>

                        {/* Top Section */}
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-1">Title: {title}</h2>
                                <p className="text-sm line-clamp-3 text-gray-700">{description}</p>
                            </div>
                        </div>

                        {/* Tags and Metadata */}
                        <div className="space-y-3 pt-3 border-t border-gray-100">

                            {/* Category & Tone */}
                            <div className="flex flex-wrap gap-2 text-xs">
                                <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 font-medium rounded-full">{category}</span>
                                <span className="px-2 py-0.5 bg-green-100 text-green-700 font-medium rounded-full">{emotional_tone}</span>
                            </div>

                            {/* Creator Info */}
                            <div className="flex items-center">
                                <img
                                    className="h-8 w-8 rounded-full mr-3 object-cover"
                                    src={authorInfo?.image || "https://via.placeholder.com/48/4F46E5/FFFFFF?text=AJ"}
                                    alt={`Photo of ${authorInfo?.name}`}
                                />
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">{authorInfo?.name}</p>
                                </div>
                            </div>

                            {/* Access Level */}
                            <p className={`text-xs text-right font-medium ${accessColor}`}>
                                Access: <span className="capitalize">{access_level}</span>
                            </p>

                        </div>

                    </div>

                    {/* 2. Lock Overlay (Conditional Rendering) */}
                    {isPremiumLocked && (
                        <div className="absolute inset-0 bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm flex flex-col items-center justify-center p-6 rounded-xl">
                            {/* <LockIcon /> */}
                            <span className='text-yellow-500 mb-2'>
                                <FaLock size={30} />
                            </span>
                            <p className="text-center font-bold text-lg text-gray-800">
                                Premium Lesson
                            </p>
                            <p className="text-center text-sm text-gray-600 mb-4">
                                Upgrade to view
                            </p>
                            <Link to="/upgrade-premium"
                                className="px-4 py-2 text-sm font-semibold text-white bg-yellow-500 rounded-full hover:bg-yellow-600 transition duration-150 shadow-md">
                                Upgrade Now
                            </Link>
                        </div>
                    )}

                    {/* Footer Button */}
                    <div className="p-4 border-t border-gray-100 flex justify-end">
                        <Link to={`/lesson-details/${_id}`}
                            className={`w-full py-2 text-sm font-semibold rounded-lg transition duration-150 ${buttonClasses}`}
                            disabled={isPremiumLocked}
                        >
                            See Details Button
                        </Link>
                    </div>

                </div>

            </div>
        );
    };

export default SemilarLessonCard;