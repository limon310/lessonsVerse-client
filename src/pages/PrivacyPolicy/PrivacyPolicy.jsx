import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Eye, FileText, ChevronRight } from 'lucide-react';

const sections = [
    { id: "collection", title: "Information Collection", content: "We collect information you provide directly to us when you create an account, share a lesson, or communicate with us. This includes your name, email address, and the wisdom you choose to share." },
    { id: "usage", title: "How We Use Information", content: "We use the information we collect to maintain and improve LessonsVerse, personalize your experience, and send you technical notices or support messages." },
    { id: "sharing", title: "Information Sharing", content: "We do not share your private personal information with third parties except as described in this policy, such as with your consent or for legal reasons." },
    { id: "security", title: "Data Security", content: "We use industry-standard oklch-based encrypted protocols to protect your data. Your security is our top priority in the Inner Circle." },
    { id: "cookies", title: "Cookies & Tracking", content: "We use cookies to remember your preferences and theme settings (Light/Dark). You can control cookie settings through your browser." }
];

const PrivacyPolicy = () => {
    return (
        <div className="bg-base-100 min-h-screen pt-28 pb-20 transition-colors duration-300">
            <title>Privacy | LessonVerse</title>
            <div className="max-w-7xl mx-auto px-6">

                {/* --- Header Section --- */}
                <div className="mb-16 border-b border-base-300 pb-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 text-primary mb-4"
                    >
                        <ShieldCheck size={32} />
                        <span className="font-black uppercase tracking-[0.3em] text-xs">Trust & Safety</span>
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black text-neutral mb-4 leading-tight">
                        Privacy <span className="text-primary italic">Policy.</span>
                    </h1>
                    <p className="text-neutral-content font-medium">Last Updated: January 2026</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* --- Navigation (Left - Sticky) --- */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-28 space-y-2">
                            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-content/50 mb-4 px-4">Contents</p>
                            {sections.map((section) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-neutral-content hover:bg-base-200 hover:text-primary transition-all group"
                                >
                                    <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    {section.title}
                                </a>
                            ))}
                        </div>
                    </aside>

                    {/* --- Main Content (Middle) --- */}
                    <main className="lg:col-span-6 space-y-16">
                        <section className="prose prose-neutral max-w-none">
                            <p className="text-lg text-neutral-content leading-relaxed">
                                At <strong>LessonsVerse</strong>, your privacy is fundamental to our mission of preserving human wisdom. We believe in transparency and want you to know exactly how we handle your data.
                            </p>
                        </section>

                        {sections.map((section) => (
                            <motion.section
                                key={section.id}
                                id={section.id}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="space-y-4"
                            >
                                <h2 className="text-2xl font-black text-neutral flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                        <FileText size={18} />
                                    </div>
                                    {section.title}
                                </h2>
                                <p className="text-neutral-content leading-[1.8] font-medium pl-11">
                                    {section.content}
                                </p>
                            </motion.section>
                        ))}
                    </main>

                    {/* --- Quick Info (Right) --- */}
                    <aside className="lg:col-span-3">
                        <div className="bg-base-200 border border-base-300 rounded-[2.5rem] p-8 space-y-6 sticky top-28">
                            <div className="p-4 bg-primary/10 rounded-2xl w-fit text-primary">
                                <Lock size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-neutral">Your Data Control</h3>
                            <p className="text-sm text-neutral-content leading-relaxed">
                                You have the right to export, delete, or modify any lesson you have shared on our platform at any time.
                            </p>
                            <button className="btn btn-outline btn-primary btn-sm rounded-xl px-6">
                                Manage Data
                            </button>

                            <hr className="border-base-300" />

                            <div className="flex items-center gap-3 text-neutral-content">
                                <Eye size={18} />
                                <span className="text-xs font-bold">Never sold to third parties</span>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;