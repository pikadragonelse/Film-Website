export interface Genres {
    genre_id: number,
    name:string,
}

export interface Actors {
    actor_id:number,
    name:string,
}

export interface Directors {
    director_id:number,
    name:string,
}

export interface Episodes{
    episodeId: number;
    movieId: number;
    episodeTitle: string;
    releaseDate: string;
    posterUrl: string;
    movieUrl: string;
    numView: string;
    duration: number;
    episodeNo: number;
    titleFilm?:string;
}

export type Film = {
    movieId: number,
    title: string, 
    description:string,
    releaseDate:string,
    nation:string,
    posterURL:string,
    trailerURL:string,
    averageRating:string,
    episodeNum:number,
    level:number,
    genres: Array<Genres>,
    actors: Array<Actors>,
    episodes:Array<Episodes>
}