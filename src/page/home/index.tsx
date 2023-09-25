import React from 'react';
import Slide from '../../component/slide';

import FilmList from '../../component/film-list';
import { LayoutUser } from '../../component/layout-user';
export const HomePage = () => {
    return (
        <div>
            <Slide />
            <FilmList />
            {/* <LayoutUser /> */}
        </div>
    );
};
