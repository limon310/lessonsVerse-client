
import React from 'react';
import { Link } from "react-router";
import { Bookmark, Sparkles, Lock, Globe } from 'lucide-react';

const MostSaveLessonCard = ({ lesson }) => {
    const {
        lessonId,
        title,
        description,
        totalSaves,
        category,
        emotional_tone, // fixed spelling
        privacy,
        access_level
    } = lesson;

    return (
        <div className="group relative flex flex-col h-[380px] w-full bg-base-200 rounded-2xl border border-base-300 transition-all duration-300 hover:border-primary/50 hover:shadow-xl p-5 overflow-hidden">

            {/* Top Badge (Floating) */}
            <div className="flex justify-between items-start mb-4">
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary rounded-lg text-[10px] font-bold uppercase tracking-wider">
                    <Sparkles size={12} />
                    {category}
                </span>
                <div className="text-neutral-content/40 group-hover:text-primary transition-colors">
                    <Bookmark size={20} fill={totalSaves > 0 ? "currentColor" : "none"} />
                </div>
            </div>

            {/* Content Area */}
            <div className="grow">
                <h3 className="text-lg font-bold text-neutral leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {title}
                </h3>
                <p className="text-xs text-neutral-content line-clamp-4 leading-relaxed italic">
                    "{description}"
                </p>
            </div>

            {/* Bottom Section */}
            <div className="mt-4 pt-4 border-t border-base-300/50">
                {/* Stats & Tone */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                        <span className="text-lg font-black text-neutral">{totalSaves}</span>
                        <span className="text-[10px] text-neutral-content uppercase font-bold tracking-tighter">Saves</span>
                    </div>
                    <span className="text-[10px] font-bold bg-base-300 px-2 py-1 rounded-md text-neutral lowercase italic">
                        #{emotional_tone}
                    </span>
                </div>

                {/* Footer Badges & CTA */}
                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-[10px] font-bold text-neutral-content/70">
                        <span className="flex items-center gap-1 uppercase">
                            {privacy === 'Public' ? <Globe size={12} /> : <Lock size={12} />}
                            {privacy}
                        </span>
                        <span className={`px-1.5 py-0.5 rounded ${access_level === 'Premium' ? 'bg-warning/20 text-warning' : 'bg-success/20 text-success'}`}>
                            {access_level}
                        </span>
                    </div>

                    <Link
                        to={`/lesson-details/${lessonId}`}
                        className="btn btn-primary btn-sm btn-block rounded-xl normal-case no-underline"
                    >
                        Read Lesson
                    </Link>
                </div>
            </div>

            {/* Subtle Gradient Overlay on Hover */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
    );
};

export default MostSaveLessonCard;
