import React from "react";
import "./app.scss";
import { Route, Routes } from "react-router-dom";
import { Header } from "./component/header";
import { Footer } from "./component/footer";
import { Home } from "./page/home";
import { Search } from "./page/search";

export const App = () => {
    return (
        <div className="wrapper">
            <Header />
            <Routes>
                <Route path="" element={<Home />} />
                <Route path="/search" element={<Search />} />
            </Routes>
            <Footer />
        </div>
    );
};
