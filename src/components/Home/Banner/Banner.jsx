import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Content1 from '../../Shared/BannerContent/Content1';
import Content2 from '../../Shared/BannerContent/Content2';
import Content3 from '../../Shared/BannerContent/Content3';

const Banner = () => {
    return (
        <div>
            <Carousel
                showThumbs={false}
                autoPlay={true}
                infiniteLoop={true}
            >
                <div>
                    <Content1></Content1>
                </div>
                <div>
                    <Content2></Content2>
                </div>
                <div>
                    <Content3></Content3>
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;