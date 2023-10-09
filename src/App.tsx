import { Provider } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import './app.scss';
import { Director } from './component/director';
import { FilmDetail } from './component/film-detail';
import { Footer } from './component/footer';
import { Header } from './component/header';
import { Login } from './component/login';
import { Register } from './component/register';
import { Bill } from './page/bill';
import { HomePage } from './page/home/index';
import { LayoutUser } from './page/layout-user';
import { Payment } from './page/payment';
import { SearchPage } from './page/search';
import { VIPPackage } from './page/vip-package';
import { WatchingPage } from './page/watching';
import { store } from './redux/store';

const locationMap: Record<string, string> = {
    '/VIPpackage': 'hidden',
    '/payment': 'hidden',
    '/bill': 'hidden',
};

export const App = () => {
    const location = useLocation();
    console.log(location.pathname);

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
                    <Route
                        path="/director"
                        element={<Director color="white" />}
                    />
                    <Route path="/movie/:id" element={<FilmDetail />} />
                </Routes>
                <Footer />
            </div>
        </Provider>
    );
};
