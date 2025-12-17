import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import MostSaveLessonCard from '../../Shared/MostSaveLessonCard/MostSaveLessonCard';

const MostSaveLessons = () => {
    const axiosSecure = useAxiosSecure();
    const { data: mostSaveLessons=[], isLoading } = useQuery({
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
        <section className="mt-10">
            {/* Section Header */}
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Most Saved Lessons
                </h2>
                <p className="text-sm text-gray-500">
                    Lessons that are most popular among users
                </p>
            </div>

            {/* Empty State */}
            {mostSaveLessons.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                    No lessons have been saved yet
                </div>
            )}

            {/* Lessons Grid */}
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {mostSaveLessons.map((lesson) => (
                    <MostSaveLessonCard key={lesson.lessonId} lesson={lesson} />
                ))}
            </div>
        </section>
    );
};

export default MostSaveLessons;