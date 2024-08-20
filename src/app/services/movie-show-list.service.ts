import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class MovieShowListService {
  constructor(private _HttpClient:HttpClient,private _activatedRoute:ActivatedRoute) {
    
   }
   updatePage:BehaviorSubject<any>=new BehaviorSubject(null);
  showMovies():Observable<any>{
   return this._HttpClient.get('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc')
  }
  video(movieId:number):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`)
  }
  popularShowsNowTv():Observable<any>{
    return this._HttpClient.get('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc')
  }
  getExternalId(movieId:Number):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/movie/${movieId}/external_ids`)
  }
  getDetailsById(movieExId:number):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/find/${movieExId}?external_source=imdb_id`)
  }
  getRecommendation(movieId:number):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations`)
  }
  getMovieCredits(movieId:number):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`)
  }
  getMovieTrailer(movieId:number):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`);
  }
  getMoreLikeThis(movieId:number):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/movie/${movieId}/similar`);
  }
  getTrendingTVShows():Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/trending/tv/week`)
  }
  getActorDetails(personId:number):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/person/${personId}`);
  }
  getActorMovies(personId:number):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/person/${personId}/movie_credits`);
  }
  getTVDetails(series_id:number):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/tv/${series_id}`);
  }
  getTVSeasons(series_id:number,season_number:number):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}`);
  }
  getEpisode(series_id:number,season_number:number,episode_number:number):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}/episode/${episode_number}`);
  }
  getTVShowVideos(series_id:number):Observable<any>{
    return this._HttpClient.get(`https://api.themoviedb.org/3/tv/${series_id}/videos`);
  }
  getData(data:any):void{
    this.updatePage.next(data);
  }
  
  
}
