import React from 'react';
import { XCircle, ArrowLeft, RefreshCcw, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router';

const PaymentCancel = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center border border-gray-100">

                {/* Visual Indicator */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <div className="bg-red-50 p-5 rounded-full animate-pulse">
                            <XCircle className="w-20 h-20 text-red-500" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-md">
                            <ShieldAlert className="w-8 h-8 text-amber-500" />
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
                    Payment Cancelled
                </h1>
                <p className="text-slate-600 mb-8 leading-relaxed">
                    The transaction was not completed. This could be due to a manual cancellation, an expired session, or a bank decline. No funds were deducted from your account.
                </p>

                {/* Action Buttons */}
                <div className="space-y-4">
                    <button
                        onClick={() => navigate('/upgrade-premium')}
                        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95 cursor-pointer"
                    >
                        <RefreshCcw size={20} />
                        Try Payment Again
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="w-full flex items-center justify-center gap-2 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold py-4 px-6 rounded-xl transition-all active:scale-95 cursor-pointer"
                    >
                        <ArrowLeft size={20} />
                        Return to Home
                    </button>
                </div>

                {/* Support Section */}
                <div className="mt-10 pt-6 border-t border-slate-50">
                    <p className="text-sm text-slate-400">
                        Having trouble? <span className="text-indigo-600 font-semibold hover:underline transition-all cursor-pointer">Contact Support</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancel;

// import React from 'react';

// const PaymentCancel = () => {
//     return (
//         <div>
//             <h1>Payment cancel</h1>
//         </div>
//     );
// };

// export default PaymentCancel;