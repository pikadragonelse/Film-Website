import React from 'react';
import './app.scss';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Route, Routes } from 'react-router-dom';
import { Header } from './component/header';
import { Footer } from './component/footer';
import { HomePage } from './page/home';
import { SearchPage } from './page/search';
import { WatchingPage } from './page/watching';

export const App = () => {
    return (
        <Provider store={store}>
            <div className="wrapper">
                <Header />
                <Routes>
                    <Route path="" element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/watching" element={<WatchingPage />} />
                </Routes>
                <Footer />
            </div>
        </Provider>
    );
};
