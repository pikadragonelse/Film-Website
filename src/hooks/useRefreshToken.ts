import Cookies from 'js-cookie';
import { request } from '../utils/request';
import { useToken } from './useToken';

export const useRefreshToken = () => {
    const { accessToken } = useToken();
    if (accessToken !== '' && accessToken != null) {
        const refreshToken = Cookies.get('refreshToken')?.replace(/^"(.*)"$/, '$1') || '';
        request
            .post('/auth/get-access-token', { refreshToken: refreshToken })
            .then((res) => {
                let accessToken = JSON.stringify(res.data.result.token.accessToken);
                Cookies.set('accessToken', accessToken, { expires: 1 });
                console.log('Refresh Token');
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    Cookies.remove('accessToken');
                }
            });
    }
};
