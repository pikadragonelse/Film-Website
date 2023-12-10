import { useState, useEffect } from 'react';
import Slide from '../../component/slide';
import { request } from '../../utils/request';
import { ListFilm } from '../../component/list-film';
import { Film } from '../../model/film';
import './index.scss';

export const HomePage = () => {
    const [trendingData, setTrendingData] = useState<Film[]>([]);
    const fetchTrending = async () => {
        try {
            const response = await request.get('movies/home/trending?', {
                params: {
                    page: 1,
                    pageSize: 1,
                },
            });
            const data = response.data;
            setTrendingData(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTrending();
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
            <ListFilm title="Phim thịnh hành" listFilm={trendingData} />
            {/* <ListFilm title="Hài hước" listFilm={homePageData} />
            <ListFilm title="Phim mới nhất" listFilm={homePageData} /> */}
        </div>
    );
};
