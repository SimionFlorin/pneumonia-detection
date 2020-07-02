import React from 'react';
import logo from './images.png';
import './App.css';
import axios from 'axios'
import ReactLoading from 'react-loading'

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state= {
      isProcessing:false
    }

    this.onFileChange = this.onFileChange.bind(this)
    this.submit  = this.submit.bind(this)
  }

  onFileChange = event => {

    this.setState({ selectedFile: event.target.files[0] });

  };
  submit = () => {
    const formData = new FormData();

    formData.append(
        "file",
        this.state.selectedFile,
        this.state.selectedFile.name
    );

    this.setState({isProcessing:true})

    axios.post("http://localhost:5000/api/uploadFile", formData,{'mode':'no-cors','Content-Type':'multipart/form-data'})
        .then(response=>{
          const prediction = response.data
          const prediction_text = prediction===1||prediction==='1'?'pneumonia':'normal'
          this.setState({prediction_text,isProcessing:false})
        });
  };

  render() {
    const { prediction_text, isProcessing} = this.state
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

export default App;
