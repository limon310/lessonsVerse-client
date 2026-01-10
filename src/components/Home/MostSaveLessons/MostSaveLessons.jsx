import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import MostSaveLessonCard from '../../Shared/MostSaveLessonCard/MostSaveLessonCard';
import { BookmarkCheck } from 'lucide-react';

const MostSaveLessons = () => {
    const axiosSecure = useAxiosSecure();
    const { data: mostSaveLessons = [], isLoading } = useQuery({
        queryKey: ['mostSaveLessons'],
        queryFn: async () => {
            const res = await axiosSecure.get('/most-saved-lessons')
            return res.data;
        }
    })
    // console.log(mostSaveLessons);
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <section className="py-20 bg-base-100">
            <div className="max-w-7xl mx-auto px-4">

                {/* Header with Icon */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-2 text-primary font-bold mb-2 uppercase tracking-widest text-xs">
                            <BookmarkCheck size={18} />
                            <span>Community Favorites</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-neutral">
                            Most Saved <span className="text-primary">Wisdom</span>
                        </h2>
                    </div>
                    <p className="text-neutral-content text-sm md:text-base font-medium">
                        Insightful lessons curated and saved by hundreds of users.
                    </p>
                </div>

                {/* Empty State */}
                {mostSaveLessons.length === 0 ? (
                    <div className="text-center py-16 bg-base-200 rounded-3xl border-2 border-dashed border-base-300">
                        <p className="text-neutral-content italic">Be the first to save a lesson!</p>
                    </div>
                ) : (
                    /* Lessons Grid - Using 5 columns */
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                        {mostSaveLessons.map((lesson, index) => (
                            <motion.div
                                key={lesson.lessonId}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <MostSaveLessonCard lesson={lesson} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default MostSaveLessons;