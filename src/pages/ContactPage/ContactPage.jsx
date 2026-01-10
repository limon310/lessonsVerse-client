import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Twitter, Github, Linkedin } from 'lucide-react';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import toast from 'react-hot-toast';

const ContactPage = () => {
    const [email, setEmail] = useState('');

    const handleSupport = (e) => {
        e.preventDefault();
        if (email) {
            toast.success("thank you for contacting us")
            setEmail('');
        }
    };
    return (
        <div className="bg-base-100 min-h-screen pt-28 pb-20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6">

                {/* --- Hero Header --- */}
                <div className="max-w-3xl mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6"
                    >
                        <MessageSquare size={14} />
                        Get in Touch
                    </motion.div>
                    <h1 className="text-3xl md:text-6xl font-black text-neutral leading-tight mb-6">
                        Let's start a <br />
                        <span className="text-primary italic">conversation.</span>
                    </h1>
                    <p className="text-lg text-neutral-content font-medium leading-relaxed">
                        Have a question about LessonsVerse? Or just want to share a life lesson?
                        We're here to listen and help you on your journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* --- Left Column: Contact Info --- */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="space-y-8">
                            {/* Contact Method 1 */}
                            <div className="flex gap-6 group">
                                <div className="w-14 h-14 rounded-2xl bg-base-200 border border-base-300 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-lg shadow-primary/5">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black uppercase tracking-widest text-neutral-content/60 mb-1">Email us</h4>
                                    <p className="text-xl font-bold text-neutral">hello@lessonsverse.com</p>
                                </div>
                            </div>

                            {/* Contact Method 2 */}
                            <div className="flex gap-6 group">
                                <div className="w-14 h-14 rounded-2xl bg-base-200 border border-base-300 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-lg shadow-accent/5">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black uppercase tracking-widest text-neutral-content/60 mb-1">Call support</h4>
                                    <p className="text-xl font-bold text-neutral">+880 1896139783</p>
                                </div>
                            </div>

                            {/* Contact Method 3 */}
                            <div className="flex gap-6 group">
                                <div className="w-14 h-14 rounded-2xl bg-base-200 border border-base-300 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500 shadow-lg shadow-secondary/5">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black uppercase tracking-widest text-neutral-content/60 mb-1">Visit Studio</h4>
                                    <p className="text-xl font-bold text-neutral">Banani, Dhaka, Bangladesh</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="pt-8 border-t border-base-300">
                            <p className="text-xs font-black uppercase tracking-[0.2em] text-neutral-content/40 mb-6">Follow our growth</p>
                            <div className="flex items-center gap-4">
                                {[
                                    { icon: <FaFacebook />, link: "https://www.facebook.com/mdlimon.islam.1422409", label: "Facebook" },
                                    { icon: <FaXTwitter />, link: "https://x.com/", label: "Twitter" },
                                    { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/limon-dev/", label: "LinkedIn" }
                                ].map((social, idx) => (
                                    <a
                                        key={idx}
                                        href={social.link}
                                        target='_blank'
                                        className="p-2 bg-base-300 rounded-lg hover:bg-primary hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                                        aria-label={social.label}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                            {/* <div className="flex gap-4 w-12 h-12 rounded-xl bg-base-200 items-center justify-center text-neutral hover:text-primary border border-base-300 transition-colors">
                                {[Twitter, Github, Linkedin].map((Icon, i) => (
                                    <motion.a
                                        key={i} href="#"
                                        whileHover={{ y: -5 }}
                                        className="w-12 h-12 rounded-xl bg-base-200 flex items-center justify-center text-neutral hover:text-primary border border-base-300 transition-colors"
                                    >
                                        <Icon size={20} />
                                    </motion.a>
                                ))}
                            </div> */}
                        </div>
                    </div>

                    {/* --- Right Column: Contact Form --- */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="lg:col-span-7 bg-base-200 border border-base-300 rounded-[3rem] p-8 md:p-12 shadow-2xl relative"
                    >
                        <form onSubmit={handleSupport} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-neutral-content/70 ml-2">Full Name</label>
                                    <input type="text" placeholder="John Doe" className="input input-lg w-full bg-base-100 border-base-300 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-neutral-content/70 ml-2">Email Address</label>
                                    <input type="email" name="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="john@example.com" className="input input-lg w-full bg-base-100 border-base-300 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-neutral-content/70 ml-2">Subject</label>
                                <select className="select select-lg w-full bg-base-100 border-base-300 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium text-neutral-content">
                                    <option>General Inquiry</option>
                                    <option>Technical Support</option>
                                    <option>Premium Membership</option>
                                    <option>Partnership</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-neutral-content/70 ml-2">Your Message</label>
                                <textarea rows="5" placeholder="How can we help you today?" className="textarea textarea-lg w-full bg-base-100 border-base-300 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none font-medium resize-none"></textarea>
                            </div>

                            <button className="btn btn-primary btn-block btn-lg rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 group">
                                Send Message
                                <Send size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default ContactPage;