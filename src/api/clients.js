import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' ? 'https://hr-c.vercel.app/api/clients' : 'http://lhost:3000/api/clients';

export default axios.create({
    baseURL,
});