import React from "react";
import {Link, withRouter} from "react-router-dom";
import {Button} from "react-bootstrap";
import './App.css';

const filePaths = {
    Pneumonia: [
        '/person1_bacteria_1.jpeg',
        '/person1_bacteria_2.jpeg',
        '/person2_bacteria_3.jpeg',
        '/person2_bacteria_4.jpeg',
        '/person3_bacteria_10.jpeg',
    ], Healthy: [
        '/IM-0117-0001.jpeg',
        '/IM-0115-0001.jpeg',
        '/IM-0119-0001.jpeg',
        '/IM-0122-0001.jpeg',
        '/IM-0125-0001.jpeg',
    ]
}

const outcomes = [
    'Pneumonia', 'Healthy'
]

class ChestXRaysPage extends React.Component {

    constructor(props) {
        super(props);
        this.processImage = this.processImage.bind(this)
    }

    processImage  (path)  {
        this.props.selectFilePath(path)
        this.props.history.push('/')
    }

    render() {
        return(
            <div className="XrayBackground">
                <div className="App-header" style={{width: 'fit-content',height: 'fit-content',paddingRight: 10}}>
                    {outcomes.map(outcome=>(
                            <div>
                                <div style={{textAlign:'center'}}>
                                    <h4 style={{color:'white',marginTop:-5}} >{outcome} images</h4>
                                    {filePaths[outcome].map((path)=>{
                                        return(
                                            <img src={path} onClick={()=>this.processImage(path)} style={{width:200,height:250,marginLeft:10}}/>
                                        )
                                    })}
                                </div>
                                <hr/>
                            </div>
                        ))
                    }
                    <Link to='/'>
                        <Button variant='primary'>
                            Back
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

}

export default  withRouter(ChestXRaysPage)