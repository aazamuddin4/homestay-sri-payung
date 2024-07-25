import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import image1 from '../assets/image1.jpg'
import image2 from '../assets/image2.jpg'
import image3 from '../assets/image3.jpg'
import image4 from '../assets/image4.jpg'
import image5 from '../assets/image5.jpg'
import image6 from '../assets/image6.jpg'
import image7 from '../assets/image7.jpg'
import image8 from '../assets/image8.jpg'
import image9 from '../assets/image9.jpg'
import image10 from '../assets/image10.jpg'

interface ImageCarouselProps {
    onBookNowClick: () => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ onBookNowClick }) => {
    const navigate = useNavigate();

    return (
        <div>
            <CarouselWrapper>
                <Carousel autoPlay infiniteLoop showThumbs={false}>
                    <ImageWrapper>
                        <img src={image1} alt="Homestay 1" />
                    </ImageWrapper>
                    <ImageWrapper>
                        <img src={image2} alt="Homestay 2" />
                    </ImageWrapper>
                    <ImageWrapper>
                        <img src={image3} alt="Homestay 3" />
                    </ImageWrapper>
                    <ImageWrapper>
                        <img src={image4} alt="Homestay 4" />
                    </ImageWrapper>
                    <ImageWrapper>
                        <img src={image5} alt="Homestay 5" />
                    </ImageWrapper>
                    <ImageWrapper>
                        <img src={image6} alt="Homestay 6" />
                    </ImageWrapper>
                    <ImageWrapper>
                        <img src={image7} alt="Homestay 7" />
                    </ImageWrapper>
                    <ImageWrapper>
                        <img src={image8} alt="Homestay 8" />
                    </ImageWrapper>
                    <ImageWrapper>
                        <img src={image9} alt="Homestay 9" />
                    </ImageWrapper>
                    <ImageWrapper>
                        <img src={image10} alt="Homestay 10" />
                    </ImageWrapper>
                </Carousel>
            </CarouselWrapper>
            <ButtonWrapper>
                <BookingButton onClick={onBookNowClick}>Book Now</BookingButton>
            </ButtonWrapper>
        </div>
    );
};

const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    height: 400px;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: contain; /* Ensure the image covers the container */
    }
`;

const CarouselWrapper = styled.div`
    width: 400px;
    margin: 0 auto;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const BookingButton = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #0056b3;
    }
`;

export default ImageCarousel;
