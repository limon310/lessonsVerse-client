import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import TopContributorCard from '../../Shared/TopContributorCard/TopContributorCard';
import Container from '../../Shared/Container';

const TopContributorWeak = () => {
    const axiosSecure = useAxiosSecure();
    const { data: topContributor = [], isLoading } = useQuery({
        queryKey: ['topContributorInWeak'],
        queryFn: async () => {
            const res = await axiosSecure.get('/top-contributors-week')
            return res.data;
        }
    })
    // console.log(topContributor);
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    return (
            <Container>
            {/* Section Header */}
            <div className="py-6 text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                    Top Contributors of the Week
                </h2>
                <p className="text-sm text-gray-700 font-semibold">
                    Creators who shared the most lessons this week
                </p>
            </div>

            {/* Empty State */}
            {topContributor.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                    No contributors found for this week
                </div>
            )}

            {/* Contributors Grid */}
            <div className="w-[1080px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20 mt-5">
                {topContributor.map((user, index) => (
                    <TopContributorCard
                        key={user.creatorId}
                        user={user}
                        rank={index + 1}
                    />
                ))}
            </div>
            </Container>
    );
};

export default TopContributorWeak;