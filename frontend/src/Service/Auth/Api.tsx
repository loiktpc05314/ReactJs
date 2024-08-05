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
        
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        
       
        const decodedToken = jwtDecode(accessToken);
        const userId = decodedToken.id;

     
        const userInfo = await getinfouser(userId);

      
        localStorage.setItem('user', JSON.stringify(userInfo));
        
       
        Cookies.set('refreshToken', refreshToken);
        Cookies.set('token', accessToken);

        return [accessToken, refreshToken];
    } catch (error) {
        toast.error('Tên hoặc mật khẩu không đúng!!!');
        console.error('Error:', error.message);
    }
}

export async function getinfouser(id) {
	try {
		
		const response = await axios.get(`/users/${id}`);
		const data = response.data.data;
		return data;
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
		const response = await axios.post(`/auth/reset-password?token=${token}`,value);
		console.log('check res forgot', response);
		return response
	} catch (error) {
		console.error('Error:', error.message);
	}
}

export function isLogin() {
	const token = Cookies.get('token');
	if (token) {
		return true;
	} else {
		return false;
	}
}