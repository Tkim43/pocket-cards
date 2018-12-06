import React from 'react';

export default ({input, label, meta: {error, touched}}) => (
    <div>
        <input {...input} type = "text"/>
        <label htmlFor="">{label}</label>
    </div>
    
);