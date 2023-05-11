import React, { MouseEvent, ReactNode } from "react";
import Piece from "./Piece";
import { Props, color } from "../interfaces/Square";
import { Position } from "../interfaces/Position";

interface State {};

class Square extends React.Component<Props, State> {
    
    constructor(props: Props) {
        super(props);        
    }

    public static Color = {
        black: 'black' as color,
        white: 'white' as color,
    }; 

    public static clickFunction = (position: Position) => {
        return (e:MouseEvent<HTMLDivElement>) => {
            console.log(`I've been clicked and I'm a square! ` + JSON.stringify(position));
        };
    }

    public render(): ReactNode {
        const {click, pieceColor, position} = this.props;

        let squareColor: string = this.getSquareColor(position);
        let pieceNode: ReactNode | undefined;
        if (pieceColor !== undefined) {
            pieceNode = (<Piece 
                color={pieceColor} 
                position={position} 
                click={Piece.clickFunction(position)} 
            />);
        }
        return (<div className={`square ${squareColor}`} onClick={click} >{pieceNode}</div>);
    }

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
}

export default Square;