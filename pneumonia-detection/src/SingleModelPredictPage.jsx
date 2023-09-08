import React from 'react';
import logo from './images.png';
import './App.css';
import axios from 'axios'
import ReactLoading from 'react-loading'
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Form} from "react-bootstrap";
import Background from "./Components/Background";
import './LandingPage.css'
import Alert from "react-bootstrap/Alert";
import CustomAlert from './Components/CustomAlert';

class PredictPage extends React.Component{

    constructor(props) {
        super(props);
        this.state= {
            isProcessing:false,
            alert:null,
        }

        this.onFileChange = this.onFileChange.bind(this)
        this.submit  = this.submit.bind(this)
        this.predictSampleFile = this.predictSampleFile.bind(this)
        this.Refresh = this.Refresh.bind(this)
    }

    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
    };
    Refresh = () => {
        console.log('in refresh')
        this.setState({prediction_text:'',isProcessing:false})
    }
    predictSampleFile = () => {
        const filePath = this.props.filePath.slice(2,)
        this.props.deleteFilePath()
        this.submit(filePath)
    }

    submit = (filePath) => {
        let body;

        this.setState({ isProcessing: true, alert: null  });

        if (!filePath.name && !this.state.selectedFile) {
            this.setState({ 
                alert: "All fields are required!",
                isProcessing: false 
            });
            return;
        }

        console.log('filePath ',filePath)
        if (typeof filePath !== "string") {
            body = new FormData()
            body.append(
                "file",
                this.state.selectedFile,
                this.state.selectedFile.name
            );
            axios.post("http://35.223.195.182/api/uploadFile", body,{'mode':'no-cors','Content-Type':'multipart/form-data'})
                .then(response=>{
                    const prediction = response.data
                    const prediction_text = prediction===1||prediction==='1'?"Sjogren's Syndrome":'normal'
                    this.setState({prediction_text, isProcessing:false})
                });
        }
        else {
            body = JSON.stringify({filePath})
            axios.post("http://35.223.195.182/api/samplePrediction", body,{'mode':'no-cors','Content-Type':'json/application'})
                .then(response=>{
                    const prediction = response.data
                    const prediction_text = prediction===1||prediction==='1'?"Sjogren's Syndrome":'normal'
                    this.setState({prediction_text, isProcessing:false})
                });
        }


    };

    render() {
        const { prediction_text, isProcessing, selectedFile} = this.state
        if  (this.props.filePath) {
            this.predictSampleFile()
        }

        return (
            <Background className='BackgroundImage' hasFooter={true}>
                {this.state.alert && 
                    <CustomAlert onClose={() => this.setState({ alert: '' })}>
                        {this.state.alert}
                    </CustomAlert>
                }
                {!prediction_text&&!isProcessing&&
                <div className='parentDiv' style={{marginLeft: '20%'}}>
                    <div className='childDiv'>
                        <h2>
                            UPLOAD AN ULTRASOUND.
                            <br/>
                            FIND OUT IF YOU HAVE SJOGREN'S.
                        </h2>
                        <div className="mb-3">
                            <Form>
                                <Form.File
                                    id="custom-file-translate-scss"
                                    label={selectedFile?.name?selectedFile.name:"Chest X-ray Image"}
                                    lang="en"
                                    custom
                                    onChange={this.onFileChange}
                                />
                            </Form>
                            <br/>
                            <div style={{justifyContent:'space-between',display:'flex'}}>
                                <Button variant='light' size='lg' onClick={this.submit}>
                                    PREDICT
                                </Button>
                            </div>
                        </div>
                        <div >

                        </div>
                        <br/>
                    </div>
                </div>}
                {isProcessing&&
                <div className='parentDiv' style={{justifyContent:'center'}}>
                    <div className='childDiv' style={{textAlign:'center'}}>
                        <ReactLoading type='spinningBubbles' height={200} width={200}>
                        </ReactLoading>
                        <br/>
                        <h2>PROCESSING</h2>
                    </div>
                </div>}
                {prediction_text&&
                <div style={{transition:'2s'}} className='AlertPosition'>
                    {prediction_text==="Sjogren's Syndrome"?
                        <Alert variant="danger">
                            <Alert.Heading>You probably have Sjogren's Syndrome !!!</Alert.Heading>
                        </Alert>
                        :
                        <Alert variant="success">
                            <Alert.Heading>You probably don't have Sjogren's Syndrome</Alert.Heading>
                        </Alert>}
                        <Button variant='light' onClick={this.Refresh}>REFRESH</Button>
                </div>


                }
            </Background>
        );
    }
}

export default PredictPage;