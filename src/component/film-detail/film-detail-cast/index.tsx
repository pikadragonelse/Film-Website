import './index.scss';
interface Actors {
    actor_id: number;
    name: string;
    character: string;
    image: string;
}

interface FilmDetailCastProps {
    filmDetail: {
        actors: Actors[];
    };
}

export const FilmDetailCast: React.FC<FilmDetailCastProps> = ({ filmDetail }) => {
    const actors = filmDetail.actors || [];
    return (
        <div className="actor text-base mt-2 ml-3">
            <ul className="grid grid-cols-4 gap-x-32 gap-y-12 ml-[-10px] mt-6">
                {actors.map((actor) => (
                    <li key={actor.actor_id} className="flex gap-3 items-center">
                        <div className="shrink-0 max-w-[60px]  h-[65px]">
                            <img
                                className="object-cover w-[60px] h-[60px] rounded-full"
                                src={actor.image}
                                alt={actor.name}
                            />
                        </div>
                        <div className="flex-grow">
                            <p className="actor-name font-medium">{actor.name}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
