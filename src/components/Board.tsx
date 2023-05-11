import React, { ReactNode } from "react";
import Piece from "./Piece";
import Square from "./Square";
import { Position } from "../interfaces/Position";
import { color as PieceColor } from "../interfaces/Piece";
import { PieceLocations } from "../interfaces/Board";

interface Props {
    width: number,
    height: number
};

interface State {
    pieceLocations: {
        red: Position[],
        black: Position[],
    }
};

class Board extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            pieceLocations: {
                red: [
                    {x: 0, y: 1},
                    {x: 0, y: 3},
                    {x: 0, y: 5},
                    {x: 0, y: 7},
                    {x: 1, y: 0},
                    {x: 1, y: 2},
                    {x: 1, y: 4},
                    {x: 1, y: 6},
                    {x: 2, y: 1},
                    {x: 2, y: 3},
                    {x: 2, y: 5},
                    {x: 2, y: 7},
                ],
                black: [
                    {x:5, y:0},
                    {x:5, y:2},
                    {x:5, y:4},
                    {x:5, y:6},
                    {x:6, y:1},
                    {x:6, y:3},
                    {x:6, y:5},
                    {x:6, y:7},
                    {x:7, y:0},
                    {x:7, y:2},
                    {x:7, y:4},
                    {x:7, y:6}
                ]
            }
        };
    }

    private hasPiece = (needle: Position, haystack: Position[]): boolean => {
        return !!haystack.find((position: Position) => {
            return JSON.stringify(position) === JSON.stringify(needle);
        });
    };

    private getPieceColor = (position: Position, pieceLocations: PieceLocations): PieceColor => {
        let piece: PieceColor;
        if (this.hasPiece(position, pieceLocations.black)) {
            piece = Piece.Color.black;
        } else if (this.hasPiece(position, pieceLocations.red)) {
            piece = Piece.Color.red;
        }
        return piece;
    };

    private populateBoard = (boardWidth: number, boardHeight: number, pieceLocations: PieceLocations): ReactNode => {
        const board: ReactNode[] = [];
        for (let y = 0; y < boardHeight; y++) {
            const row : ReactNode[] = [];
            for (let x = 0; x < boardWidth; x++) {
                const squareKey: string = `square_${x}_${y}`;   
                const pieceColor = this.getPieceColor({x, y}, pieceLocations);
                const square = (<Square
                    key={squareKey}
                    click={Square.clickFunction({x, y})} 
                    position={{x, y}}
                    pieceColor={pieceColor}
                />);
                row.push(square);
            }            
            board.push(<div className="row" key={`row_${y}`}>{row}</div>);
        }
        return (<div className="board">{board}</div>);
    }

    render(): ReactNode {
        const { width, height } = this.props;
        const { pieceLocations } = this.state;
        return this.populateBoard(width, height, pieceLocations);
    }

}

export default Board;