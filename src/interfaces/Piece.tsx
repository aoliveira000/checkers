import { MouseEventHandler } from "react"
import { Position } from "./Position"

export type color = 'black' | 'red' | undefined;

export interface Props {
    color: color,
    position: Position,
    click: MouseEventHandler
};

