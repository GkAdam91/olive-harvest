import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://olive-harvest.firebaseio.com/'
});


export default instance;
     