import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { request } from '../../utils/request';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { endpoint } from '../../utils/baseUrl';
import { notification } from 'antd';

const ActiveUser = () => {
    const navigate = useNavigate();

    const fetchData = async () => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const token = urlSearchParams.get('token') || '';
        const email = urlSearchParams.get('email') || '';
        const data = {
            identifier: email,
            token: token,
        };
        axios
            .post(`${endpoint}/api/auth/active-user`, data)
            .then((response) => {
                if (response.data.status == 'Ok!') {
                    navigate('/login');
                }
            })
            .catch(function (err) {
                console.error(err);
                notification.info({
                    message: 'Kiểm tra email',
                    description: 'Hãy đảm bảo rằng bạn đã xác nhận tài khoản.',
                });
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return <div style={{ height: '180px' }}></div>;
};

export default ActiveUser;
