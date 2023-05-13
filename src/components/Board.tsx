import React, { MouseEvent, MouseEventHandler, ReactNode } from "react";
import Piece, {Props as PieceProperties} from "./Piece";
import Square from "./Square";
import { GameState, Move, Position } from "../interfaces/Shared";
import { numberToPosition, positionToNumber } from '../Util';

interface Props {
    width: number,
    height: number,
    gameState: GameState,    
    update: (highlights: Position[], pieceSelected: PieceProperties | undefined, move: Move | void) => void
};

interface State {};

class Board extends React.Component<Props, State> {
    
    constructor(props: Props) {
        super(props);        
    }

    private squareClick = (position: Position, piece: PieceProperties | undefined): MouseEventHandler => {
        return async (event: MouseEvent): Promise<void> => {
            const { gameState, update } = this.props;
            
            if (gameState.pieceSelected == undefined) {
                if (piece === undefined) return;

                const moves: Position[] = [];                
                gameState.moves.forEach((move: Move) => {
                    if (move.origin === positionToNumber(position)) {
                        moves.push(numberToPosition(move.destination));
                    }
                });
                if (moves.length === 0) return;

                await update([position].concat(moves), piece, undefined);
            } else {
                const validMove: Move | undefined = gameState.moves.find((move: Move) => {
                    return move.destination === positionToNumber(position) 
                        && move.origin === positionToNumber(gameState.pieceSelected!.position);
                });
                if (!validMove) {
                    await update([], undefined, undefined);
                } else {
                    await update([], undefined, validMove);
                }
            }
        };
    };

    private getPiece = (position: Position, pieceStates: PieceProperties[]): PieceProperties | undefined => {
        return pieceStates.find((piece: PieceProperties) => {
            return piece.position.x === position.x && piece.position.y === position.y;
        });        
    };

    private isHighlighted = (position: Position, highlights: Position[]): boolean => {
        return !!highlights.find((hPosition: Position) => {
            return hPosition.x === position.x && hPosition.y === position.y;
        });

    };

    private populateSquare = (position: Position, gameState: GameState): ReactNode => {
        const {highlights, pieces} = gameState;
        const squareKey: string = `square_${JSON.stringify(position)}`;   
        const piece = this.getPiece(position, pieces);
        const highlight = this.isHighlighted(position, highlights);
        return (<Square
            key={squareKey}
            click={this.squareClick(position, piece)} 
            position={position}
            piece={piece}
            highlight={highlight}
        />);
    };

    private populateBoard = (boardWidth: number, boardHeight: number, gameState: GameState): ReactNode => {
        const {highlights, pieces} = this.props.gameState;
        const board: ReactNode[] = [];
        for (let y = 0; y < boardHeight; y++) {
            const row: ReactNode[] = [];
            for (let x = 0; x < boardWidth; x++) {
                row.push(this.populateSquare({x, y}, gameState));
            }            
            board.push(<div className="row" key={`row_${y}`}>{row}</div>);
        }
        return (<div className="board">{board}</div>);
    }

    render(): ReactNode {
        const { width, height, gameState } = this.props;
        return this.populateBoard(width, height, gameState);
    }

}

export default Board;