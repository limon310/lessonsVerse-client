
import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const SocialLogin = () => {
    const axiosSecure = useAxiosSecure();
    const location = useLocation();
    const navigate = useNavigate();
    const { user, signInWithGoogle } = useAuth();
    // hanlde google sign in
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);

                const userInfo = {
                    displayName: result.user?.displayName,
                    photoURL: result.user.photoURL,
                    email: result.user.email
                }
                axiosSecure.post('/users', userInfo)
                    .then(res => {
                        console.log("user created in database", res.data);
                        navigate(location?.state || "/");
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div
            onClick={handleGoogleSignIn}
            className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
        >
            <FcGoogle size={32} />

            <p>Continue with Google</p>
        </div>
    );
};

export default SocialLogin;