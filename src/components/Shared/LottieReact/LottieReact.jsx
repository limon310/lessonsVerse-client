import React from 'react';
import successAnimation from '../../../assets/images/Tick Pop.json'
import Lottie from "lottie-react";

const LottieReact = () => {
    return (
        <div className="flex justify-center items-center py-8" style={{ width: 200 }}>
            <div>
                <Lottie animationData={successAnimation} loop={false} />
            </div>
        </div>
    );
};

export default LottieReact;