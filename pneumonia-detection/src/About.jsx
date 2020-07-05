import React from "react";
import {Link, withRouter} from "react-router-dom";
import Background from "./Background";
import './About.css'
import * as Icon from 'react-bootstrap-icons';
import {Button, ButtonGroup} from "react-bootstrap";

class About extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Background className='BackgroundImage'>
                <div style={{display:'flex',justifyContent:'center',height:'100vh',alignItems:'center'}}>
                    <div style={{justifyContent:'center',alignContent:'space-between', color:'white',textAlign:'center'}}>
                        <h2 style={{color:'goldenrod'}}>PNEUMONIA DETECTION </h2>
                        <h4 style={{maxWidth: 920,textAlign:'left',marginTop:15,marginBottom:15}}>You can now find out if a chest Xray
                            portrays a healthy chest or one with pneumonia. Upload your own image or try out one of our samples</h4>
                        <hr style={{backgroundColor:'goldenrod'}}/>
                        <div style={{alignContent:'space-between',display:'inline-flex',maxWidth:960}}>
                            <span style={{width:320}}>
                                <Icon.GraphUp className='Icons'/>
                                <h4 style={{marginTop:15,marginBottom:15}}>PERFORMANCE</h4>
                                <p style={{textAlign:'left'}}>The algorithm has a 83% accuracy. A recall of 97% and a precision of 79%</p>
                            </span>
                            <span style={{width:320}}>
                                <Icon.ShieldLock className='Icons'/>
                                <br/>
                                <h4 style={{marginTop:15,marginBottom:15}}>PRIVACY</h4>
                                <p style={{textAlign:'left'}}>We don't store the images you send for prediction.
                                    The images are sent for processing and then deleted.</p>
                            </span>
                            <span style={{width:320}}>
                                <Icon.XCircle className='Icons'/>
                                <h4 style={{marginTop:15,marginBottom:15}}>LIMITATIONS</h4>
                                <p style={{textAlign:'left'}}>It doesn't work on images beside chest X-ray. The training was done on chest X ray images only.
                                For any other image the the result will not be relevant</p>
                            </span>
                        </div>
                        <br/>
                        <br/>
                        <div>
                            <Link to='/Predict' style={{marginRight:600}}>
                                <Button variant='primary' style={{borderRadius:30}}>UPLOAD IMAGE</Button>
                            </Link>
                            <Link to='/Samples'>
                                <Button variant='primary' style={{borderRadius:30}}>TEST SAMPLE</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Background>
        );
    }

}

export default withRouter(About)