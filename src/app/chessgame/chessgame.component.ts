import { Component, OnInit } from '@angular/core';

import { ChessGame } from '../chess.js';

@Component({
  selector: 'chessgame',
  templateUrl: './chessgame.component.html',
  styleUrls: ['./chessgame.component.css']
})
export class ChessgameComponent implements OnInit {
  game: ChessGame;

  constructor() {
    this.game = new ChessGame();
  }

  ngOnInit() {
  }

}
