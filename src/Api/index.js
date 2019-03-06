import axios from 'axios';
import { baseURL, timeout } from './config';

export default axios.create({
    baseURL,
    timeout
})