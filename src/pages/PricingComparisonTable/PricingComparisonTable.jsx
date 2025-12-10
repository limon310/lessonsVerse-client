
import React from 'react';
import { HiCheck, HiXMark } from 'react-icons/hi2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const comparisonFeatures = [
    {
        name: "Number of Lessons",
        free: "10 Core Lessons",
        premium: "Unlimited Access",
        isBoolean: false
    },
    {
        name: "Premium Lesson Creation",
        free: "No",
        premium: "Yes",
        isBoolean: false
    },
    {
        name: "Ad-Free Experience",
        free: false,
        premium: true,
        isBoolean: true
    },
    {
        name: "Priority Listing",
        free: false,
        premium: true,
        isBoolean: true
    },
    {
        name: "Downloadable Resources",
        free: "Limited (PDF Handouts Only)",
        premium: "Full Access (Source Files, Cheatsheets)",
        isBoolean: false
    },
    {
        name: "Dedicated Support",
        free: "Standard Forum/Email (48-hr response)",
        premium: "Priority Chat/Email (4-hr response)",
        isBoolean: false
    },
    {
        name: "Certification",
        free: false,
        premium: true,
        isBoolean: true
    },
    {
        name: "Future Content Access",
        free: "Delayed Access",
        premium: "Instant Access",
        isBoolean: false
    },
];

const renderFeature = (value, isBoolean) => {
    if (isBoolean) {
        return value ? (
            <HiCheck className="h-6 w-6 text-green-500 mx-auto" aria-label="Available" />
        ) : (
            <HiXMark className="h-6 w-6 text-red-400 mx-auto" aria-label="Not Available" />
        );
    }
    return <span className="text-gray-700 font-medium">{value}</span>;
};

const PricingComparisonTable = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    // handle payment
    const price = 1500;  // meaning $1500 or 1500 BDT?
    const packageType = "Premium";
    const userId = crypto.randomUUID();

    const handleUpgrade = async () => {
        const paymentInfo = {
            package_name: "Premium Membership",
            price,
            customer_email: user?.email,
            plan: packageType,
            customer_id: userId,
        };

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);

        // redirect user to Stripe Checkout
        window.location.href = res.data.url;
    };

    return (
        <div className="max-w-4xl mx-auto my-12 p-6 bg-white shadow-2xl rounded-xl border border-gray-100">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
                Choose Your Learning Path
            </h2>

            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-indigo-50/70">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800 tracking-wider w-1/3">
                            Feature
                        </th>
                        <th className="px-6 py-4 text-center text-lg font-bold text-gray-700 tracking-wider">
                            Basic <span className="text-xs font-medium text-gray-500 block">(Free)</span>
                        </th>
                        <th className="px-6 py-4 text-center text-lg font-bold text-indigo-700 tracking-wider border-l-4 border-indigo-600">
                            Premium <span className="text-xs font-medium text-indigo-600 block">(Lifetime)</span>
                        </th>
                    </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                    {comparisonFeatures.map((feature, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-6 py-4 whitespace-normal text-sm font-medium text-gray-900">
                                {feature.name}
                            </td>
                            <td className="px-6 py-4 whitespace-normal text-sm text-center">
                                {renderFeature(feature.free, feature.isBoolean)}
                            </td>
                            <td className="px-6 py-4 whitespace-normal text-sm text-center font-semibold bg-indigo-50/30 border-l-4 border-indigo-200">
                                {renderFeature(feature.premium, feature.isBoolean)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* --- Stripe Checkout SECTION --- */}
            <div className="p-8 pt-10 bg-white text-center rounded-b-xl">
                <p className="text-xl font-medium text-gray-600 mb-2">
                    Unlock **Lifetime Premium Access**
                </p>
                <div className="text-4xl font-extrabold text-indigo-600 mb-6">
                    ৳1500
                    <span className="text-base font-normal text-gray-500 ml-3">
                        One-time payment
                    </span>
                </div>

                <button
                    onClick={handleUpgrade}
                    className="w-full sm:w-2/3 lg:w-1/2 py-4 px-8 bg-indigo-600 text-white font-bold text-xl rounded-lg shadow-xl hover:bg-indigo-700 transition duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                    Upgrade to Premium
                </button>
            </div>
        </div>
    );
};

export default PricingComparisonTable;