import React from 'react';
// import { Grid, Paper, Typography, makeStyles } from '@material-ui/core';'
// import { Grid, Paper, Typography, makeStyles, Box, Icon } from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import Background from './Components/Background';

import { Grid, Paper, Typography, makeStyles, Box } from '@material-ui/core';
import { MdOnlinePrediction, MdTableRows, MdBatchPrediction, MdBackupTable} from 'react-icons/md';


const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    paper: {
      padding: theme.spacing(4),
      margin: "0px 8%",
      textAlign: 'center',
      color: theme.palette.text.secondary,
      borderRadius: '12px',
      transition: 'transform 0.3s, box-shadow 0.3s',
      cursor: 'pointer',
      boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.1)',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 6px 30px 0 rgba(0, 0, 0, 0.2)',
      },
    },
  }));

const BoxesPage = () => {
  const classes = useStyles();

  const history = useHistory(); // Initialize useHistory hook

  const handleBoxClick = (path) => {
    history.push(path); // Redirect to the specified path
  };

  const boxes = [
    { text: 'Single Model Predict', icon: <MdOnlinePrediction style={{ fontSize: 50 }} />, path: '/SingleModel' },
    { text: 'Single Tabular Model Predict', icon: <MdTableRows style={{ fontSize: 50 }} />, path: '/SingleTabularModel' },
    { text: 'Multi-Model Predict', icon: <MdBatchPrediction style={{ fontSize: 50 }} />, path: '/MultiModel' },
    { text: 'Tabular Multi-Model Predict', icon: <MdBackupTable style={{ fontSize: 50 }} />, path: '/TabularMultiModel' },
  ];


  return (
    <Background className="BackgroundImage" hasFooter={true}>
      <div className={classes.root}>
        <Grid container spacing={4}>
          {boxes.map((box, idx) => (
            <Grid item xs={12} md={6} key={idx}>
              <Paper className={classes.paper} elevation={3} onClick={() => handleBoxClick(box.path)}>
                <Typography variant="h6" component="div">
                  <Box fontWeight="fontWeightBold">{box.text}</Box>
                </Typography>
                {box.icon}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </div>
    </Background>
  );
}

export default BoxesPage;