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
}
