import React, { ReactNode } from "react";

interface Props {};

class NewGame extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    public render(): ReactNode {
        return (<div className={`newGame`} >
            <div>New Game</div>
            <div>Yes</div>
            <div>No</div>
        </div>);
    }
}

export default NewGame;