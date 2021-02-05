import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Game } from 'src/app/interfaces/interfaces';
import { GameService } from 'src/app/services/game.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  resultados: any[] = []
  loading = true;
  subs: Subscription
  constructor(private gameService: GameService) { }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {

    const source = interval(2000);
    this.subs = source.subscribe(() => {
      this.loading = true;

      this.gameService.getGames()
      .pipe(
        map( (res: Game[]) => res.map( ({name, votes}) => ({name, value: votes}) ))
      ).subscribe( next => {
        // console.log(next);
        this.resultados = [...next];
        this.loading = false;
      });
      
    });
  }



}
