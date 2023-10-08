import React, { useEffect } from 'react';
import './app.scss';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import { Header } from './component/header';
import { Footer } from './component/footer';
import { SearchPage } from './page/search';
import { WatchingPage } from './page/watching';
import { HomePage } from './page/home/index';
import { LayoutUser } from './page/layout-user';
import { Register } from './component/register';
import { Login } from './component/login';

import { Payment } from './page/payment';
import { VIPPackage } from './page/vip-package';
import { Bill } from './page/bill';
import axios from 'axios';

const locationMap: Record<string, string> = {
    '/VIPpackage': 'hidden',
    '/payment': 'hidden',
    '/bill': 'hidden',
};

export const App = () => {
    const location = useLocation();

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/movies/all', {
                // headers: {
                //     'Content-Type': 'application/json',
                // },
            })
            .then((response) => console.log(response))
            .catch((error) => console.error(error));

        // fetch('http://localhost:8080/api/movies/all', {
        //     method: 'GET', // *GET, POST, PUT, DELETE, etc.
        //     mode: 'cors', // no-cors, *cors, same-origin
        //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //     credentials: 'same-origin', // include, *same-origin, omit
        //     headers: {
        //         'Content-Type': 'application/json',
        //         // 'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        // })
        //     .then((response) => console.log(response))
        //     .catch((error) => console.error(error));
    }, []);

    return (
        <Provider store={store}>
            <div className="wrapper">
                <Header className={`${locationMap[location.pathname]}`} />
                <Routes>
                    <Route path="" element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/watching" element={<WatchingPage />} />
                    <Route path="/foryou" element={<LayoutUser />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/VIPpackage" element={<VIPPackage />} />
                    <Route path="/bill" element={<Bill />} />
                </Routes>
                <Footer />
            </div>
        </Provider>
    );
};
