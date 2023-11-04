import { Link } from 'react-router-dom';

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
        character: 'Sylvie The Variant',
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
];

export const FilmDetailDirector = () => {
    return (
        <div className="text-base mt-2 ml-3">
            <ul className="grid grid-cols-4 gap-x-32 gap-y-12 ml-[-10px] mt-6">
                {actors.map((actor) => (
                    <Link to="/director">
                        <li key={actor.id} className="flex gap-3 items-center">
                            <div className="shrink-0 max-w-[60px]  h-[65px]">
                                <img
                                    className="object-cover w-[60px] h-[60px] rounded-full"
                                    src={actor.image}
                                    alt={actor.name}
                                />
                            </div>
                            <div className="flex-grow">
                                <p
                                    className="font-medium"
                                    style={{
                                        color: 'var(--contrast-color)',
                                        fontSize: '1.1rem',
                                    }}
                                >
                                    {actor.name}
                                </p>
                                <p className="text-base" style={{ color: '#989898' }}>
                                    <span className="italic">as</span> {actor.character}
                                </p>
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};
