import React from 'react';
import logo from './images.png';
import './App.css';
import axios from 'axios'
import ReactLoading from 'react-loading'
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Form} from "react-bootstrap";
import Background from "./Background";
import './LandingPage.css'
import Alert from "react-bootstrap/Alert";
import SelectInput from '@material-ui/core/Select/SelectInput';
import { Select, MenuItem, InputLabel } from '@material-ui/core';

class PredictPage extends React.Component{

    constructor(props) {
        super(props);
        this.state= {
            isProcessing:false
        }

        this.onFileChange = this.onFileChange.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
        this.onSexChange = this.onSexChange.bind(this)
        this.submit  = this.submit.bind(this)
        this.predictSampleFile = this.predictSampleFile.bind(this)
        this.Refresh = this.Refresh.bind(this)
    }

    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
    };
    handleTextChange = event => {
        const field = event.target.name
        this.setState({ [field]: event.target.value });
    }
    onSexChange = event => {
        this.setState({sex:event.target.value})
    }
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

        this.setState({isProcessing:true})
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
        const { prediction_text, isProcessing, selectedFile, age, BMI, weight, abdominalCircumference, height, sex} = this.state
        if  (this.props.filePath) {
            this.predictSampleFile()
        }

        return (
            <Background className='BackgroundImage' hasFooter={true}>
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
                                <Form.Group>
                                    <Form.Text style={{textAlign:'center', fontSize:20}} placeholder='Age'
                                        onChange={this.handleTextChange} value={age} name='age'
                                    />
                                    <Form.Text style={{textAlign:'center', fontSize:20}} placeholder='BMI'
                                        onChange={this.handleTextChange} value={BMI} name='BMI'
                                    />
                                    <Form.Text style={{textAlign:'center', fontSize:20}} placeholder='Weight in kg'
                                        onChange={this.handleTextChange} value={weight} name='weight'
                                    />
                                    <Form.Text style={{textAlign:'center', fontSize:20}} placeholder='Abdominal Circumference in cm'
                                        onChange={this.handleTextChange} value={abdominalCircumference} name='abdominalCircumference'
                                    />
                                    <Form.Text style={{textAlign:'center', fontSize:20}} placeholder='Height in cm'
                                        onChange={this.handleTextChange} value={height} name='height'
                                    />
                                    <InputLabel id="sex-label">Sex</InputLabel>
                                    <Select
                                        labelId="sex-label"
                                        value={sex}
                                        onChange={this.onSexChange}
                                    >
                                        <MenuItem value={'male'}>Male</MenuItem>
                                        <MenuItem value={'female'}>Female</MenuItem>
                                    </Select>
                                </Form.Group>
                                <Form.File
                                    id="custom-file-translate-scss"
                                    label={selectedFile?.name?selectedFile.name:"Ultrasound Image"}
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
