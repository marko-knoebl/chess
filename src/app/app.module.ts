import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ChessComponent } from './chess/chess.component';
import { ChessboardComponent } from './chessboard/chessboard.component';
import { PieceComponent } from './piece/piece.component';


@NgModule({
  declarations: [
    AppComponent,
    ChessComponent,
    ChessboardComponent,
    PieceComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
