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
import displayCard from './displayCard';
import editMode from './editMode';
import Login from './login';
import Signin from './sign-in';
import auth from '../hoc/auth';


const App = () => (
    <div>
        <Navbar/>
        <Route exact path = "/" component = {Login}/>
        <Route path = "/displayCard/:set_id/topic/:topic_id" component= {displayCard}/>
        <Route path = "/sets/:set_id" component = {auth(Sets)}/>
        <Route path = "/profile" component = {auth(Profile)}/>
        <Route path = "/flashcards" component = {auth(Flashcards)}/>
        <Route path = "/editMode/:set_id/topic/:topic_id" component= {editMode}/>
        <Route path = "/createflashcards/:category_id/subcategory/:sub_category_id" component = {InputDefinition}/>
        <Route path = "/flashcardGeneration/:set_id/topic/:topic_id" component = {FlashcardGeneration}/>
        <Route path = "/signup" component = {auth(Signup, '/profile', false)}/>
        <Route path = "/signin" component = {auth(Signin, '/profile', false)}/>
    </div>
);

export default App;


