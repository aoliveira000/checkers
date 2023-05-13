import {Props as PieceProperties, color as PieceColor} from "../components/Piece";

export type Move = {
    origin: number
    destination: number
    captures: number[]
}

export interface Position {
    x: number,
    y: number
}

export interface GameState {
    pieces: PieceProperties[],
    currentPlayer : PieceColor,
    highlights: Position[],
    pieceSelected: PieceProperties | undefined,
    moves: Move[],
    numberOfPlayers: 1|2
}