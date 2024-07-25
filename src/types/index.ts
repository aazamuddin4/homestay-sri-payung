export interface Homestay {
    id: number;
    name: string;
    location: string;
    price: number;
    availability: boolean;
}

export interface Booking {
    id: number;
    homestayId: number;
    userId: number;
    startDate: string;
    endDate: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
}
