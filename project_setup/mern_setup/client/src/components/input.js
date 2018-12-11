import React from 'react';

export default ({input, label, size = 's12'}) => (
    <div className = {`input-field col ${size}`}>
        <input {...input} id = {input.name} autoComplete = "off"/>
        <label htmlFor={input.name}>{label}</label>
    </div>
);