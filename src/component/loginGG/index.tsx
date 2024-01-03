import React, { useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { request } from '../../utils/request';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

interface GoogleAuthData {
    code: string;
    scope?: string | null;
    authuser?: string | null;
    prompt?: string | null;
}

const LoginGG = () => {
    const navigate = useNavigate();
    const fetchData = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const authData: GoogleAuthData = {
            code: urlParams.get('code') || '',
            scope: urlParams.get('scope'),
            authuser: urlParams.get('authuser'),
            prompt: urlParams.get('prompt'),
        };

        const encodedParams = new URLSearchParams();
        Object.entries(authData).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                encodedParams.append(key, value);
            }
        });
        console.log(`https://movies-app.me/api/auth/google/callback?${encodedParams.toString()}`);

        if (authData) {
            try {
                const response: AxiosResponse<{ token: string }> = await axios.get(
                    `https://movies-app.me/api/auth/google/callback?${encodedParams.toString()}`,
                );
                let refreshToken = response.data.token;
                request
                    .post('/auth/get-access-token', { refreshToken: refreshToken })
                    .then((res) => {
                        let accessToken = JSON.stringify(res.data.result.token.accessToken);
                        Cookies.set('accessToken', accessToken, { expires: 1 });
                        console.log('Refresh Token');
                        navigate('/');
                    })
                    .catch((err) => {
                        console.log('Error refresh');

                        console.log(err);
                        if (err.response.status === 401) {
                            Cookies.remove('accessToken');
                        }
                    });
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            console.log('Authorization code not found.');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return <div style={{ height: '180px' }}></div>;
};

export default LoginGG;
