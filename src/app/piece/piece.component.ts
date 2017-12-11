import { Component, Input, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']
})
export class PieceComponent implements OnInit {

  @Input() piece;
  @Input() active;

  symbols = {
    pawn: '♟',
    rook: '♜',
    knight: '♞',
    bishop: '♝',
    king: '♚',
    queen: '♛'
  };

  constructor() { }

  ngOnInit() {
  }

}
