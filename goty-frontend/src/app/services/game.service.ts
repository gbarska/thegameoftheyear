import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Game } from '../interfaces/interfaces';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})

export class GameService {

  games: Game[] = [];

  constructor(private http: HttpClient) { }

  getGames(){

    // if (this.games.length > 0){
    //   return of(this.games);
    // } else {

      return this.http.get(`${base_url}?pageIndex=0&pageSize=10`).pipe(
        map( (res: any) => {
          this.games = [...res.games];
          return res.games;
        })
      );
    // }
}

voteGame(id: string){
  return this.http.post(`${base_url}/${id}`,{});
}

}
