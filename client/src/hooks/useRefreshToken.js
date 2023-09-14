import axios from 'axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            return { 
                ...prev, 
                accessToken: response.data.accessToken,
                userId: response.data.user.id,
                firstName: response.data.user.firstName,
                lastName: response.data.user.lastName,
                color: response.data.user.color
            }
        });
        return response.data.accessToken;
    }
    return refresh;
}

export default useRefreshToken;