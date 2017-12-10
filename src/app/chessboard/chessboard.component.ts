import { Component, Input, OnInit } from '@angular/core';

import { ChessGame } from '../chess';

@Component({
  selector: 'chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.css']
})
export class ChessboardComponent implements OnInit {

  squareColors: Array<Array<string>> = [];

  @Input() game: ChessGame;

  constructor() {
    for (let c = 0; c < 8; c ++) {
      let col = [];
      for (let r = 0; r < 8; r ++) {
        col.push((r+c)%2 ? 'black' : 'white');
      }
      this.squareColors.push(col);
    }
  }

  ngOnInit() {
  }

  onClick(i, j) {
    if (!this.game.activePiece) {
      this.game.activePiece = this.game.getPieceByPosition([i, j]);
    } else {
      this.game.move(this.game.activePiece, [i, j]);
    }
  }

}
