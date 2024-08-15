import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ImageCarousel from '../components/ImageCarousel';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import GuestReview from '../components/ReviewComponent';
import { Carousel } from 'react-responsive-carousel';
import Modal from '../components/Modal'; // Import the Modal component
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
import image11 from '../assets/image11.jpg'
import image12 from '../assets/image12.jpg'
import image13 from '../assets/image13.jpg'
import image14 from '../assets/image14.jpg'
import image15 from '../assets/image15.jpg'
import image16 from '../assets/image16.jpg'
import image17 from '../assets/image17.jpg'
import image18 from '../assets/image18.jpg'
import image19 from '../assets/image19.jpg'
import image20 from '../assets/image20.jpg'
import image21 from '../assets/image21.jpg'
import image22 from '../assets/image22.jpg'
import image23 from '../assets/image23.jpg'
import image24 from '../assets/image24.jpg'
import image25 from '../assets/image25.jpg'
import supabase from '../services/supabaseClient';

const HomePage: React.FC = () => {
    const formatDate = (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const today = new Date()
    const todayDate = formatDate(today)
    const [showBooking, setShowBooking] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>('');
    const [disabledDates, setDisabledDates] = useState<Date[]>([]);
    const [availability, setAvailability] = useState<any>({});

    const insertBooking = async (homestay_id: string, start_date: string, end_date: string) => {
        const { data, error } = await supabase
            .from('booking_table')
            .insert([
                {
                    homestay_id: homestay_id,
                    start_date: start_date,
                    end_date: end_date,
                },
            ]);

        if (error) {
            console.error('Error inserting booking:', error.message, error.details, error.hint);
        } else {
            console.log('Booking inserted:', data);
        }
    };

    const datePickerRef = useRef<HTMLDivElement | null>(null);

    const generateHouseCaptions = (start: number, end: number, caption: string, availability: string) => {
        const captions = [];
        for (let i = start; i <= end; i++) {
            captions.push(`${caption} ${availability}`);
        }
        return captions;
    };

    const homestay1To4Captions = generateHouseCaptions(1, 13, "Homestay 1-4", "(Not Available until 1st Oct 24)");
    const homestayTabanakCaptions = generateHouseCaptions(14, 24, "Homestay Tabanak", "");

    const houseCaptions = [...homestay1To4Captions, ...homestayTabanakCaptions];

    const images = [
        image1, image2, image3, image4, image5, image6, image7, image8,
        image9, image10, image11, image12, image13, image14, image15,
        image16, image17, image18, image19, image20, image21, image22,
        image23, image24, image25,
    ];

    const handleBooking = () => {
        if (startDate && endDate && name && phone && selectedImage) {
            insertBooking(selectedImage, startDate.toDateString(), endDate.toDateString());
            const bookingDetails = `Booking from ${startDate.toDateString()} to ${endDate.toDateString()}`;
            const encodedMessage = encodeURIComponent(`${bookingDetails}\n\nName: ${name}\n\nPhone Number: ${phone}\n\nEmail: ${email || '-'} \n\nHomestay: ${selectedImage} `);
            const whatsappURL = `https://api.whatsapp.com/send?phone=60195881945&text=${encodedMessage}`;

            window.open(whatsappURL, '_blank');
        } else {
            if (startDate === null || endDate === null) {
                alert('Please select both start and end dates.');
            } else if (phone === '') {
                alert('Please input your phone number');
            } else if (selectedImage === '') {
                setShowModal(true)
                alert('Please select which homestay you want to stay');
            } else {
                alert('Please input your name');
            }
        }
    };

    const fetchData = async () => {
        try {
            // Fetch booking data
            const { data: bookingData, error: bookingError } = await supabase
                .from('booking_table')
                .select('*');

            if (bookingError) {
                throw bookingError;
            }

            // Process booking data to map availability
            const availabilityMap: { [date: string]: string[] } = {};
            bookingData.forEach((item: any) => {
                const start = new Date(item.start_date);
                const end = new Date(item.end_date);
                for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
                    const dateString = d.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
                    if (!availabilityMap[dateString]) {
                        availabilityMap[dateString] = [];
                    }
                    if (!availabilityMap[dateString].includes(item.homestay_id)) {
                        availabilityMap[dateString].push(item.homestay_id);
                    }
                }
            });

            setAvailability(availabilityMap); // Set availability state
            setData(bookingData);
        } catch (error) {
            setError((error as Error).message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (showBooking && datePickerRef.current) {
            datePickerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [showBooking]);

    const handleModalClose = (house: any) => {
        setShowModal(false);
        setShowBooking(true);
        setSelectedImage(house)
    };

    return (
        <>
            <HomePageWrapper>
                <Title>Home2stay Inap Sri Payung</Title>
                <ImageCarousel onBookNowClick={() => setShowModal(true)} />
                {showModal && (
                    <Modal onClose={() => {
                        setShowModal(false);
                        setShowBooking(true);
                    }}>
                        <CarouselWrapper>
                            <Carousel autoPlay infiniteLoop showThumbs={false}>
                                {images.map((img, index) => (
                                    <div key={index}>
                                        <ImageWrapper>
                                            <img src={img} alt={houseCaptions[index]} />
                                        </ImageWrapper>
                                        <p className="legend">{houseCaptions[index]}</p> {/* Add Caption */}
                                    </div>
                                ))}
                            </Carousel>
                        </CarouselWrapper>
                        <ButtonGroup>
                            {['Homestay 1', 'Homestay 2', 'Homestay 3', 'Homestay 4'].map((house) => {
                                return (
                                    <HouseButton
                                        key={house}
                                        disabled={data.some(item =>
                                            item.homestay_id == house && (item.start_date === todayDate || item.end_date === todayDate)
                                        )}
                                        onClick={() => handleModalClose(house)}
                                    >
                                        {house}
                                    </HouseButton>
                                );
                            })}
                            <HouseButton
                                disabled={data.some(item =>
                                    item.homestay_id === 'Tabanak' && (item.start_date === todayDate || item.end_date === todayDate)
                                )}
                                onClick={() => handleModalClose('Tabanak')}
                            >
                                Homestay Tabanak
                            </HouseButton>
                        </ButtonGroup>
                    </Modal>
                )}
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
                                placeholderText="Start Date"
                                filterDate={date => {
                                    const formattedDate = formatDate(date);
                                    return !(selectedImage && availability[formattedDate] && availability[formattedDate].includes(selectedImage));
                                }}
                            
                            />
                            <DatePicker
                                selected={endDate || undefined}
                                onChange={(date: Date | null) => setEndDate(date)}
                                startDate={startDate || undefined}
                                endDate={endDate || undefined}
                                selectsEnd
                                minDate={startDate ? new Date(startDate) : undefined}
                                dateFormat="yyyy/MM/dd"
                                placeholderText="End Date"
                                filterDate={date => {
                                    const formattedDate = formatDate(date);
                                    return !(selectedImage && availability[formattedDate] && availability[formattedDate].includes(selectedImage));
                                }}
                            
                            />
                        </DatePickerWrapper>
                        <InputWrapper>
                            <InputField
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                            />
                            <InputField
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter your phone number"
                            />
                            <InputField
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </InputWrapper>
                        <ButtonWrapper>
                            <CloseButton onClick={() => setShowBooking(false)}>Close</CloseButton>
                            <BookingButton onClick={handleBooking}>Confirm</BookingButton>
                        </ButtonWrapper>
                        {selectedImage === 'Homestay 1' ||
                            selectedImage === 'Homestay 2' ||
                            selectedImage === 'Homestay 3' ||
                            selectedImage === 'Homestay 4' ? <MapWrapper>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d993.5641770533502!2d118.28454839999998!3d5.0620872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x323f0b0edb05ddab%3A0xe614614ef1534af1!2sDarvel%20Bay%20Homestay!5e0!3m2!1sen!2smy!4v1721892187050!5m2!1sen!2smy"
                                width="600"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </MapWrapper> : <MapWrapper>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d993.6088883685034!2d118.3118181695802!3d5.032895735618385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x323f9fed96705f03%3A0xe494096278b3979b!2s4078%2C%20Jalan%20Tabanak%203%2C%2091100%20Lahad%20Datu%2C%20Sabah!5e0!3m2!1sen!2smy!4v1723639127864!5m2!1sen!2smy"
                                width="600"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </MapWrapper>}
                    </BookingWrapper>
                )}
            </HomePageWrapper>
            <ReviewsSection>
                {reviewsData.map((review, index) => (
                    <GuestReview key={index} author={review.author} text={review.text} />
                ))}
            </ReviewsSection>
        </>
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
    width: 85%;
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

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    position: relative;
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-top: 20px;
    flex-wrap: wrap; /* Allow the buttons to wrap onto a new line */

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;


const HouseButton = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 10px; /* Add space between buttons in column mode */

    &:hover {
        background-color: #0056b3;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
    }

    &:disabled {
        background-color: grey;
        cursor: not-allowed; /* Change cursor to indicate the button is not clickable */
    }

    @media (max-width: 768px) {
        width: 80%; /* Take up most of the width in smaller devices */
    }
`;



const ModalImage = styled.img`
    width: 300px;
    height: 200px;
    object-fit: cover;
    margin-bottom: 20px;
`;

const ModalButton = styled.button`
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
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    flex-wrap: wrap
    width: 400px;
    margin: 0 auto;
    animation: fadeInSlideIn 2s forwards;
    text-align: center;

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

const reviewsData = [
    { author: 'Arif', text: 'Amazing stay! Highly recommend.' },
    { author: 'Muhd Nuaim', text: 'Loved the environment, cold taking places when at dawn, even when the aircond is off' },
    { author: 'Aqilah', text: 'I like the environment and the host`s food, I really love the Nasi Kuning' },
    // Add more reviews as needed
];

export default HomePage;
