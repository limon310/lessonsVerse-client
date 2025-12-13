import React from 'react';
import useRole from '../hooks/useRole';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import { Navigate } from 'react-router';

const AdminRoute = ({children}) => {
    const {role, isRoleLoading} = useRole();
    console.log(role)
    if(isRoleLoading){
        return <LoadingSpinner></LoadingSpinner>
    }
    if(role === "admin"){
        return children;
    }
    return <Navigate to="/"></Navigate>
};

export default AdminRoute;