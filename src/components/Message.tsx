import React, { ReactNode } from "react";

interface Props {
    message:string
};

class Message extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    public render(): ReactNode {
        const {message} = this.props;
        return (<div className={`message`} >{message}</div>);
    }
}

export default Message;