import React from 'react';
import styled from 'styled-components';

const Review = styled.div`
    margin-bottom: 20px;
    padding: 15px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    opacity: 0;
    animation: fadeInUp 5s forwards;

    @keyframes fadeInUp {
        0% {
            opacity: 0;
            transform: translateY(20px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const ReviewAuthor = styled.p`
    font-weight: bold;
    margin-bottom: 5px;
`;

const ReviewText = styled.p`
    font-style: italic;
    color: #555;
`;

const GuestReview = ({ author, text }: any) => (
    <Review>
        <ReviewAuthor>{author}</ReviewAuthor>
        <ReviewText>"{text}"</ReviewText>
    </Review>
);

export default GuestReview;
