import React from "react";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import './LandingPage.css'

// const backgroundImageStyle = {
//     backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
//     width:'100vw',
//     height:'100vh',
//     backgroundRepeat:'no-repeat'
// }

class LandingPage extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <div className='parentDiv'>
                <div className='childDiv'>
                    <h2>
                        UPLOAD AN ULTRASOUND.
                        <br/>
                        FIND OUT IF YOU HAVE SJOGREN'S SYNDROME.
                    </h2>
                    <Link to='/Home' >
                        <Button variant="contained" color='Link'>material=ui</Button>
                    </Link>
                </div>
            </div>
        )
    }

}

export default LandingPage