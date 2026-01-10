import React from 'react';
import { motion } from 'framer-motion';
import { Gem, Timer, HeartHandshake, Rocket } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';

const WhyLearningFromLife = () => {
    const features = [
        {
            title: "Preserve Your Wisdom",
            desc: "Don't let valuable insights fade away. Capture your hard-won life lessons in a structured format.",
            icon: <Gem className="w-6 h-6" />,
            color: "text-blue-500",
            bgColor: "bg-blue-500/10"
        },
        {
            title: "Avoid Past Mistakes",
            desc: "Review past failures and triumphs to recognize patterns, creating a clearer roadmap for future.",
            icon: <Timer className="w-6 h-6" />,
            color: "text-emerald-500",
            bgColor: "bg-emerald-500/10"
        },
        {
            title: "Find Shared Humanity",
            desc: "By sharing lessons from others, you build empathy and feel connected to a community.",
            icon: <HeartHandshake className="w-6 h-6" />,
            color: "text-amber-500",
            bgColor: "bg-amber-500/10"
        },
        {
            title: "Accelerate Your Growth",
            desc: "Turn passive experience into an engine for rapid personal development through documentation.",
            icon: <Rocket className="w-6 h-6" />,
            color: "text-rose-500",
            bgColor: "bg-rose-500/10"
        }
    ];

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <section className="pb-20 pt-10 bg-base-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-black text-neutral tracking-tight mb-4"
                    >
                        Why Learning From Life <span className="text-accent underline decoration-primary/30 underline-offset-8">Matters</span>
                    </motion.h2>

                    <div className="text-lg md:text-xl text-neutral-content font-medium h-8">
                        <Typewriter
                            words={['Preserve your hard-won wisdom.', 'Avoid repeating past mistakes.', 'Accelerate your personal growth.']}
                            loop={0}
                            cursor
                            cursorStyle='|'
                            typeSpeed={70}
                            deleteSpeed={50}
                            delaySpeed={2000}
                        />
                    </div>
                </div>

                {/* Features Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {features.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className="group relative p-8 bg-base-200 border border-base-300 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5"
                        >
                            {/* Icon Wrapper */}
                            <div className={`inline-flex items-center justify-center p-3 rounded-2xl ${item.bgColor} ${item.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                {item.icon}
                            </div>

                            <h3 className="text-xl font-bold text-neutral mb-3 group-hover:text-primary transition-colors">
                                {item.title}
                            </h3>

                            <p className="text-neutral-content text-sm leading-relaxed">
                                {item.desc}
                            </p>

                            {/* Subtle Decorative Background Element */}
                            <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default WhyLearningFromLife;