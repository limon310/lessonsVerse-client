import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';

const useRole = () => {
    const axiosSecure = useAxiosSecure();
    const {user, loading} = useAuth();
    const {data: role, isLoading: isRoleLoading} = useQuery({
        enabled: !loading && !!user?.email,
        queryKey: ["role", user?.email],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/users/${user?.email}/role`)
            return res.data?.role || 'user';
        }
    })
    return {role, isRoleLoading};
};

export default useRole;