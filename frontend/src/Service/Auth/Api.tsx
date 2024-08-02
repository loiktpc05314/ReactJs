import axios from '../../config/axiosConfig';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { handleRefreshToken, isTokenExpired } from '../CheckToken/CheckToken';
import { jwtDecode } from 'jwt-decode';

// login
export async function login(values) {
	try {
		const response = await axios.post('/auth/login', {
			email: values.email,
			password: values.password,
		});
		const data = response.data;
		console.log('check data', data);
		localStorage.setItem(
			'user',
			JSON.stringify([
				data._id,
				data.username,
				data.avatar,
				data.email,
				data.premium,
				data.hasFollow,
			]),
		);
		const token = response.data.accessToken;
		const refreshToken = response.data.refreshToken;
		// document.cookie = `token=${data.accessToken};max-age=${data.expiresIn};path=/`;
		Cookies.set('refreshToken', refreshToken);
		Cookies.set('token', token);

		return [token, refreshToken];
	} catch (error) {
		toast.error('Tên hoặc mật khẩu không đúng!!!');
		console.error('Error:', error.message);
	}
}

export async function getinfouser(id) {
	try {
		
		const response = await axios.get(`/users/${id}`);
		const data = response.data;
		return data.data;
	} catch (error) {
		console.error('Error:', error.message);
	}
}
export async function checkroleadmin() {
	try {
		let token = Cookies.get('token');
		const decodedToken: any = jwtDecode(token);
		const iduser = decodedToken.id;
		let res = await getinfouser(iduser);
		if(res.role=== 'admin') {
			return true;
		}else {
			return false;
		}
	} catch (error) {
		console.error('Error:', error.message);
	}
}
export async function forgotpassword(value) {
	try {
		const response = await axios.post(`/auth/forgot-password`,value);
		console.log('check res forgot', response);
		if(response.status === 500){
			toast.error('Email không tồn tại!!!');
		}else{
			return response
		}
	} catch (error) {
		console.error('Error:', error.message);
	}
}
export async function resetpassword(value , token) {
	try {
		console.log('ccheck token ',token);
		
		const response = await axios.post(`/auth/reset-password?token=${token}`,value);
		console.log('check res forgot', response);
		return response
	} catch (error) {
		console.error('Error:', error.message);
	}
}