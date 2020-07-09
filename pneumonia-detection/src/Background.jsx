import React from "react";
import NavBar from "./NavBar";
import {withRouter} from "react-router-dom";
import './App.css'

class Background extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { className, navBarClassName, hasFooter} = this.props
        return(
            <div className={className}>
                <NavBar className={navBarClassName}/>
                {this.props.children}
                {hasFooter&&<footer className='Footer'>
                    <p>Author: Cira Simion Florin</p>
                    <p>Mail: simiflorin122@gmail.com</p>
                </footer>}
            </div>
        )
    }
}

export default withRouter(Background)