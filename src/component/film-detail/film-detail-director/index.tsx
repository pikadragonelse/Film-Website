import { Link } from 'react-router-dom';
import React from 'react';
import './index.scss';
interface Directors {
    director_id: number;
    name: string;
    character: string;
    avatar: string;
}

interface FilmDetailDirectorProps {
    filmDetail: {
        directors: Directors[];
    };
}

export const FilmDetailDirector: React.FC<FilmDetailDirectorProps> = ({ filmDetail }) => {
    const directors = filmDetail.directors || [];

    return (
        <div className="director text-base mt-8 ml-3">
            <ul className="grid grid-cols-5 gap-x-36 gap-y-12 ml-[-10px] mt-6">
                {directors.map((director) => (
                    <Link to="/director" key={director.director_id}>
                        <li className="flex gap-3 items-center">
                            <div className="shrink-0 max-w-[60px]  h-[65px]">
                                <img
                                    className="object-cover w-[60px] h-[60px] rounded-full"
                                    src={director.avatar}
                                    alt={director.name}
                                />
                            </div>
                            <div className="flex-grow">
                                <p className="director-name font-medium">{director.name}</p>
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};
