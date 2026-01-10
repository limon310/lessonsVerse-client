
import React from 'react';
import { motion } from 'framer-motion';
import { Medal, Award, Crown } from 'lucide-react';
import { Link } from 'react-router';

const TopContributorCard = ({ user, rank }) => {
    const { name, image, totalLessons, creatorId } = user;

    // Rank based styling
    const getRankStyles = (r) => {
        if (r === 1) return { shadow: "hover:shadow-amber-500/20", border: "border-amber-400", bg: "bg-amber-500", icon: <Crown className="w-5 h-5" /> };
        if (r === 2) return { shadow: "hover:shadow-slate-400/20", border: "border-slate-300", bg: "bg-slate-400", icon: <Medal className="w-5 h-5" /> };
        if (r === 3) return { shadow: "hover:shadow-orange-400/20", border: "border-orange-300", bg: "bg-orange-400", icon: <Award className="w-5 h-5" /> };
        return { shadow: "hover:shadow-primary/10", border: "border-base-300", bg: "bg-primary", icon: null };
    };

    const styles = getRankStyles(rank);

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className={`relative group bg-base-200 rounded-2xl border-2 ${styles.border} p-8 transition-all duration-300 ${styles.shadow}`}
        >
            {/* Rank Badge */}
            <div className={`absolute -top-5 left-1/2 -translate-x-1/2 flex items-center gap-1 px-4 py-1.5 rounded-full ${styles.bg} text-white font-bold shadow-lg`}>
                {styles.icon}
                <span>Rank #{rank}</span>
            </div>

            {/* Avatar Section */}
            <div className="relative mt-2 flex justify-center">
                <div className={`p-1.5 rounded-full border-2 ${styles.border} bg-base-100`}>
                    <img
                        src={image || `https://ui-avatars.com/api/?name=${name}&background=random`}
                        alt={name}
                        className="h-24 w-24 rounded-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
                {/* Decorative circle */}
                <div className={`absolute inset-0 rounded-full bg-current opacity-0 group-hover:opacity-5 transition-opacity blur-xl ${styles.bg}`} />
            </div>

            {/* Info Section */}
            <div className="mt-6 text-center">
                <h3 className="text-xl font-bold text-neutral group-hover:text-primary transition-colors truncate">
                    {name || "Legacy Creator"}
                </h3>
                <p className="text-xs uppercase tracking-widest text-neutral-content font-bold mt-1">
                    Master Contributor
                </p>
            </div>

            {/* All Time Stats */}
            <div className="mt-6 flex flex-col items-center">
                <div className="w-full bg-base-300/50 rounded-2xl py-4 px-2">
                    <span className="block text-3xl font-black text-primary leading-none">
                        {totalLessons.toLocaleString()}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-neutral-content tracking-tighter mt-1 block">
                        Total Lessons Shared
                    </span>
                </div>
            </div>

            {/* View Profile Action */}
            <div className="mt-6">
                <Link to={`authorProfile/${creatorId}`} className="btn btn-outline btn-primary btn-sm btn-block rounded-xl normal-case hover:shadow-lg transition-all">
                    View All Lessons
                </Link>
            </div>
        </motion.div>
    );
};

export default TopContributorCard;
