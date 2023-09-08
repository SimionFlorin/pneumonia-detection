import React from 'react';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

function CustomAlert(props) {
    return (
        <div style={{ padding: '40px' }}>
            <Alert
                severity="error"
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={props.onClose}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                style={{ 
                    backgroundColor: '#f28b82',
                    color: 'white',
                    borderRadius: '5px',
                    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
                    width: '20rem',
                    height: '5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                }}
            >
                {props.children}
            </Alert>
        </div>
    );
}

export default CustomAlert;
