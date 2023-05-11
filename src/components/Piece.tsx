import React, { MouseEvent, ReactNode } from "react";
import {Props, color} from "../interfaces/Piece";

interface State {};

class Piece extends React.Component<Props, State> {

    public static Color = {
        black: 'black' as color,
        red: 'red' as color,
    }; 

    public static clickFunction = () => {
        return (e:MouseEvent<HTMLDivElement>) => {
            console.log(`I've been clicked and I'm a piece!`);
        };
    }

    constructor(props: Props) {
        super(props);
    }

    render(): ReactNode {
        const {color, click} = this.props;
        return (<div className={`piece ${color}`} onClick={click} />);
    }
}

export default Piece;