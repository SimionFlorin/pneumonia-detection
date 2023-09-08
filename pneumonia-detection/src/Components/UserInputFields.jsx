import React from 'react';
import {Form} from "react-bootstrap";

import {InputLabel, Select, MenuItem } from '@material-ui/core';

function UserInputFields({ handleTextChange, onSexChange, age, weight, abdominalCircumference, height, sex }) {
    return (
        <Form.Group>
            <Form.Control 
                type="number"
                style={{textAlign:'center', fontSize:20}} 
                placeholder='Age'
                onChange={handleTextChange} 
                value={age} 
                name='age'
                min="0"
                max="130"
            />
            <Form.Control 
                type="number"
                style={{textAlign:'center', fontSize:20}} 
                placeholder='Weight in kg'
                onChange={handleTextChange} 
                value={weight} 
                name='weight'
                min="1"
                max="650"
            />
            <Form.Control 
                type="number"
                style={{textAlign:'center', fontSize:20}} 
                placeholder='Abdominal Circumference in cm'
                onChange={handleTextChange} 
                value={abdominalCircumference} 
                name='abdominalCircumference'
                min="20"
                max="250"
            />
            <Form.Control 
                type="number"
                style={{textAlign:'center', fontSize:20}} 
                placeholder='Height in cm'
                onChange={handleTextChange} 
                value={height} 
                name='height'
                min="30"
                max="280"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <InputLabel id="sex-label" style={{ textAlign: 'center', fontSize: 20, margin: '10px', color: 'white' }}>
                    Sex
                </InputLabel>
                <Select
                    labelId="sex-label"
                    value={sex}
                    onChange={onSexChange}
                    style={{
                        width: '85%',
                        fontSize: 20,
                        textAlignLast: 'center',
                        backgroundColor: 'white',
                        borderRadius: '5px' 
                    }}
                >
                    <MenuItem value={'male'}>Male</MenuItem>
                    <MenuItem value={'female'}>Female</MenuItem>
                </Select>
            </div>
        </Form.Group>
    );
}

export default UserInputFields;
