import React from 'react';
import './app.scss';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Route, Routes } from 'react-router-dom';
import { Header } from './component/header';
import { Footer } from './component/footer';
import { SearchPage } from './page/search';
import { WatchingPage } from './page/watching';
import { HomePage } from './page/home/index';
import { LayoutUser } from './page/layout-user';
import { Register } from './component/register';
import { Login } from './component/login';
import { Payment } from './component/payment';

export const App = () => {
    return (
        <Provider store={store}>
            <div className="wrapper">
                <Header />
                <Routes>
                    <Route path="" element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/watching" element={<WatchingPage />} />
                    <Route path="/foryou" element={<LayoutUser />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/payment" element={<Payment />} />
                </Routes>
                <Footer />
            </div>
        </Provider>
    );
};
