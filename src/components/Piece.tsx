import React, { MouseEvent, ReactNode } from "react";
import { Props, color } from "../interfaces/Piece";
import { Position } from "../interfaces/Position";

interface State {
    followMouse: boolean
};

class Piece extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            followMouse: false
        };
    }

    public static Color = {
        black: 'black' as color,
        red: 'red' as color,
    }; 

    public static clickFunction = (position: Position) => {
        return (e:MouseEvent<HTMLDivElement>) => {
            console.log(`I've been clicked and I'm a piece! ` + JSON.stringify(position) );
        };
    }

    public render(): ReactNode {
        const {color, click} = this.props;
        return (<div className={`piece ${color}`} onClick={click} />);
    }
}

export default Piece;