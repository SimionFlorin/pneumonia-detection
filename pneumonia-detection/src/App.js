import React from 'react';
import './App.css';
import PredictPage from "./PredictPage";
import {BrowserRouter, Link, Route, withRouter} from "react-router-dom";
import SamplesPage from "./SamplesPage";
import { createBrowserHistory } from 'history';
import LandingPage from './LandingPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./Components/NavBar";
import About from "./About";
import PredictSelectionPage from "./PredictSelectionPage";
import SingleTabularModelPredictPage from "./SingleTabularModelPredictPage";
import SingleModelPredictPage from "./SingleModelPredictPage";
import MultiModelPredictPage from './MultiModelPredictPage';
import TabularMultiModelPredictPage from "./TabularMultiModelPredictPage";

export const history = createBrowserHistory()

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state= {
        filePath:'',
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
            <BrowserRouter history={history} basename={`${process.env.PUBLIC_URL}/`}>
                <Route render={()=>(
                    <SamplesPage selectFilePath={this.selectFilePath}/>
                    )} path='/Samples'/>
                <Route render={() => (
                    <PredictPage filePath={filePath} deleteFilePath={this.deleteFilePath}/>
                )} exact  path={['/Predict']}/>
                <Route render={() => (
                    <PredictSelectionPage filePath={filePath} deleteFilePath={this.deleteFilePath}/>
                )} exact  path={['/PredictSelection']}/>
                <Route render={() => (
                    <SingleTabularModelPredictPage filePath={filePath} deleteFilePath={this.deleteFilePath}/>
                )} exact  path={['/SingleTabularModel']}/>
                <Route render={() => (
                    <SingleModelPredictPage filePath={filePath} deleteFilePath={this.deleteFilePath}/>
                )} exact  path={['/SingleModel']}/>
                <Route render={() => (
                    <MultiModelPredictPage filePath={filePath} deleteFilePath={this.deleteFilePath}/>
                )} exact  path={['/MultiModel']}/>
                <Route render={() => (
                    <TabularMultiModelPredictPage filePath={filePath} deleteFilePath={this.deleteFilePath}/>
                )} exact  path={['/TabularMultiModel']}/>
                <Route render={() => (
                    <LandingPage filePath={filePath} deleteFilePath={this.deleteFilePath}/>
                )} exact path='/Landing'/>
                <Route render={() => (
                    <About filePath={filePath} deleteFilePath={this.deleteFilePath}/>
                )} exact path={['/','/About','/Home']}/>
            </BrowserRouter>
    );
  }
}

export default App;
