import React from 'react';
import Container from '../Container';
import { Link } from 'react-router';

const TopContributorCard = ({ user, rank }) => {
     const { name, image, totalLessons } = user;

    const rankBadge = (rank) => {
        if (rank === 1) return "🥇";
        if (rank === 2) return "🥈";
        if (rank === 3) return "🥉";
    }

        return (
            <Container>
            <div>
                <div className="w-[300px] mx-auto relative rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition">

                    {/* Rank */}
                    <span className="absolute top-3 right-3 text-lg font-semibold">
                        {rankBadge(rank)}
                    </span>

                    {/* Avatar */}
                    <div className="flex justify-center">
                        <img
                            src={image || "https://i.postimg.cc/kgcVLhvn/placeholder.jpg"}
                            alt={name}
                            className="h-20 w-20 rounded-full object-cover border"
                        />
                    </div>

                    {/* Name */}
                    <div className="mt-4 text-center">
                        <h3 className="font-semibold text-gray-800 truncate">
                            {name || "Unknown Creator"}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Lessons this week
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="mt-3 text-center">
                        <span className="inline-block rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600">
                            {totalLessons}
                        </span>
                    </div>

                    {/* CTA */}
                    <div className="mt-4">
                        <button className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition">
                            View Lessons
                        </button>
                    </div>
                </div>
            </div>
        </Container>
        );
    };

 export default TopContributorCard;
