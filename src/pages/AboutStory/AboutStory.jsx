import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Target, Rocket, Milestone, Quote, Users } from 'lucide-react';
import { Link } from 'react-router';

const AboutStory = () => {
    return (
        <div className="bg-base-100 min-h-screen pt-28 pb-20 overflow-hidden">
            <title>About | LessonVerse</title>
            <div className="max-w-7xl mx-auto px-6">

                {/* --- Hero: The Vision --- */}
                <div className="text-center mb-24 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-12"
                    >
                        <Sparkles size={40} />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-black text-neutral leading-tight tracking-tighter mb-8"
                    >
                        Wisdom is meant <br />
                        <span className="text-primary italic">to be shared.</span>
                    </motion.h1>

                    <p className="max-w-2xl mx-auto text-neutral-content text-lg md:text-xl leading-relaxed font-medium">
                        LessonsVerse was born out of a simple realization: the most valuable lessons aren't found in textbooks, but in the lived experiences of people around us.
                    </p>

                    {/* Background Decorative Blur */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-primary/5 blur-[120px] -z-10" />
                </div>

                {/* --- The Story Grid --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-square bg-base-200 rounded-[4rem] overflow-hidden border border-base-300 relative group">
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                                alt="Team working"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply group-hover:opacity-0 transition-opacity" />
                        </div>
                        {/* Experience Card Overlay */}
                        <div className="absolute -bottom-10 -right-10 bg-neutral p-8 rounded-2xl shadow-2xl text-base-100 hidden md:block max-w-[240px]">
                            <Heart className="text-primary mb-4" />
                            <p className="text-sm font-bold leading-relaxed">
                                "We believe every mistake is a lesson, and every lesson is a gift to the world."
                            </p>
                        </div>
                    </motion.div>

                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-accent/10 text-accent text-xs font-black uppercase tracking-widest">
                            <Target size={16} /> Our Mission
                        </div>
                        <h2 className="text-4xl font-black text-neutral leading-tight">
                            Turning personal failures into <span className="text-accent italic">collective success.</span>
                        </h2>
                        <div className="space-y-6 text-neutral-content text-lg leading-relaxed">
                            <p>
                                Started in 2024, LessonsVerse began as a small diary of failures. We realized that if we could create a safe space for people to document their "hard-won" wisdom, we could save others from making the same mistakes.
                            </p>
                            <p>
                                Today, we are a global community of thinkers, learners, and mentors dedicated to preserving the human experience in its most honest form.
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- The Pillars of Our Story (Milestones) --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                    {[
                        { icon: <Milestone />, title: "The Spark", desc: "It started with a single lesson shared during a late-night conversation.", color: "text-primary" },
                        { icon: <Users size={24} className="lucide lucide-users" />, title: "The Community", desc: "Thousands joined the Inner Circle to leave their digital legacy.", color: "text-accent" },
                        { icon: <Rocket />, title: "The Future", desc: "Scaling wisdom through AI and global human connections.", color: "text-secondary" }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -10 }}
                            className="p-10 bg-base-200 border border-base-300 rounded-3xl transition-all hover:border-primary/30"
                        >
                            <div className={`w-14 h-14 rounded-2xl bg-base-100 flex items-center justify-center mb-6 shadow-sm ${item.color}`}>
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-black text-neutral mb-4">{item.title}</h3>
                            <p className="text-neutral-content leading-relaxed italic">"{item.desc}"</p>
                        </motion.div>
                    ))}
                </div>

                {/* --- Call to Action: The Invitation --- */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden bg-base-300 border border-base-100/10 rounded-3xl p-12 md:p-24 text-center shadow-2xl"
                >
                    {/* Dynamic Background Glows - works perfectly on dark mode */}
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

                    <div className="relative z-10 max-w-2xl mx-auto space-y-10">
                        {/* Animated Quote Icon */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="flex justify-center"
                        >
                            <div className="p-5 bg-base-100 rounded-2xl shadow-xl inline-block text-primary">
                                <Quote size={40} fill="currentColor" className="opacity-80" />
                            </div>
                        </motion.div>

                        {/* Heading with OKLCH Neutral text */}
                        <h2 className="text-4xl md:text-6xl font-black leading-[1.1] text-neutral">
                            Ready to write your <br />
                            <span className="text-primary italic inline-block mt-2">own chapter?</span>
                        </h2>

                        {/* Description with adaptive content color */}
                        <p className="text-neutral-content/80 text-lg md:text-xl font-medium leading-relaxed max-w-lg mx-auto">
                            Your experience is someone else's survival guide. Join <span className="text-neutral font-bold">LessonsVerse</span> today and leave your legacy.
                        </p>

                        {/* Action Button */}
                        <div className="pt-6">
                            <Link
                                to="/signup"
                                className="btn btn-primary btn-lg rounded-2xl px-12 h-auto py-5 font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transition-all duration-300 border-none"
                            >
                                Join the Journey
                            </Link>
                        </div>
                    </div>

                    {/* Subtle Decorative Lines */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                </motion.div>

            </div>
        </div>
    );
};

export default AboutStory;