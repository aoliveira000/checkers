import { MouseEventHandler } from "react"
import { Position } from "./Position"
import { color as PieceColor } from "./Piece"

export interface Props {
    click: MouseEventHandler,
    position: Position,
    pieceColor: PieceColor
};