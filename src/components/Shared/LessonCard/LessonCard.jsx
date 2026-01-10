import React from 'react';
import { FaLock } from "react-icons/fa";
import { Link } from 'react-router';

const LessonCard = ({ lesson, isUserPremium }) => {
    const {
        title,
        description,
        category,
        emotional_ton,
        authorInfo,
        access_level,
        _id,
        createdAt
    } = lesson;

    const dateFormatted = new Date(createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    const isPremiumLocked = access_level === 'Premium' && !isUserPremium;

    return (
        <div className="group relative flex flex-col h-full bg-base-200 border border-base-300 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            
            {/* Card Content */}
            <div className={`p-6 grow flex flex-col ${isPremiumLocked ? 'filter blur-[2px] select-none pointer-events-none' : ''}`}>
                
                {/* Header: Title & Description */}
                <div className="mb-4">
                    <div className="flex justify-between items-start gap-2 mb-2">
                         <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-md">
                            {category}
                        </span>
                    </div>
                    <h3 className="text-xl font-bold text-neutral line-clamp-1 mb-2 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-neutral-content line-clamp-3 leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Author & Info */}
                <div className="mt-auto pt-4 border-t border-base-300 space-y-4">
                    <div className="flex items-center gap-3">
                        <img
                            className="h-9 w-9 rounded-full object-cover ring-2 ring-base-300"
                            src={authorInfo?.image || "https://ui-avatars.com/api/?name=" + authorInfo?.name}
                            alt={authorInfo?.name}
                        />
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-neutral">{authorInfo?.name}</span>
                            <span className="text-[11px] text-neutral-content">{dateFormatted}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-xs font-medium">
                        <span className={`flex items-center gap-1 ${access_level === 'Premium' ? 'text-warning' : 'text-success'}`}>
                            {access_level === 'Premium' && <FaLock className="text-[10px]" />}
                            {access_level} Access
                        </span>
                        <span className="px-2 py-0.5 bg-accent/10 text-accent rounded-full text-[10px]">
                            {emotional_ton}
                        </span>
                    </div>
                </div>
            </div>

            {/* Premium Overlay */}
            {isPremiumLocked && (
                <div className="absolute inset-0 z-10 bg-base-200/60 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-14 h-14 bg-warning/20 text-warning rounded-full flex items-center justify-center mb-4 animate-pulse">
                        <FaLock size={24} />
                    </div>
                    <h4 className="text-lg font-bold text-neutral mb-1">Premium Content</h4>
                    <p className="text-sm text-neutral-content mb-5">Unlock this lesson and more with a premium subscription.</p>
                    <Link 
                        to="/upgrade-premium"
                        className="btn btn-warning btn-sm rounded-full px-6 shadow-lg hover:shadow-warning/20"
                    >
                        Upgrade Now
                    </Link>
                </div>
            )}

            {/* Action Button */}
            <div className="p-4 bg-base-300/30">
                <Link 
                    to={`/lesson-details/${_id}`}
                    className={`btn btn-block btn-sm normal-case ${isPremiumLocked ? 'btn-ghost disabled' : 'btn-primary'}`}
                >
                    {isPremiumLocked ? 'Locked' : 'View Lesson Details'}
                </Link>
            </div>
        </div>
    );
};

export default LessonCard;