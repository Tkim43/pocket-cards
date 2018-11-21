import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize';
import '../assets/css/app.css';
import React from 'react';
import Test from './test';
import Navbar from './nav_bar';
import Profile from './profile';
import Sets from './sets';
import Flashcards from './flashcards';
import FlashcardGeneration from './flashcardGeneration';
import InputDefinition from './inputDefinition';
import { Route } from 'react-router-dom';
import displayData from './displayData'
import editSets from './editSets'



const App = () => (
    <div>
        {/* <div className="app">
            <Test/>
            <Button/>
        </div>
        </div> */}
        <Navbar/>
        <Route exact path = "/" component = {Profile}/>
        <Route path = "/sets" component = {Sets}/>
        <Route path = "/flashcards" component = {Flashcards}/>
        <Route path = "/displayData" component= {displayData}/>
        <Route path = "/editSets" component={editSets}/>
        <Route path = "/createflashcards" component = {InputDefinition}/>
        <Route path = "/flashcardGeneration" component = {FlashcardGeneration}/>
    </div>
);

export default App;


