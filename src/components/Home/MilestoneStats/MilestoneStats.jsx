import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Globe, Award } from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

// const stats = [
//     {
//         id: 1,
//         label: "Lessons Shared",
//         value: "12,000+",
//         icon: <BookOpen className="w-6 h-6" />,
//         color: "text-primary",
//         bgColor: "bg-primary/10"
//     },
//     {
//         id: 2,
//         label: "Active Learners",
//         value: "8,500+",
//         icon: <Users className="w-6 h-6" />,
//         color: "text-accent",
//         bgColor: "bg-accent/10"
//     },
//     {
//         id: 3,
//         label: "Countries Reached",
//         value: "45+",
//         icon: <Globe className="w-6 h-6" />,
//         color: "text-secondary",
//         bgColor: "bg-secondary/10"
//     },
//     {
//         id: 4,
//         label: "Lives Impacted",
//         value: "250K",
//         icon: <Award className="w-6 h-6" />,
//         color: "text-success",
//         bgColor: "bg-success/10"
//     }
// ];
const stats = [
    { id: 1, label: "Lessons Shared", value: 12000, suffix: "+", icon: <BookOpen />, color: "text-primary" },
    { id: 2, label: "Active Learners", value: 8500, suffix: "+", icon: <Users />, color: "text-accent" },
    { id: 3, label: "Countries Reached", value: 45, suffix: "+", icon: <Globe />, color: "text-secondary" },
    { id: 4, label: "Lives Impacted", value: 250, suffix: "K", icon: <Award />, color: "text-success" }
];
const MilestoneStats = () => {
    const { ref, inView } = useInView({
        threshold: 0.3,
        triggerOnce: true,
    });
    return (
        <section ref={ref} className="py-20 bg-base-100 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Left: Heading - 5 Columns */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-base-200 border border-base-300">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-neutral">Live Platform Growth</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black text-neutral leading-tight">
                            Our Journey in <span className="text-primary italic">Numbers.</span>
                        </h2>

                        <p className="text-neutral-content text-lg leading-relaxed max-w-md">
                            We're building the world's largest repository of human wisdom. Every number represents a lesson learned and a life changed.
                        </p>
                    </div>

                    {/* Right: Stats Grid - 7 Columns */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {stats.map((stat) => (
                    <div key={stat.id} className="p-8 bg-base-200 rounded-2xl border border-base-300 text-center group">
                        <div className={`mx-auto w-12 h-12 flex items-center justify-center mb-4 ${stat.color} bg-current/10 rounded-xl`}>
                            {stat.icon}
                        </div>
                        
                        <h3 className="text-4xl font-black text-neutral mb-2">
                            {inView ? (
                                <CountUp 
                                    end={stat.value} 
                                    duration={2.5} 
                                    suffix={stat.suffix} 
                                    separator=","
                                />
                            ) : (
                                `0${stat.suffix}`
                            )}
                        </h3>
                        
                        <p className="text-xs font-bold text-neutral-content uppercase tracking-widest">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
                </div>
            </div>

            {/* Background Decorative Blur */}
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        </section>
    );
};

export default MilestoneStats;