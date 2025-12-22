import React from 'react';
import { Link } from 'react-router';

const TopContributorCard = ({ user, rank }) => {
    const { name, image, totalLessons } = user;

    // const rankBadge = (rank) => {
    //     if (rank === 1) return "🥇";
    //     if (rank === 2) return "🥈";
    //     if (rank === 3) return "🥉";
    // }

    return (
            <div className="w-[300px] mx-auto relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

                {/* Rank Badge */}
                <div className="absolute top-4 right-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                        {rank}
                    </span>
                </div>

                {/* Avatar */}
                <div className="flex justify-center">
                    <div className="rounded-full ring-4 ring-indigo-50 p-1">
                        <img
                            src={image || "https://i.postimg.cc/kgcVLhvn/placeholder.jpg"}
                            alt={name}
                            className="h-20 w-20 rounded-full object-cover"
                        />
                    </div>
                </div>

                {/* Name & Subtitle */}
                <div className="mt-4 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {name || "Unknown Creator"}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Lessons created this week
                    </p>
                </div>

                {/* Stats */}
                <div className="mt-4 flex justify-center">
                    <div className="rounded-xl bg-indigo-50 px-6 py-2 text-center">
                        <p className="text-2xl font-bold text-indigo-600">
                            {totalLessons}
                        </p>
                        <p className="text-xs text-indigo-500">
                            Lessons
                        </p>
                    </div>
                </div>

                {/* CTA (Optional) */}
                <div className="mt-5">
                    <button className="w-full rounded-lg border border-indigo-600 px-4 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-600 hover:text-white transition">
                        View Profile
                    </button>
                </div>

            </div>
    );
};

export default TopContributorCard;
