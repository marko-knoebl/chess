import { Component, OnInit } from '@angular/core';

import { ChessGame } from '../chess.js';

@Component({
  selector: 'chess',
  templateUrl: './chess.component.html',
  styleUrls: ['./chess.component.css']
})
export class ChessComponent implements OnInit {
  game: ChessGame;

  constructor() {
    this.game = new ChessGame();
  }

  ngOnInit() {
  }

  someMovement() {
    this.game.move(this.game.getPieceByPosition([0, 1]), [0, 3]);
    this.game.move(this.game.getPieceByPosition([0, 0]), [0, 2]);
    setTimeout( () => this.game.move(this.game.getPieceByPosition([0, 2]), [1, 2]), 1000);
    setTimeout( () => this.game.move(this.game.getPieceByPosition([1, 2]), [1, 6]), 2000);
    setTimeout( () => this.game.move(this.game.getPieceByPosition([1, 0]), [2, 2]), 3000);
    setTimeout( () => this.game.move(this.game.getPieceByPosition([1, 7]), [2, 5]), 3000);
    setTimeout( () => this.game.move(this.game.getPieceByPosition([2, 5]), [3, 3]), 4000);
  }

}
