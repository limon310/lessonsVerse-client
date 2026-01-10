import React from 'react';
import { motion } from 'framer-motion';
import { HiCheck, HiXMark, HiOutlineShieldCheck, HiOutlineBolt } from 'react-icons/hi2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const comparisonFeatures = [
    { name: "Number of Lessons", free: "10 Core Lessons", premium: "Unlimited Access", isBoolean: false },
    { name: "Premium Lesson Creation", free: false, premium: true, isBoolean: true },
    { name: "Ad-Free Experience", free: false, premium: true, isBoolean: true },
    { name: "Priority Listing", free: false, premium: true, isBoolean: true },
    { name: "Downloadable Resources", free: "Limited PDFs", premium: "All Source Files", isBoolean: false },
    { name: "Dedicated Support", free: "48-hr response", premium: "4-hr Priority Chat", isBoolean: false },
    { name: "Certification", free: false, premium: true, isBoolean: true },
];

const PricingComparisonTable = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const price = 1500;

    const handleUpgrade = async () => {
        const paymentInfo = {
            package_name: "Premium Membership",
            price,
            customer_email: user?.email,
            plan: "Premium",
            customer_id: crypto.randomUUID(),
        };
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        window.location.href = res.data.url;
    };

    return (
        <div className="bg-base-100 min-h-screen py-16 px-4">
            <div className="max-w-6xl mx-auto">

                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4 uppercase tracking-widest"
                    >
                        <HiOutlineBolt />
                        Upgrade Your Experience
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black text-neutral mb-6">
                        Ready to Become a <span className="text-primary italic">Pro?</span>
                    </h1>
                    <p className="text-neutral-content max-w-2xl mx-auto text-lg">
                        Join 5,000+ learners who have upgraded to premium to unlock exclusive wisdom and career-ready resources.
                    </p>
                </div>

                {/* Main Hero Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative bg-base-200 rounded-[3rem] border border-base-300 p-8 md:p-12 mb-20 overflow-hidden shadow-2xl"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-neutral mb-6">Premium Lifetime Plan</h2>
                            <ul className="space-y-4">
                                {["Unlimited Lesson Access", "Premium Lesson Create", "Official Certificates"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-neutral-content font-medium">
                                        <div className="p-1 bg-success/20 text-success rounded-full"><HiCheck /></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-10">
                                <div className="flex items-baseline gap-2 mb-6">
                                    <span className="text-5xl font-black text-neutral">৳1500</span>
                                    <span className="text-neutral-content/60 line-through">৳4500</span>
                                    <span className="badge badge-primary font-bold">SAVE 65%</span>
                                </div>
                                <button
                                    onClick={handleUpgrade}
                                    className="btn btn-primary btn-lg px-12 rounded-2xl shadow-xl shadow-primary/20 group w-full md:w-auto"
                                >
                                    Unlock Premium Now
                                    <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity }}>→</motion.span>
                                </button>
                                <p className="mt-4 flex items-center gap-2 text-xs text-neutral-content/70">
                                    <HiOutlineShieldCheck className="text-success w-4 h-4" />
                                    Secure one-time payment. No hidden fees.
                                </p>
                            </div>
                        </div>

                        <div className="hidden lg:block relative">
                            {/* Decorative Image/Element */}
                            <div className="w-full h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl border-2 border-dashed border-base-300 flex items-center justify-center">
                                <div className="text-center p-8">
                                    <div className="text-6xl mb-4">🏆</div>
                                    <p className="font-bold text-neutral">Premium Badge Included</p>
                                    <p className="text-xs text-neutral-content">Displayed on your profile & lessons</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Detailed Comparison Table */}
                <div className="mt-20">
                    <h3 className="text-2xl font-bold text-center text-neutral mb-10 italic">Detailed Comparison</h3>
                    <div className="overflow-x-auto rounded-3xl border border-base-300 shadow-sm bg-base-100">
                        <table className="table table-zebra w-full text-center">
                            <thead>
                                <tr className="bg-base-300/50 text-neutral">
                                    <th className="text-left p-6">Features</th>
                                    <th>Free Plan</th>
                                    <th className="bg-primary/5 text-primary">Premium Plan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonFeatures.map((f, i) => (
                                    <tr key={i}>
                                        <td className="text-left font-semibold text-neutral p-5">{f.name}</td>
                                        <td className="text-neutral-content">
                                            {f.isBoolean ? (f.free ? <HiCheck className="mx-auto text-success" /> : <HiXMark className="mx-auto text-error" />) : f.free}
                                        </td>
                                        <td className="bg-primary/5 font-bold text-neutral">
                                            {f.isBoolean ? (f.premium ? <HiCheck className="mx-auto text-primary" /> : <HiXMark className="mx-auto" />) : f.premium}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingComparisonTable;