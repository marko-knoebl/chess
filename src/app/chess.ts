function vectorEqual(vec0, vec1) {
  return vec0[0] === vec1[0] && vec0[1] === vec1[1];
}

function vectorAdd(vec0, vec1) {
  return [vec0[0] + vec1[0], vec0[1] + vec1[1]];
}

/*
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
      position: null
    }
  ]
}
 */

export class ChessGame {

  activePlayer: string;
  pieces: Piece[];

  constructor() {

    this.activePlayer = 'white';
    this.pieces = [];

    let backRow = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
    for (let i = 0; i < 8; i ++) {
      this.pieces.push(new Piece('white', backRow[i], [i, 0], i));
    }
    for (let i = 0; i < 8; i ++) {
      this.pieces.push(new Piece('white', 'pawn', [i, 1], i+8));
    }
    for (let i = 0; i < 8; i ++) {
      this.pieces.push(new Piece('black', backRow[i], [i, 7], i+16));
    }
    for (let i = 0; i < 8; i ++) {
      this.pieces.push(new Piece('black', 'pawn', [i, 6], i+24))
    }
  }

  getPieceByPosition(position) {
    for (let piece of this.pieces) {
      if (position[0] === piece.position[0] && position[1] === piece.position[1]) {
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

  canMove(piece, target) {
    let moveVector = [target[0] - piece.position[0], target[1] - piece.position[1]];

    if (moveVector[0] === 0 && moveVector[1] === 0) {
      return false;
    }

    if (piece.type === 'pawn' && piece.color === 'white') {
      if (moveVector[0] === 0) {
        if (moveVector[1] === 1) {
          return true;
        } else if (piece.position[1] === 1 && moveVector[1] === 2) {
          return true;
        } else {
          return false;
        }
      } else if (moveVector[0] === 1 || moveVector[0] === -1) {
        try {
          let targetPiece = this.getPieceByPosition(target);
          return targetPiece.color !== piece.color;
        } catch (e) {
          return true;
        }
      } else {
        return false;
      }
    }

    else if (piece.type === 'king') {
      let moves = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
      for (let possibility of moves) {
        if (vectorEqual(moveVector, possibility)) {
          try {
            let targetPiece = this.getPieceByPosition(target);
            return targetPiece.color !== piece.color;
          } catch (e) {
            return true;
          }
        }
      }
      return false;
    }

    else if (piece.type === 'knight') {
      let moves = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]];
      for (let possibility of moves) {
        if (vectorEqual(moveVector, possibility)) {
          try {
            let targetPiece = this.getPieceByPosition(target);
            return targetPiece.color !== piece.color;
          } catch (e) {
            return true;
          }
        }
      }
      return false;
    }

    else if (piece.type === 'rook') {
      if (moveVector[0] !== 0 && moveVector[1] !== 0) {
        return false;
      }
      let vectorLength = moveVector[0] + moveVector[1];
      let unitVector = [moveVector[0]/vectorLength, moveVector[1]/vectorLength];
      let tryPosition = piece.position.slice();
      for (let steps = 1; steps < vectorLength; steps ++) {
        tryPosition = vectorAdd(tryPosition, unitVector)
        if (!this.isPositionFree(tryPosition)) {
          return false;
        }
      }
      try {
        let targetPiece = this.getPieceByPosition(target);
        return targetPiece.color !== piece.color;
      } catch (e) {
        return true;
      }
    }
  }

  move(piece, target) {
    if (!this.canMove(piece, target)) {
      throw 'invalid move';
    }
    piece.position = target.slice();
  }
}

class Piece {

  color: string;
  type: string;
  position: [number, number];
  id: number;

  constructor(color, type, position, id) {
    this.color = color;
    this.type = type;
    // position: [col, row]
    this.position = position;
    this.id = id;
  }

  canMoveTo(target) {
    let moveVector = [target[0] - this.position[0], target[1] - this.position[1]];

    if (vectorEqual(moveVector, [1, 0])) {
      
    }

    if (this.type === 'pawn' && this.color === 'white') {
      // same column
      if (this.position[0] === target[0]) {
        if (this.position[1]+1 === target[1]) {
          return true;
        } else if (this.position[1] === 1 && target[1] === 3) {
          // TODO: check if free
          return true;
        }
      }
    }
  }

  moveTo(position) {
    this.position = position.slice();
  }
}
