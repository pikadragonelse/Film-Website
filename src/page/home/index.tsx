import { useState, useEffect } from 'react';
import Slide from '../../component/slide';
import { request } from '../../utils/request';
import { ListFilm } from '../../component/list-film';
import { Film } from '../../model/film';

export const HomePage = () => {
    const [homePageData, setHomePageData] = useState<Film[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await request.get('movies?', {
                    params: {
                        isSeries: 'true',
                        page: 1,
                        pageSize: 6,
                    },
                });
                const data = response.data;
                setHomePageData(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <Slide />
            <ListFilm title="Phim liên quan" listFilm={homePageData} />
            {/* <FilmList /> */}
        </div>
    );
};
