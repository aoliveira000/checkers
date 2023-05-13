import React, { MouseEventHandler, ReactNode } from "react";
import Piece, {Props as PieceAttribute} from "./Piece";
import { Position } from "../interfaces/Shared";

export type color = 'black' | 'white';

export interface Props {
    click: MouseEventHandler,
    position: Position,
    piece: PieceAttribute | undefined,
    highlight: boolean
};

class Square extends React.Component<Props> {
    
    constructor(props: Props) {
        super(props); 
        this.state = {
            highlight: false
        };    
    }

    public static Color = {
        black: 'black' as color,
        white: 'white' as color,
    }; 
    
    private getSquareColor = (position: Position): color => {
        const {x,y} = position;
        let color;
        if (x%2) {
            color = Square.Color.black;
            if (y%2) {
                color = Square.Color.white;
            }              
        } else {
            color = Square.Color.white;
            if (y%2) {
                color = Square.Color.black;
            }
        }
        return color;
    }

    public render(): ReactNode {
        const {click, highlight, piece, position} = this.props;

        let pieceNode: ReactNode | undefined;
        if (piece !== undefined) {
            pieceNode = (<Piece {...piece} />);
        }

        let squareColor: string = this.getSquareColor(position);
        return (<div className={`square ${squareColor} ${highlight ? 'highlight': ''}`} onClick={click} >
            {pieceNode}
        </div>);
    }
}

export default Square;