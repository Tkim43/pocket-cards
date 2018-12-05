import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize';
import '../assets/css/app.css';
import React from 'react';
import Navbar from './nav_bar';
import Profile from './profile';
import Sets from './sets';
import Flashcards from './flashcards';
import FlashcardGeneration from './flashcardGeneration';
import Signup from './sign-up';
import InputDefinition from './inputDefinition';
import { Route } from 'react-router-dom';
import displayFront from './displayFront';
import displayBack from './displayBack';
// import frontEditMode from './frontEditMode';
// import backEditMode from './backEditMode';
import Login from './login';
import Signin from './sign-in';

import auth from '../hoc/auth';

const App = () => (
    <div>
        <Navbar/>
        <Route exact path = "/" component = {Login}/>
        <Route path = "/sets" component = {auth(Sets)}/>
        <Route path = "/profile" component = {auth(Profile)}/>
        <Route path = "/flashcards" component = {auth(Flashcards)}/>
        <Route path = "/displayFront" component= {displayFront}/>
        <Route path = "/displayBack" component= {displayBack}/>
        <Route path = "/editMode" component= {editMode}/>
        <Route path = "/createflashcards" component = {InputDefinition}/>
        <Route path = "/flashcardGeneration" component = {FlashcardGeneration}/>
        <Route path = "/signup" component = {auth(Signup, '/profile', false)}/>
        <Route path = "/signin" component = {auth(Signin, '/profile', false)}/>
    </div>
);

export default App;


