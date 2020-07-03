import React from 'react';
import './App.css';
import HomePage from "./HomePage";
import {BrowserRouter, Route} from "react-router-dom";
import ChestXRaysPage from "./ChestXRaysPage";
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory()

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state= {
        filePath:''
    }
    this.deleteFilePath = this.deleteFilePath.bind(this)
    this.selectFilePath = this.selectFilePath.bind(this)
  }

    deleteFilePath(){
      this.setState({filePath:''})
    }

    selectFilePath(filePath) {
      this.setState({filePath})
    }

  render() {
    const { filePath } = this.state
    return (
        <BrowserRouter history={history} >
            <Route render={()=>(
                <ChestXRaysPage selectFilePath={this.selectFilePath}/>
                )} path='/chestXRays'/>
            <Route render={() => (
                <HomePage filePath={filePath} deleteFilePath={this.deleteFilePath}/>
            )} exact path='/'/>
        </BrowserRouter>
    );
  }
}

export default App;
