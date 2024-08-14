import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ImageCarousel from '../components/ImageCarousel';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import GuestReview from '../components/ReviewComponent';

const HomePage: React.FC = () => {
    const [showBooking, setShowBooking] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const datePickerRef = useRef<HTMLDivElement | null>(null);

    const handleBooking = () => {
        if (startDate && endDate && name && phone) {
            const bookingDetails = `Booking from ${startDate.toDateString()} to ${endDate.toDateString()}`;
            const encodedMessage = encodeURIComponent(`${bookingDetails}\n\nName: ${name}\n\nPhone Number: ${phone}\n\nEmail: ${email || '-'}`);
            const whatsappURL = `https://api.whatsapp.com/send?phone=60195881945&text=${encodedMessage}`;

            window.open(whatsappURL, '_blank');
        } else {
            if (startDate === null || endDate === null) {
                alert('Please select both start and end dates.');
            } else if (phone === '') {
                alert('Please input your phone number');
            } else {
                alert('Please input your name')
            }
        }
    };

    useEffect(() => {
        if (showBooking && datePickerRef.current) {
            datePickerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [showBooking]);

    return (
        <><HomePageWrapper>
            <Title>Home2stay Inap Sri Payung</Title>
            <ImageCarousel onBookNowClick={() => {
                setShowBooking(true);
                if (showBooking) {
                    handleBooking();
                }
            } } />
            {showBooking && (
                <BookingWrapper ref={datePickerRef}>
                    <BookingTitle>Select Your Dates</BookingTitle>
                    <BookingSubTitle>Inform our host on your chosen date</BookingSubTitle>
                    <DatePickerWrapper>
                        <DatePicker
                            selected={startDate || undefined}
                            onChange={(date: Date | null) => setStartDate(date)}
                            startDate={startDate || undefined}
                            endDate={endDate || undefined}
                            selectsStart
                            dateFormat="yyyy/MM/dd"
                            placeholderText="Start Date" />
                        <DatePicker
                            selected={endDate || undefined}
                            onChange={(date: Date | null) => setEndDate(date)}
                            startDate={startDate || undefined}
                            endDate={endDate || undefined}
                            selectsEnd
                            minDate={startDate ? new Date(startDate) : undefined}
                            dateFormat="yyyy/MM/dd"
                            placeholderText="End Date" />
                    </DatePickerWrapper>
                    <InputWrapper>
                        <InputField
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name" />
                        <InputField
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter your phone number" />
                        <InputField
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email" />
                    </InputWrapper>
                    <ButtonWrapper>
                        <CloseButton onClick={() => setShowBooking(false)}>Close</CloseButton>
                        <BookingButton onClick={handleBooking}>Confirm</BookingButton>
                    </ButtonWrapper>
                    <MapWrapper>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d993.5641770533502!2d118.28454839999998!3d5.0620872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x323f0b0edb05ddab%3A0xe614614ef1534af1!2sDarvel%20Bay%20Homestay!5e0!3m2!1sen!2smy!4v1721892187050!5m2!1sen!2smy"
                            width="600"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </MapWrapper>
                </BookingWrapper>
            )}
        </HomePageWrapper><ReviewsSection>
                {reviewsData.map((review, index) => (
                    <GuestReview key={index} author={review.author} text={review.text} />
                ))}
            </ReviewsSection></>
    );
};
const Title = styled.h1`
    font-size: 2.5em;
    margin-bottom: 20px;
    color: white;
    border: 3px solid white;
    border-radius: 15px;
    padding: 10px 20px;
    display: inline-block;
    background-color: rgba(0, 0, 0, 0.3);
    opacity: 0;
    animation: fadeInSlideIn 2s forwards;

    @keyframes fadeInSlideIn {
        0% {
            opacity: 0;
            transform: translateX(-20px);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;

const HomePageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 20px;
`;

const BookingWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-color: #f8f9fa; /* Optional: background color */
    border-radius: 10px;
    margin-top: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const BookingTitle = styled.h2`
    font-size: 2em;
    margin-bottom: 2px;
`;

const BookingSubTitle = styled.h2`
    font-size: 1em;
    margin-bottom: 20px;
`;

const DatePickerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 10px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
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

const CloseButton = styled.button`
    padding: 10px 28px;
    background-color: #ccc;
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #bbb;
    }
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
`;

const InputField = styled.input`
    padding: 2px;
    border: 1px solid #000000;
    border-radius: 2px;
    width: 100%;
    box-sizing: border-box;
`;

const MapWrapper = styled.div`
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    height: 450px; /* Fixed height for the map */
`;

const ReviewsSection = styled.div`
    width: 50%;
    margin: 0 auto;
    padding: 20px;
    background-color: transparent;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #ccc;
        border-radius: 10px;
    }
`;

const reviewsData = [
    { author: 'Arif', text: 'Amazing stay! Highly recommend.' },
    { author: 'Muhd Nuaim', text: 'Loved the environment, cold taking places when at dawn, even when the aircond is off' },
    { author: 'Aqilah', text: 'I like the environment and the host`s food, I really love the Nasi Kuning' },
    // Add more reviews as needed
];

export default HomePage;
