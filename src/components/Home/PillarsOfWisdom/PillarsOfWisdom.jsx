import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Briefcase, Brain, Coins, ShieldCheck, Users } from 'lucide-react';
import { Link } from 'react-router';

const pillars = [
    { id: 1, title: "Career & Growth", desc: "Hard-won professional advice", icon: <Briefcase />, color: "text-blue-500", bg: "bg-blue-500/10" },
    { id: 2, title: "Mental Health", desc: "Resilience and mindfulness", icon: <Brain />, color: "text-purple-500", bg: "bg-purple-500/10" },
    { id: 3, title: "Relationships", desc: "Love, family, and connection", icon: <Heart />, color: "text-red-500", bg: "bg-red-500/10" },
    { id: 4, title: "Finance", desc: "Wealth and money management", icon: <Coins />, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { id: 5, title: "Self Mastery", desc: "Discipline and habits", icon: <ShieldCheck />, color: "text-amber-500", bg: "bg-amber-500/10" },
    { id: 6, title: "Social Impact", desc: "Community and giving back", icon: <Users />, color: "text-pink-500", bg: "bg-pink-500/10" },
];

const PillarsOfWisdom = () => {
    return (
        <section className="py-16 bg-base-100 relative">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-4">
                        Explore Wisdom
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-black text-neutral">
                        Pillars of <span className="text-primary italic">Learning.</span>
                    </h3>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={pillar.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.03 }}
                            className="group p-8 bg-base-200 border border-base-300 rounded-2xl cursor-pointer transition-all duration-300 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${pillar.bg} ${pillar.color} flex items-center justify-center mb-6 transition-transform duration-500 group-hover:rotate-12`}>
                                {React.cloneElement(pillar.icon, { size: 28 })}
                            </div>

                            <h4 className="text-xl font-bold text-neutral mb-2 group-hover:text-primary transition-colors">
                                {pillar.title}
                            </h4>
                            <p className="text-neutral-content text-sm leading-relaxed">
                                {pillar.desc}
                            </p>

                            <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all">
                                <Link to="/public-lessons">Explore Lessons <span>→</span></Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PillarsOfWisdom;