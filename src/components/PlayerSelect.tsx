import React, { MouseEventHandler, ReactNode } from "react";

interface Props {
    onePlayer: MouseEventHandler,
    twoPlayer: MouseEventHandler
};

class PlayerSelect extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    public render(): ReactNode {
        return (<div className={`playerSelect`} >
            How many Players?
            <input type="button" value={"One"} onClick={this.props.onePlayer} />
            <input type="button" value={"Two"} onClick={this.props.twoPlayer} />
        </div>);
    }
}

export default PlayerSelect;