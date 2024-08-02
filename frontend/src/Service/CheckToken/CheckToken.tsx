import axios from '../../config/axiosConfig';
import { jwtDecode, JwtPayload } from "jwt-decode";
import Cookies from 'js-cookie'

// kiểm tra token hết hạn
export const isTokenExpired = (token) => {
    if (!token) return true;
    
    const decodedToken : any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
   
};
//  RefreshToken
export const handleRefreshToken = async () => {
    try {
        const response = await axios.post('/auth/refresh-token');
        const accessToken = response.data.accessToken;
       
       const refreshToken = response.data.refreshToken
       Cookies.set('refreshToken', refreshToken)
       Cookies.set('token', accessToken)
       return [accessToken, refreshToken];
    } catch (error) {
        console.error('Failed to refresh token', error);
        return null;
    }
};

