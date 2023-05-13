import React, { MouseEvent, ReactNode } from "react";
import { Position } from "../interfaces/Shared";

export type color = 'black' | 'red' | undefined;

export interface Props {
    color: color,
    crowned: boolean,
    position: Position,    
};

class Piece extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    public static Color = {
        black: 'black' as color,
        red: 'red' as color,
    }; 

    public render(): ReactNode {
        const {crowned, color} = this.props;
        return (<div className={`piece ${color} ${crowned ? 'crowned' : ''}`} />);
    }
}

export default Piece;