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
    episode_id:number,
    episode_no:number,
    movie_url:string,
    episodeTitle:string,
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