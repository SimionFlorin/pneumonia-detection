import React from "react";
import {Link, withRouter} from "react-router-dom";
import {Button} from "react-bootstrap";
import './App.css';
import Background from "./Background";
import Card from "react-bootstrap/Card";

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

class SamplesPage extends React.Component {

    constructor(props) {
        super(props);
        this.processImage = this.processImage.bind(this)
    }

    processImage  (path)  {
        this.props.selectFilePath(path)
        this.props.history.push('/Predict')
    }

    render() {
        return(
            <Background className="BackgroundImage">
                <div style={{display:'flex',justifyContent:'center'}}>
                <div className="App-header" style={{maxWidth: 'fit-content',maxHeight: 'fit-content',paddingRight: 10,}}>
                    {outcomes.map(outcome=>(
                            <div>
                                <div style={{textAlign:'center'}}>
                                    <h4 style={{color:'white',marginTop:-5, textTransform:'uppercase',marginBottom:15}} >{outcome} images</h4>
                                    <div style={{display:'inline-flex'}}>
                                    {filePaths[outcome].map((path)=>{
                                        return(
                                            <Card style={{ marginLeft:15 }}>
                                                <Card.Img variant="top" src={path} style={{width:200,height:240}}/>
                                                <Card.Body style={{padding:'0.5rem'}}>
                                                    <Button variant="primary" onClick={()=>this.processImage(path)}>Predict</Button>
                                                </Card.Body>
                                            </Card>
                                            // <img src={path} onClick={()=>this.processImage(path)} style={{width:200,height:250,marginLeft:10}}/>
                                        )
                                    })}
                                    </div>
                                </div>
                                <hr/>
                            </div>
                        ))
                    }
                    <Link to='/'>
                        <Button variant='primary' size='lg'>
                            Back
                        </Button>
                    </Link>
                </div>
                </div>
            </Background>

        )
    }

}

export default  withRouter(SamplesPage)