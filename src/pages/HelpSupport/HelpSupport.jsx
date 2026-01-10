import React from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    HelpCircle,
    MessageCircle,
    BookOpen,
    Settings,
    ShieldCheck,
    ArrowRight,
    Mail,
    Phone
} from 'lucide-react';
import { Link } from 'react-router';

const categories = [
    { id: 1, title: "Getting Started", icon: <BookOpen className="text-primary" />, desc: "Learn how to share your first lesson.", link: "/dashboard/add-lesson" },
    { id: 2, title: "Account & Billing", icon: <Settings className="text-accent" />, desc: "Manage your premium membership.", link: "/dashboard/profile" },
    { id: 3, title: "Privacy & Safety", icon: <ShieldCheck className="text-success" />, desc: "Your data and content security.", link: "/privacy-policy" },
];

const faqs = [
    {
        q: "How do I upgrade to Premium?",
        a: "You can upgrade by visiting the 'Premium Upgrade' page and making a one-time payment of ৳1500. This gives you lifetime access to all features."
    },
    {
        q: "Can I edit my lessons after posting?",
        a: "Yes, you can edit or delete your lessons anytime from your profile dashboard under the 'My Lessons' tab."
    },
    {
        q: "What is the Inner Circle?",
        a: "The Inner Circle is our exclusive community for premium members to share high-impact wisdom and connect with mentors."
    }
];

const HelpSupport = () => {
    return (
        <div className="bg-base-100 min-h-screen pt-20 pb-20">
            <title>Support | LessonVerse</title>
            <div className="max-w-7xl mx-auto px-6">

                {/* --- Hero Section --- */}
                <div className="text-center mb-16 space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-neutral tracking-tight"
                    >
                        How can we <span className="text-primary italic">help?</span>
                    </motion.h1 >
                </div>

                {/* --- Help Categories --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {categories.map((cat, idx) => (
                        <motion.div
                            key={cat.id || idx}
                            whileHover={{ y: -5 }}
                            className="p-8 bg-base-200 border border-base-300 rounded-[2.5rem] group cursor-pointer"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-base-100 flex items-center justify-center mb-6 shadow-sm group-hover:bg-primary/10 transition-colors">
                                {React.cloneElement(cat.icon, { size: 28 })}
                            </div>
                            <h3 className="text-xl font-bold text-neutral mb-2">{cat.title}</h3>
                            <p className="text-neutral-content text-sm leading-relaxed mb-6">{cat.desc}</p>
                            <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest"><Link to={cat.link}>
                                View Articles <ArrowRight size={14} /></Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* --- FAQ Section (Left) --- */}
                    <div className="lg:col-span-7 space-y-8">
                        <div>
                            <h2 className="text-3xl font-black text-neutral mb-2">Frequently Asked Questions</h2>
                            <p className="text-neutral-content">Quick answers to common questions.</p>
                        </div>
                        <div className="space-y-4">
                            {faqs.map((faq, idx) => (
                                <div key={idx} className="collapse collapse-plus bg-base-200 border border-base-300 rounded-3xl">
                                    <input type="radio" name="my-accordion-3" defaultChecked={idx === 0} />
                                    <div className="collapse-title text-lg font-bold text-neutral">
                                        {faq.q}
                                    </div>
                                    <div className="collapse-content text-neutral-content">
                                        <p>{faq.a}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- Contact Card (Right) --- */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-28 p-10 bg-base-200 border border-base-300 rounded-[3rem] text-neutral overflow-hidden relative shadow-2xl transition-colors duration-300">

                            {/* Decorative Glow - Using Primary OKLCH with very low opacity */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

                            <h2 className="text-3xl font-black text-neutral mb-6 relative z-10">
                                Still Need Help?
                            </h2>
                            <p className="text-neutral-content/70 mb-10 font-medium relative z-10">
                                Our support team is available Mon-Fri, 9am - 6pm (GMT+6) to assist your learning journey.
                            </p>

                            <div className="space-y-8 relative z-10">
                                {/* Email Contact */}
                                <div className="flex items-center gap-5 group">
                                    <div className="p-4 bg-primary/10 text-primary rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-content/50 mb-1">
                                            Email Us
                                        </p>
                                        <p className="text-lg font-bold text-neutral group-hover:text-primary transition-colors">
                                            support@lessonsverse.com
                                        </p>
                                    </div>
                                </div>

                                {/* Phone Contact */}
                                <div className="flex items-center gap-5 group">
                                    <div className="p-4 bg-accent/10 text-accent rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-content/50 mb-1">
                                            Call Us
                                        </p>
                                        <p className="text-lg font-bold text-neutral group-hover:text-accent transition-colors">
                                            +880 1896139783
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Live Chat Button */}
                            <button className="btn btn-primary btn-block rounded-2xl mt-12 py-4 h-auto font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all group relative z-10">
                                <MessageCircle className="mr-2 group-hover:rotate-12 transition-transform" size={20} />
                                Live Chat Support
                            </button>

                            {/* Subtle Bottom Pattern */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-primary via-accent to-secondary opacity-50" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HelpSupport;