import React from 'react';
import logo from './images.png';
import './App.css';
import './MultiModelPages.css'
import axios from 'axios'
import ReactLoading from 'react-loading'
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Form} from "react-bootstrap";
import Background from "./Components/Background";
import './LandingPage.css'
import Alert from "react-bootstrap/Alert";
import CustomAlert from './Components/CustomAlert';
import UserInputFields from './Components/UserInputFields';

class TabularMultiModelPredictPage extends React.Component{

    constructor(props) {
        super(props);
        this.state= {
            isProcessing:false,
            alert:null,
            selectedFiles: {
                leftParotid: null,
                rightParotid: null,
                leftSubmandibular: null,
                rightSubmandibular: null,
            }
        }

        this.onFileChange = this.onFileChange.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
        this.onSexChange = this.onSexChange.bind(this)
        this.submit  = this.submit.bind(this)
        this.predictSampleFile = this.predictSampleFile.bind(this)
        this.Refresh = this.Refresh.bind(this)
    }

    onFileChange = (event, label) => {
        const newFiles = { ...this.state.selectedFiles, [label]: event.target.files[0] };
        this.setState({ selectedFiles: newFiles });
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

        this.setState({ isProcessing: true, alert: null  });

        const { selectedFiles } = this.state;

        if (!this.state.age || !this.state.weight || !this.state.abdominalCircumference || !this.state.height || !this.state.sex) {
            this.setState({ 
                alert: "All fields are required!",
                isProcessing: false 
            });
            return;
        }

        const allFiles = Object.values(selectedFiles);
        if (allFiles.some(file => !file)) {
            // console.log(allFiles)
            this.setState({ 
                alert: "All 4 body parts ultrasounds are required!",
                isProcessing: false 
            });
            return;
        }

        
        const formData = {
            age: this.state.age,
            BMI: this.state.weight/((this.state.height/100)**2),
            weight: this.state.weight,
            abdominalCircumference: this.state.abdominalCircumference,
            height: this.state.height,
            sex: this.state.sex,
            filePath: typeof filePath === "string" ? filePath : null
        };

        console.log('filePath ',filePath)
        if (typeof filePath !== "string") {
            body = new FormData();

            for (const key in formData) {
                if (formData[key] !== null) {
                    body.append(key, formData[key]);
                }
            }

            Object.entries(selectedFiles).forEach(([key, file]) => {
                if (file) {
                    body.append(key, file, file.name);
                }
            });

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
        const { prediction_text, isProcessing, age, weight, abdominalCircumference, height, sex, selectedFiles } = this.state
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
                {!prediction_text && !isProcessing &&
                <div className='parentDiv' style={{ marginLeft: '20%', width: "70%" }}>
                    <div className='childDiv'>
                        <h2>
                            FIND OUT IF YOU HAVE SJOGREN'S.
                            <br/>
                            BY FILLING THE FOLLOWING FIELDS AND
                            <br/>
                            UPLOADING THE FOLLOWING ULTRASOUNDS:
                        </h2>
                        
                        <Form>
                                <UserInputFields 
                                    handleTextChange={this.handleTextChange}
                                    onSexChange={this.onSexChange}
                                    age={age}
                                    weight={weight}
                                    abdominalCircumference={abdominalCircumference}
                                    height={height}
                                    sex={sex}
                                />
                            <br />
                            <div 
                            //  className="files-container"
                            >
                            {Object.entries(selectedFiles).map(([key, file]) => (
                                <div key={key} style={{marginBottom:10}}>
                                    <Form.File
                                        className="file-wrapper"
                                        id={`custom-file-${key}`}
                                        label={file?.name || key}
                                        lang="en"
                                        custom
                                        onChange={(e) => this.onFileChange(e, key)}
                                    />
                                    <br />
                                </div>
                            ))}
                        <br />
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                                <Button variant='light' size='lg' onClick={this.submit}>
                                    PREDICT
                                </Button>
                            </div>
                            </div>
                        </Form>
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

export default TabularMultiModelPredictPage;
