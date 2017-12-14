import { Component, Input, OnInit } from '@angular/core';

import { ChessGame } from '../chess.js';

@Component({
  selector: 'chessboard-view',
  templateUrl: './chessboard-view.component.html',
  styleUrls: ['./chessboard-view.component.css']
})
export class ChessboardViewComponent implements OnInit {
  @Input() game: ChessGame;

  constructor() {
  }

  ngOnInit() {
  }
}
