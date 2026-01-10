import React from 'react';
import { motion } from 'framer-motion';
import { Scale, FileWarning, ScrollText, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router';

const tosSections = [
    { id: "acceptance", title: "1. Acceptance of Terms", content: "By accessing or using LessonsVerse, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use our services. We provide a platform for sharing personal life lessons and wisdom." },
    { id: "eligibility", title: "2. Eligibility & Account", content: "You must be at least 13 years old to use this service. You are responsible for maintaining the confidentiality of your account password and for all activities that occur under your account." },
    { id: "content", title: "3. Content Ownership", content: "You retain all rights to the lessons you post. However, by posting, you grant LessonsVerse a worldwide, non-exclusive license to use, display, and distribute that content to our community." },
    { id: "conduct", title: "4. Prohibited Conduct", content: "You agree not to post content that is illegal, harmful, or promotes hate speech. We reserve the right to remove any content that violates our community standards or 'Inner Circle' guidelines." },
    { id: "premium", title: "5. Premium Membership", content: "Premium features (Inner Circle) are subject to a one-time payment. All payments are non-refundable unless required by law. Lifetime access is defined as the lifetime of the platform." },
    { id: "termination", title: "6. Termination", content: "We reserve the right to suspend or terminate your account at our discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users." }
];

const TermsOfService = () => {
    return (
        <div className="bg-base-100 min-h-screen pt-28 pb-20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">

                {/* --- Hero Section --- */}
                <div className="mb-16 border-b border-base-300 pb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 text-accent mb-6"
                    >
                        <Scale size={32} />
                        <span className="font-black uppercase tracking-[0.3em] text-[10px] bg-accent/10 px-3 py-1 rounded-full">Legal Framework</span>
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black text-neutral mb-6 leading-tight">
                        Terms of <span className="text-accent italic">Service.</span>
                    </h1>
                    <div className="flex flex-wrap gap-4 items-center text-neutral-content font-medium">
                        <span className="flex items-center gap-2 bg-base-200 px-4 py-2 rounded-xl border border-base-300">
                            <ScrollText size={16} /> Last Updated: Jan 2026
                        </span>
                        <span className="flex items-center gap-2 bg-base-200 px-4 py-2 rounded-xl border border-base-300">
                            <FileWarning size={16} /> Version 1.2
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* --- Sidebar Nav (Sticky) --- */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-28 space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-content/40 mb-6 px-4">Agreement Sections</p>
                            {tosSections.map((section) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    className="block px-4 py-3 rounded-2xl text-sm font-bold text-neutral-content hover:bg-accent/5 hover:text-accent border border-transparent hover:border-accent/20 transition-all"
                                >
                                    {section.title}
                                </a>
                            ))}
                        </div>
                    </aside>

                    {/* --- Main Content --- */}
                    <main className="lg:col-span-6">
                        <div className="prose prose-neutral max-w-none mb-12">
                            <p className="text-xl text-neutral-content leading-relaxed font-medium border-l-4 border-accent pl-6">
                                These Terms of Service ("Terms") govern your access to and use of LessonsVerse. Please read them carefully before using the platform.
                            </p>
                        </div>

                        <div className="space-y-12">
                            {tosSections.map((section) => (
                                <motion.section
                                    key={section.id}
                                    id={section.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="p-8 bg-base-200/50 border border-base-300 rounded-[2.5rem] hover:bg-base-200 transition-colors"
                                >
                                    <h2 className="text-2xl font-black text-neutral mb-4 flex items-center gap-3">
                                        {section.title}
                                    </h2>
                                    <p className="text-neutral-content leading-[1.8] font-medium">
                                        {section.content}
                                    </p>
                                </motion.section>
                            ))}
                        </div>
                    </main>

                    {/* --- Quick Highlights (Right) --- */}
                    <aside className="lg:col-span-3">
                        <div className="sticky top-28 space-y-6">
                            {/* Summary Card */}
                            <div className="bg-neutral p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-accent blur-[60px] opacity-30" />
                                <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                                    <CheckCircle2 className="text-accent" /> TL;DR
                                </h3>
                                <ul className="space-y-4 text-sm font-medium text-gray-400">
                                    <li>• You own your lessons.</li>
                                    <li>• Respect the community.</li>
                                    <li>• Premium is for life.</li>
                                    <li>• We can remove bad content.</li>
                                </ul>
                            </div>

                            {/* Help Box */}
                            <div className="bg-base-200 border border-base-300 p-8 rounded-[2.5rem]">
                                <AlertCircle className="text-primary mb-4" />
                                <h4 className="font-bold text-neutral mb-2 text-sm">Have Questions?</h4>
                                <p className="text-xs text-neutral-content leading-relaxed mb-6">
                                    If something isn't clear in these terms, our legal team is here to help.
                                </p>
                                <button className="btn btn-primary btn-sm btn-block rounded-xl">
                                    <Link to="/support">
                                        Contact Support
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>
        </div>
    );
};

export default TermsOfService;