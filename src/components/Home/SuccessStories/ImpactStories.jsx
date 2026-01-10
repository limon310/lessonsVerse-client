import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const impactStories = [
    {
        id: 1,
        name: "Jesika",
        role: "Content Creator",
        image: "https://i.pravatar.cc/150?u=jesika",
        story: "LessonsVerse changed how I document my growth. I shared a lesson on resilience that helped 50+ people navigate their career shifts.",
        impact: "50+ Lives Impacted"
    },
    {
        id: 2,
        name: "Sarah Chen",
        role: "Student",
        image: "https://i.pravatar.cc/150?u=sarah",
        story: "Reading shared lessons here gave me the courage to start my own startup. The community wisdom is pure gold.",
        impact: "Startup Launched"
    },
    {
        id: 3,
        name: "James Wilson",
        role: "Mentor",
        image: "https://i.pravatar.cc/150?u=james",
        story: "As a mentor, this is the best place to leave a legacy. My life lessons are now helping the next generation of leaders.",
        impact: "Entrepreneur"
    }
];

const ImpactStories = () => {
    return (
        <section className="pb-16 pt-10 bg-base-100 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary mb-4">
                        Real Impact
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-black text-neutral leading-tight">
                        Stories that Spark <span className="text-accent italic">Change.</span>
                    </h3>
                </div>

                {/* Stories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {impactStories.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ y: -10 }}
                            className="bg-base-200 border border-base-300 p-8 rounded-2xl relative group transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5"
                        >
                            {/* Quote Icon */}
                            <div className="absolute -top-4 -right-4 bg-primary text-white p-3 rounded-2xl shadow-lg rotate-12 group-hover:rotate-0 transition-transform">
                                <Quote size={20} fill="currentColor" />
                            </div>

                            <div className="flex flex-col h-full">
                                {/* Story Content */}
                                <p className="text-neutral-content italic mb-8 leading-relaxed flex-grow">
                                    "{item.story}"
                                </p>

                                {/* User Profile */}
                                <div className="flex items-center gap-4 border-t border-base-300 pt-6">
                                    <div className="relative">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-12 h-12 rounded-xl object-cover ring-2 ring-base-100"
                                        />
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-base-200" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-neutral text-sm">{item.name}</h4>
                                        <p className="text-[10px] uppercase font-bold text-neutral-content tracking-wider">
                                            {item.role}
                                        </p>
                                    </div>
                                </div>

                                {/* Impact Badge */}
                                <div className="mt-4">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-black uppercase tracking-tighter">
                                        ✨ {item.impact}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Optional: Floating Background Circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
            </div>
        </section>
    );
};

export default ImpactStories;