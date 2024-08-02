import axios from 'axios';
import Cookies from 'js-cookie';
import {
	handleRefreshToken,
	isTokenExpired,
} from '../Service/CheckToken/CheckToken';

const axiosConfig = axios.create({
	baseURL: 'http://localhost:3000',
});

axiosConfig.interceptors.request.use(function (config) {
	let token = Cookies.get('token');
	if (token) {
	
		if (!token || isTokenExpired(token)) {
			handleRefreshToken();
		}
		config.headers.Authorization = token ? `Bearer ${token}` : '';
	}
	return config;
});
export default axiosConfig;
