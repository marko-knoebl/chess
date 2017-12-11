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
    for (let c = 0; c < 8; c++) {
      let col = [];
      for (let r = 0; r < 8; r++) {
        col.push((r + c) % 2 ? 'white' : 'black');
      }
      this.squareColors.push(col);
    }
  }

  ngOnInit() {
  }

  onClick(position: [number, number]) {
    let clickedPiece;
    try {
      clickedPiece = this.game.getPieceByPosition(position);
    } catch (e) {
      // clicked on empty spot - try to move there if there is an active piece
      if (this.game.activePiece) {
        this.game.move(this.game.activePiece, position);
      }
      return;
    }
    // clicked on a piece
    if (clickedPiece.color === this.game.activePlayer) {
      this.game.activatePiece(clickedPiece);
    } else if (this.game.activePiece) {
      this.game.move(this.game.activePiece, position);
    }
  }
}
