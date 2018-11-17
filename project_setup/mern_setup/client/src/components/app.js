import React from 'react';
import '../assets/css/app.css';
import logo from '../assets/images/logo.svg';
import Test from './test';
import Button from './button'

const App = () => (
    <div>
        <div className="app">
            <Test/>
            <Button/>
        </div>
    </div>
);

export default App;


