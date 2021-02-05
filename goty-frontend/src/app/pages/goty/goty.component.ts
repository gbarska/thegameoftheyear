import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/interfaces/interfaces';
import { GameService } from 'src/app/services/game.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styleUrls: ['./goty.component.scss']
})
export class GotyComponent implements OnInit {

  games: Game[] = []

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.getGames().subscribe(res => {
      // console.log('resultado', res);
      this.games = res;
    });
  }


  votargame(game: Game){
    this.gameService.voteGame(game.id).subscribe((res:any) => {
      Swal.fire('Thanks', res.mensaje, 'success');
    },err => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }
}
