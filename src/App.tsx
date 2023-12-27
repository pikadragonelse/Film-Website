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
import { Actor } from './component/actor';
import { NewPassword } from './component/new-password';
import { LoginForget } from './component/forget-password';

const locationMap: Record<string, string> = {
    '/VIPpackage': 'hidden',
    '/payment': 'hidden',
    '/bill': 'hidden',
    '/newpassword': 'hidden',
};

export const App = () => {
    const location = useLocation();

    return (
        <Provider store={store}>
            <div className="wrapper">
                <Header className={`${locationMap[location.pathname]}`} />

                <div className="wrapper-app-container">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/search/*" element={<SearchPage />} />
                        <Route path="/movie/:movieId/:episodeId" element={<WatchingPage />} />
                        <Route path="/foryou/*" element={<LayoutUser />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/payment/:idPackage/*" element={<Payment />} />
                        <Route path="/VIPpackage" element={<VIPPackage />} />
                        <Route path="/bill" element={<Bill />} />
                        <Route path="/director/:directorId" element={<Director color="white" />} />
                        <Route path="/actor/:actorId" element={<Actor color="white" />} />
                        <Route path="/movie/:id" element={<FilmDetail />} />
                        <Route path="/newpassword" element={<NewPassword />} />
                        <Route path="/forget" element={<LoginForget />} />
                    </Routes>
                </div>

                <Footer />
            </div>
        </Provider>
    );
};
