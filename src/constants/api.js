
import axios from 'axios'

const api = axios.create({
 baseURL: 'https://chitragrand.unitdtechnologies.com:2078',
// baseURL: 'http://localhost:6007',

});

export default api