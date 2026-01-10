import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import TopContributorCard from '../../Shared/TopContributorCard/TopContributorCard';
import { Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const TopContributorWeak = () => {
    const axiosSecure = useAxiosSecure();
    const { data: topContributor = [], isLoading } = useQuery({
        queryKey: ['topContributorInWeak'],
        queryFn: async () => {
            const res = await axiosSecure.get('/top-contributors-week')
            return res.data;
        }
    })
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
        <section className="pb-10 bg-base-100">
            <div className="max-w-7xl mx-auto px-4">

                {/* Section Header */}
                <div className="flex flex-col items-center text-center mb-12">
                    <div className="p-3 bg-amber-500/10 rounded-2xl mb-4">
                        <Trophy className="w-8 h-8 text-amber-500" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-neutral mb-3">
                        Hall of Fame
                    </h2>
                    <p className="text-neutral-content font-medium max-w-lg">
                        Recognizing our legendary contributors who have shared the most wisdom with the community of all time.
                    </p>
                </div>

                {/* Empty State */}
                {topContributor.length === 0 ? (
                    <div className="flex flex-col items-center py-20 bg-base-200 rounded-3xl border-2 border-dashed border-base-300">
                        <p className="text-neutral-content italic">No legends found yet. Be the first!</p>
                    </div>
                ) : (
                    /* Contributors Grid */
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
                    >
                        {topContributor.map((user, index) => (
                            <TopContributorCard
                                key={user.creatorId || index}
                                user={user}
                                rank={index + 1}
                            />
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default TopContributorWeak;