import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import LessonCard from '../../Shared/LessonCard/LessonCard';
import useAuth from '../../../hooks/useAuth';

const FeatureLesson = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // Fetch logged-in user's details from DB
    const { data: userData = {}, isLoading: userLoading } = useQuery({
        queryKey: ['userIn-featuredSection', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        }
    });

    const isUserPremium = userData?.isPremium;

    const { data: featuredLessons = [], isLoading } = useQuery({
        queryKey: ['featuredLesson'],
        queryFn: async () => {
            const res = await axiosSecure.get('/featured-lesson')
            return res.data;
        }
    })
    // console.log(featuredLessons);

    if (isLoading || userLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <section className='bg-base-100 py-16'>
            <div className='container mx-auto px-4'>
                <div className='text-center mb-12'>
                    <h2 className='text-3xl md:text-4xl font-bold text-accent mb-3'>
                        Featured Lessons
                    </h2>
                    <p className='text-neutral-content max-w-2xl mx-auto'>
                        Expand your knowledge with our curated lessons designed for your growth.
                    </p>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                    {featuredLessons?.map(lesson => (
                        <LessonCard
                            key={lesson._id}
                            lesson={lesson}
                            isUserPremium={isUserPremium}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureLesson;