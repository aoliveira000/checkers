import { Position } from "./interfaces/Shared";

const numberToPosition = (number: number) : Position => {
    const y = Math.floor(number/4);
    const x = (number*2) - (y*8-(y%2?0:1));
    return { x, y };
};

const positionToNumber = (position: Position) : number => {
    return Math.floor(position.x/2) + (position.y*4);
};

export { numberToPosition, positionToNumber };