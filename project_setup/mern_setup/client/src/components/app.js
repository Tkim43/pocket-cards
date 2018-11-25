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
import displayFront from './displayFront'
import displayBack from './displayBAck'
import frontEditMode from './frontEditMode'
import backEditMode from './backEditMode'
import editSets from './editSets'
import logIn from './logIn'
import editSets from './editSets';
import modal from './modal';



const App = () => (
    <div>
        <Navbar/>
        <Route exact path = "/" component = {Profile}/>
        <Route path = "/modal" component = {modal}/>
        <Route path = "/sets" component = {Sets}/>
        <Route path = "/flashcards" component = {Flashcards}/>
        <Route path = "/displayFront" component= {displayFront}/>
        <Route path = "/displayBack" component= {displayBack}/>
        <Route path = "/frontEditMode" component= {frontEditMode}/>
        <Route path = "/backEditMode" component= {backEditMode}/>
        <Route path = "/editSets" component={editSets}/>
        <Route path = "/createflashcards" component = {InputDefinition}/>
        <Route path = "/logIn" component = {logIn}/>
        <Route path = "/flashcardGeneration" component = {FlashcardGeneration}/>
    </div>
);

export default App;


