import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, MailOpen } from 'lucide-react';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setEmail('');
        }
    };

    return (
        <section className="py-16 px-6 bg-base-100 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative">

                {/* Floating Decorative Blur */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-base-200 border border-base-300 rounded-2xl p-10 md:p-16 flex flex-col lg:flex-row items-center gap-12 shadow-2xl relative overflow-hidden"
                >
                    {/* Background Texture */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

                    {/* Left: Content */}
                    <div className="lg:w-1/2 space-y-6 relative z-10 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-accent/10 text-accent text-xs font-black uppercase tracking-widest">
                            <MailOpen size={16} />
                            Weekly Wisdom
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-neutral leading-tight">
                            Insight in your <br />
                            <span className="text-primary italic">Inbox.</span>
                        </h2>
                        <p className="text-neutral-content text-lg max-w-md mx-auto lg:mx-0">
                            Join 10,000+ seekers. Get a weekly curation of the most impactful life lessons shared by our community.
                        </p>
                    </div>

                    {/* Right: Form */}
                    <div className="lg:w-1/2 w-full relative z-10">
                        {!isSubscribed ? (
                            <form
                                onSubmit={handleSubmit}
                                className="relative flex flex-col sm:flex-row gap-4 p-2 bg-base-100 rounded-4xl border border-base-300 shadow-lg focus-within:ring-2 focus-within:ring-primary/20 transition-all"
                            >
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter your email address"
                                    className="grow bg-transparent px-6 py-4 outline-none text-neutral font-medium placeholder:text-neutral-content/50"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="btn btn-primary rounded-2xl px-8 h-auto py-4 font-black uppercase tracking-widest group"
                                >
                                    Subscribe
                                    <Send size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </form>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center gap-4 text-center p-6 bg-success/10 border border-success/20 rounded-3xl"
                            >
                                <div className="w-16 h-16 bg-success text-white rounded-full flex items-center justify-center shadow-lg shadow-success/20">
                                    <CheckCircle2 size={32} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-neutral">You're on the list!</h3>
                                    <p className="text-sm text-neutral-content">Welcome to the Inner Circle. Stay tuned!</p>
                                </div>
                            </motion.div>
                        )}

                        {/* Trust Badges */}
                        <p className="mt-6 text-center lg:text-left text-[10px] font-bold text-neutral-content/40 uppercase tracking-[0.2em] px-4 italic">
                            No spam. Unsubscribe anytime. High-value wisdom only.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Newsletter;