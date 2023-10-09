import React from 'react';

const actors = [
    {
        id: 1,
        name: 'Lee Byung-Hun',
        character: 'Loki Laufeyson',
        image: 'https://image.tmdb.org/t/p/w185/mclHxMm8aPlCPKptP67257F5GPo.jpg',
    },
    {
        id: 2,
        name: 'Song Kang-Ho',
        character: 'Hunter B-15',
        image: 'https://image.tmdb.org/t/p/w185/mWDsVCo9sBcekrsjUTsoCFLhtYt.jpg',
    },
    {
        id: 3,
        name: 'Andy Lau',
        character: 'Sylvie / The Variant',
        image: 'https://image.tmdb.org/t/p/w185/qZdFp18btpQJfDoknxr7DgfRpcB.jpg',
    },
    {
        id: 4,
        name: 'Tony Leung',
        character: 'Ouroboros OB',
        image: 'https://image.tmdb.org/t/p/w185/waruLSR8lXBjhAFL0J6ihuVY62d.jpg',
    },
    {
        id: 5,
        name: 'Lee Byung-Hun',
        character: 'Loki Laufeyson',
        image: 'https://image.tmdb.org/t/p/w185/5PfYVcNLs1gGKIo0qwJrvyc2UOZ.jpg',
    },
    {
        id: 6,
        name: 'Song Kang-Ho',
        character: 'Hunter B-15',
        image: 'https://image.tmdb.org/t/p/w185/9PaSpVV6aU3rtFXG7oOpnEu92gv.jpg',
    },
];

export const FilmDetailCast = () => {
    return (
        <div className="text-base">
            <ul className="grid grid-cols-2 gap-x-80 gap-y-6 ml-[-20px]">
                {actors.map((actor) => (
                    <li key={actor.id} className="flex gap-3 items-center">
                        <div className="shrink-0 max-w-[60px] w-full h-[65px]">
                            <img
                                className="object-cover w-[50px] h-[50px] rounded-full"
                                src={actor.image}
                                alt={actor.name}
                            />
                        </div>
                        <div className="flex-grow">
                            <p
                                className="font-medium"
                                style={{
                                    color: 'var(--primary-color)',
                                    fontSize: '1.1rem',
                                }}
                            >
                                {actor.name}
                            </p>
                            <p className="text-white text-base">
                                <span className="italic">as</span>{' '}
                                {actor.character}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
