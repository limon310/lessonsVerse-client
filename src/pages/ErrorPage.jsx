import React from 'react';
import { Home, ArrowLeft, BookOpen } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Illustration Placeholder / Icon */}
        <div className="relative mb-8 flex justify-center">
          <div className="absolute inset-0 bg-indigo-200 blur-3xl opacity-30 rounded-full"></div>
          <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
            <BookOpen size={64} className="text-indigo-600 animate-bounce" />
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              404
            </div>
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
          Lesson Not Found
        </h1>
        <p className="text-slate-600 mb-8 leading-relaxed">
          It looks like this page took an unexpected recess. The lesson you're looking for might have been moved, deleted, or never existed in this universe.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-all shadow-sm"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

          <Link to='/'
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
          >
            <Home size={18} />
            Back to Campus
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
