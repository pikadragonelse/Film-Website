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

}

export type Film = {
    movieID: number,
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