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
import { LayoutUser } from './component/layout-user';
import { Payment } from './page/payment';

export const App = () => {
    return (
        <Provider store={store}>
            {/* <div className="wrapper">
                <Header />
                <Routes>
                    <Route path="" element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/watching" element={<WatchingPage />} />
                    <Route path="/foryou" element={<LayoutUser />} />
                </Routes>
                <Footer />
            </div> */}
            <div className="wrapper-heared">
                <Payment />
            </div>
        </Provider>
    );
};
