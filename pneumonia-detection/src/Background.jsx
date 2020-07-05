import React from "react";
import NavBar from "./NavBar";
import {withRouter} from "react-router-dom";

class Background extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { className, navBarClassName} = this.props
        return(
            <div className={className}>
                <NavBar className={navBarClassName}/>
                {this.props.children}
            </div>
        )
    }
}

export default withRouter(Background)