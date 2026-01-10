import React from 'react';
import { motion } from 'framer-motion';
// Swiper React components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Quote, Star } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: "Ariful Haque",
        role: "Top Contributor",
        image: "https://i.pravatar.cc/150?u=arif",
        content: "LessonsVerse-এ আমার জীবনের ভুল থেকে শেখা লেসনগুলো শেয়ার করতে পেরে আমি আনন্দিত। এটি শুধু একটি প্ল্যাটফর্ম নয়, এটি একটি ডিজিটাল হেরিটেজ।",
        rating: 5
    },
    {
        id: 2,
        name: "Anika Tabassum",
        role: "Premium Learner",
        image: "https://i.pravatar.cc/150?u=anika",
        content: "এখানকার প্রিমিয়াম লেসনগুলো আমার ক্যারিয়ারের ডিসিশন নিতে অনেক সাহায্য করেছে। বিশেষ করে লিডারশিপ সেকশনটি অসাধারণ!",
        rating: 5
    },
    {
        id: 3,
        name: "Tanvir Ahmed",
        role: "Content Creator",
        image: "https://i.pravatar.cc/150?u=tanvir",
        content: "সহজ ইন্টারফেস এবং ডার্ক মোড ডিজাইনটি দারুণ। আমি প্রতিদিন অন্তত একটি নতুন লেসন পড়ার চেষ্টা করি যা আমাকে অনুপ্রাণিত করে।",
        rating: 4
    },
    {
        id: 4,
        name: "Mousumi Akter",
        role: "Lifelong Learner",
        image: "https://i.pravatar.cc/150?u=mousumi",
        content: "অন্যের অভিজ্ঞতা থেকে শেখার এই কনসেপ্টটি ইউনিক। LessonsVerse আমার প্রতিদিনের ব্রাউজিংয়ের অংশ হয়ে গেছে।",
        rating: 5
    }
];

const Testimonials = () => {
    return (
        <section className="py-24 bg-base-100 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-primary font-black uppercase tracking-[0.3em] text-xs"
                    >
                        Community Feedback
                    </motion.span>
                    <h2 className="text-3xl md:text-5xl font-black text-neutral mt-4 leading-tight">
                        What Our <span className="text-primary">Inner Circle</span> Says
                    </h2>
                </div>

                {/* Swiper Slider */}
                <div className="relative px-4">
                    <Swiper
                        modules={[Pagination, Autoplay, Navigation]}
                        spaceBetween={30}
                        slidesPerView={1}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="pb-16"
                    >
                        {testimonials.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="bg-base-200 border border-base-300 p-8 rounded-2xl h-full relative group transition-all duration-300 hover:border-primary/30">

                                    {/* Quote Icon */}
                                    <div className="mb-6 text-primary/20 group-hover:text-primary/40 transition-colors">
                                        <Quote size={40} fill="currentColor" />
                                    </div>

                                    <p className="text-neutral-content leading-relaxed mb-8 italic">
                                        "{item.content}"
                                    </p>

                                    <div className="flex items-center gap-4 border-t border-base-300 pt-6">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-14 h-14 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                        />
                                        <div>
                                            <h4 className="font-bold text-neutral">{item.name}</h4>
                                            <p className="text-xs font-medium text-neutral-content/60 italic">{item.role}</p>

                                            {/* Rating Stars */}
                                            <div className="flex gap-1 mt-1">
                                                {[...Array(item.rating)].map((_, i) => (
                                                    <Star key={i} size={12} className="text-accent fill-accent" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            {/* Background Decorative Blur */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
};

export default Testimonials;