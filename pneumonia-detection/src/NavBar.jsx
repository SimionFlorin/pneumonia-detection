import React from "react";
import { withRouter } from 'react-router-dom'
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import './App.css'

class NavBar extends React.Component {
    constructor() {
        super();
        this.handleChangeTab = this.handleChangeTab.bind(this)
    }
    handleChangeTab = (event, newValue) => {
        this.setState({tab:newValue});
        this.props.history.push(`/${newValue}`)

    };
    render() {
        const { className , location } = this.props
        const tab = location.pathname.slice(1)?location.pathname.slice(1):'Home'
        return(
            <div style={{textAlign: '-webkit-right'}} className={className?className:'NavBarDefault'}>
                {/*<AppBar position="static" variant='outlined' >*/}
                <Tabs value={tab} onChange={this.handleChangeTab} aria-label="simple tabs example"                >
                    <Tab label="Home" value='Home' />
                    <Tab label="Predict" value='Predict' />
                    <Tab label="Samples" value='Samples' />
                    <Tab label="PredictPage" value='PredictSelectionPage' />
                </Tabs>
                {/*</AppBar>*/}
            </div>
        )
    }
}

export default withRouter(NavBar)