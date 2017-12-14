import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ChessboardViewComponent } from './chessboard-view/chessboard-view.component';
import { ChessboardComponent } from './chessboard/chessboard.component';
import { PieceComponent } from './piece/piece.component';
import { ChessgameComponent } from './chessgame/chessgame.component';


@NgModule({
  declarations: [
    AppComponent,
    ChessboardViewComponent,
    ChessboardComponent,
    PieceComponent,
    ChessgameComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
