import React from 'react';
import logo from './images.png';
import './App.css';
import axios from 'axios'
import ReactLoading from 'react-loading'
import {Link} from "react-router-dom";

class HomePage extends React.Component{

    constructor(props) {
        super(props);
        this.state= {
            isProcessing:false
        }

        this.onFileChange = this.onFileChange.bind(this)
        this.submit  = this.submit.bind(this)
        this.predictSampleFile = this.predictSampleFile.bind(this)
    }

    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
    };

    predictSampleFile = () => {
        const filePath = this.props.filePath.slice(1,)
        this.props.deleteFilePath()
        this.submit(filePath)
    }

    submit = (filePath='') => {
        let body;

        this.setState({isProcessing:true})

        if (filePath === '') {
            body = new FormData()
            body.append(
                "file",
                this.state.selectedFile,
                this.state.selectedFile.name
            );
            axios.post("http://localhost:5000/api/uploadFile", body,{'mode':'no-cors','Content-Type':'multipart/form-data'})
                .then(response=>{
                    const prediction = response.data
                    const prediction_text = prediction===1||prediction==='1'?'pneumonia':'normal'
                    this.setState({prediction_text,isProcessing:false})
                });
        }
        else {
            body = JSON.stringify({filePath})
            axios.post("http://localhost:5000/api/samplePrediction", body,{'mode':'no-cors','Content-Type':'json/application'})
                .then(response=>{
                    const prediction = response.data
                    const prediction_text = prediction===1||prediction==='1'?'pneumonia':'normal'
                    this.setState({prediction_text,isProcessing:false})
                });
        }


    };

    render() {
        const { prediction_text, isProcessing} = this.state
        if  (this.props.filePath) {
            this.predictSampleFile()
        }

        return (
            <div className="App">
                <header className="App-header">
                    <h2>
                        Upload a chest X-ray.
                        <br/>
                        Find out if you have pneumonia.
                    </h2>
                    <div>
                        <input type="file" accept="image/*" onChange={this.onFileChange}/>
                        <button onClick={this.submit}>
                            Predict
                        </button>
                    </div>
                    <div style={{marginLeft:-210}}>
                        <Link to='/chestXRays'>
                            <button>Test a sample</button>
                        </Link>
                    </div>
                    <br/>
                    {!prediction_text&&!isProcessing&&<img src={logo} className="App-logo" alt="logo"/>}
                    {isProcessing&&
                    <React.Fragment>
                        <ReactLoading type='spinningBubbles'>
                        </ReactLoading>
                        <h3>Processing</h3>
                    </React.Fragment>}
                    {prediction_text&&(prediction_text==="pneumonia"?
                        <h1>You have pneumonia</h1>:
                        <h1>You don't have pneumonia</h1>)
                    }
                    <p>
                        The prediction accuracy is 83%
                        <br/>
                        The images are not stored
                    </p>
                </header>
            </div>
        );
    }
}

export default HomePage;
