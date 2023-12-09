import { useState, useEffect } from 'react';
import Slide from '../../component/slide';
import { request } from '../../utils/request';
import { ListFilm } from '../../component/list-film';
import { Film } from '../../model/film';
import './index.scss';

export const HomePage = () => {
    const [homePageData, setHomePageData] = useState<Film[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await request.get('movies?', {
                    params: {
                        // isSeries: true,
                        page: 1,
                        pageSize: 100,
                    },
                });

                const data = response.data.movies;
                setHomePageData(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <Slide />
            <div className="container-home"></div>
            <ListFilm title="Phim liên quan" listFilm={homePageData} />
            <ListFilm title="Hài hước" listFilm={homePageData} />
            <ListFilm title="Phim mới nhất" listFilm={homePageData} />
        </div>
    );
};
