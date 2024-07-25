import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.example.com',
});

export const getHomestays = async () => {
    const response = await api.get('/homestays');
    return response.data;
};

export const getBooking = async (id: number) => {
    const response = await api.get(`/booking/${id}`);
    return response.data;
};

export default api;
