function vectorEqual(vec0, vec1) {
  return vec0[0] === vec1[0] && vec0[1] === vec1[1];
}

function vectorAdd(vec0, vec1) {
  return [vec0[0] + vec1[0], vec0[1] + vec1[1]];
}

function vectorSubtract(vec0, vec1) {
  return [vec0[0] - vec1[0], vec0[1] - vec1[1]];
}

/* data structure:
{
  activePlayer: 'white',
  activePiece: 4,
  pieces: [
    {
      id: 0,
      color: 'white',
      type: 'rook',
      position: [0, 0]
    },
    {
      id: 1,
      color: 'white',
      type: 'knight',
      position: [1, 0]
    },
    {
      id: 2
      color: 'white',
      type: 'bishop',
      position: [null, null],
      out: true
    }
  ]
}
 */

export class ChessGame {

  activePlayer: string;
  activePiece: Piece;
  pieces: Piece[];

  constructor() {

    this.activePlayer = 'white';
    this.pieces = [];

    let backRow = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
    for (let i = 0; i < 8; i++) {
      this.pieces.push(new Piece('white', backRow[i], [i, 0], i));
    }
    for (let i = 0; i < 8; i++) {
      this.pieces.push(new Piece('white', 'pawn', [i, 1], i + 8));
    }
    for (let i = 0; i < 8; i++) {
      this.pieces.push(new Piece('black', backRow[i], [i, 7], i + 16));
    }
    for (let i = 0; i < 8; i++) {
      this.pieces.push(new Piece('black', 'pawn', [i, 6], i + 24))
    }
  }

  getPieceByPosition(position) {
    for (let piece of this.pieces) {
      if (vectorEqual(position, piece.position)) {
        return piece;
      }
    }
    throw 'piece not found';
  }

  isPositionFree(position) {
    try {
      this.getPieceByPosition(position);
      return false;
    } catch (e) {
      return true;
    }
  }

  canJumpTo(target, color) {
    // checks whether a piece of a specific color can jump to a specific position
    // this does not do any checks along the way
    if (this.isPositionFree(target)) {
      return true;
    }
    if (this.getPieceByPosition(target).color !== color) {
      console.log(this.getPieceByPosition(target).color);
      console.log(color);
      return true;
    }
    return false;
  }

  canCapture(target, color) {
    // checks whether a piece of a specific color can jump-capture a specific position
    // this does not do any checks along the way
    return !this.isPositionFree(target) && this.getPieceByPosition(target).color !== color;
  }

  canMoveStraight(position, target) {
    // checks whether the path to a certain target is free
    // does not check whether the target is occupied by a piece
    let moveVector = vectorSubtract(target, position);
    if (moveVector[0] !== 0 && moveVector[1] !== 0) {
      return false;
    }
    if (moveVector[0] === 0 && moveVector[1] === 0) {
      return false;
    }
    let vectorLength = Math.abs(moveVector[0]) + Math.abs(moveVector[1]);
    let unitVector = [moveVector[0] / vectorLength, moveVector[1] / vectorLength];
    let tryPosition = position.slice();
    for (let step = 1; step < vectorLength; step++) {
      tryPosition = vectorAdd(tryPosition, unitVector);
      if (!this.isPositionFree(tryPosition)) {
        return false;
      }
    }
    return true;
  }

  canMoveDiagonally(position, target) {
    // checks whether the path to a certain target is free
    // does not check whether the target is occupied by a piece
    let moveVector = vectorSubtract(target, position);
    if (Math.abs(moveVector[0]) !== Math.abs(moveVector[1]) || moveVector[0] === 0) {
      return false;
    }
    let vectorLength = Math.abs(moveVector[0]);
    let unitVector = [Math.sign(moveVector[0]), Math.sign(moveVector[1])];
    let tryPosition = position.slice();
    for (let steps = 1; steps < vectorLength; steps++) {
      tryPosition = vectorAdd(tryPosition, unitVector);
      if (!this.isPositionFree(tryPosition)) {
        return false;
      }
    }
    return true;
  }

  canMove(piece, target) {
    let moveVector = [target[0] - piece.position[0], target[1] - piece.position[1]];

    if (moveVector[0] === 0 && moveVector[1] === 0) {
      return false;
    }

    if (piece.type === 'pawn') {
      // non-capturing move
      if (moveVector[0] === 0) {
        if (piece.color === 'white' && moveVector[1] === 1) {
          return this.isPositionFree(target);
        } else if (piece.color === 'black' && moveVector[1] === -1) {
          return this.isPositionFree(target);
        } else if (piece.color === 'white' && moveVector[1] === 2) {
          return this.canMoveStraight(piece.position, target) && this.isPositionFree(target);
        } else if (piece.color === 'black' && moveVector[1] === -2) {
          return this.canMoveStraight(piece.position, target) && this.isPositionFree(target);
        } else {
          return false;
        }
      }
      // capturing move
      else if (Math.abs(moveVector[0]) === 1 && (
        piece.color === 'white' && moveVector[1] === 1 ||
        piece.color === 'black' && moveVector[1] === -1)) {
        return this.canCapture(target, piece.color);
      }
      return false;
    }

    else if (piece.type === 'king') {
      let moves = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
      for (let possibleMoveVector of moves) {
        if (vectorEqual(moveVector, possibleMoveVector) && this.canJumpTo(target, piece.color)) {
          return true;
        }
      }
      return false;
    }

    else if (piece.type === 'knight') {
      let moves = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]];
      for (let possibleMoveVector of moves) {
        if (vectorEqual(moveVector, possibleMoveVector) && this.canJumpTo(target, piece.color)) {
          return true;
        }
      }
      return false;
    }

    else if (piece.type === 'rook') {
      return (this.canJumpTo(target, piece.color) &&
        this.canMoveStraight(piece.position, target));
    }

    else if (piece.type === 'bishop') {
      return (this.canJumpTo(target, piece.color) &&
        this.canMoveDiagonally(piece.position, target));
    }

    else if (piece.type === 'queen') {
      return (this.canJumpTo(target, piece.color) &&
        (this.canMoveStraight(piece.position, target) ||
          this.canMoveDiagonally(piece.position, target)));
    }
  }

  move(piece, target) {
    if (!this.canMove(piece, target)) {
      throw 'invalid move';
    }
    this.capture(target);
    piece.position = target.slice();
    this.activePiece = null;
  }

  capture(target) {
    // capture any piece at the target
    try {
      let piece = this.getPieceByPosition(target);
      piece.out = true;
      piece.position = [null, null];
    } catch (e) {
     // do nothing
    }
  }

  isPieceActive(piece) {
    return this.activePiece && vectorEqual(this.activePiece.position, piece.position);
  }
}

class Piece {

  color: string;
  type: string;
  position: [number, number];
  id: number;
  out: boolean = false;

  constructor(color, type, position, id) {
    this.color = color;
    this.type = type;
    // position: [col, row]
    this.position = position;
    this.id = id;
  }
}
