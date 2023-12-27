import Cookies from 'js-cookie';

export interface TokenObject {
    exp: number;
    iat: number;
    role: number;
    subscriptionTypeId: number;
    userId: number;
    username: string;
    accessToken: string;
    refreshToken: string;
}

export const useToken = () => {
    const accessToken = Cookies.get('accessToken')?.replace(/^"(.*)"$/, '$1') || '';
    const refreshToken = Cookies.get('refreshToken')?.replace(/^"(.*)"$/, '$1') || '';

    const tokenObject: TokenObject = JSON.parse(atob(accessToken.split('.')[1]));
    tokenObject['accessToken'] = accessToken;
    tokenObject['refreshToken'] = refreshToken;

    return tokenObject;
};
