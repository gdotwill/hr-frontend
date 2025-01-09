import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' ? 'https://hr-backend-eight.vercel.app/api/clients' : 'http://localhost:3000/api/clients';

export default axios.create({
    baseURL,
});