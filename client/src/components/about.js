import React, {Component} from 'react';
// import auth from '../hoc/auth';
import github from '../assets/images/github.png';
import linkedin from '../assets/images/linkedin.png';
import home from '../assets/images/home.png'; 
import tiffany from '../assets/images/tiffany.jpeg';
import brandon from '../assets/images/brandon.jpeg';
import vienna from '../assets/images/vienna.JPG';
import scott from '../assets/images/scott.jpg';
import andy from '../assets/images/andy.jpg';
import cody from '../assets/images/cody.jpg';
import "../assets/css/about.css";

class About extends Component {
    render () {
        return (
            <div>
                <div className="developers-container">
                    <h1 className=" main-title">Meet the Team</h1>
                    <h4 className="front-end center">Web Developers</h4>
                        <div className="developer-wrapper"> 
                            <img className="developer tiffany" src={tiffany}/>
                            <h5 className="name center">Tiffany Kim</h5>
                            <div className="iconDiv">
                                <a href="https://github.com/Tkim43" target="_blank">
                                <img className="icon" src={github}/>
                                </a>
                                <a href="https://www.linkedin.com/in/tiffany-kim-b24966171/" target="_blank">
                                    <img className="icon" src={linkedin}/>
                                </a>
                                <a href="http://tiffanyykim.com/" target="_blank">
                                    <img className="icon" src={home}/>
                                </a>
                            </div>
                        </div>
                        <div className="developer-wrapper">
                            <img className="developer brandon" src={brandon}/>
                            <h5 className="name center">Brandon Park</h5>
                            <div className="iconDiv">
                                <a href="https://github.com/brandon206" target="_blank">
                                <img className="icon" src={github}/>
                                </a>
                                <a href="https://www.linkedin.com/in/brandonpark206/" target="_blank">
                                    <img className="icon" src={linkedin}/>
                                </a>
                                <a href="http://www.brandontravispark.com/" target="_blank">
                                    <img className="icon" src={home}/>
                                </a>
                            </div>
                        </div>
                        <div className="developer-wrapper">
                            <img className="developer vienna" src={vienna}/>
                            <h5 className="name center">Vienna Tran</h5>
                            <div className="iconDiv">
                                <a href="https://github.com/viennaltran" target="_blank">
                                <img className="icon" src={github}/>
                                </a>
                                <a href="https://www.linkedin.com/in/vienna-tran-180586159/" target="_blank">
                                    <img className="icon" src={linkedin}/>
                                </a>
                                <a href="http://viennatran.com/" target="_blank">
                                    <img className="icon" src={home}/>
                                </a>
                            </div>
                        </div>
                    
                    <h4 className="front-end center">Project Managers</h4>
                        <div className="developer-wrapper">
                            <img className="developer scott" src={scott}/>
                            <h5 className="name center">Scott Bowler</h5>
                        </div>
                        <div className="developer-wrapper">
                            <img className="developer scott" src={andy}/>
                            <h5 className="name center">Andy Ong</h5>
                        </div>
                        <div className="developer-wrapper">
                            <img className="developer scott" src={cody}/>
                            <h5 className="name center">Cody Miller</h5>
                        </div>
                
                    <h1 className="main-title black-text">About This App</h1>
                    <p className="description">
                        We created Pocket Cards to solve the pain of creating flashcards online. With user experience being the focus, we wanted to create an easy and painless way to study for your next test or quiz.
                    </p>
                    <p className="description">
                        The inception of this idea started with planning out the feature sets we wanted to incorporate in the application. Using Figma, we were able to create mockups of how the MVP (Minimum Viable Product) would look like. We kept track of our responsibilities using Trello and utilizing the Agile Process.
                    </p>
                    <p className="description">
                        Pocket Cards is constructed with a ReactJS Front-End utilizing Redux so that state can be accessed or changed throughout components. In conjunction with Redux, our team used React Router DOM, Redux Form, Axios, and Materialize.<br></br>
                    </p>
                    <p className="description">
                        The Back-End features NodeJS using Express, Passport, Bcrypt-NodeJS, MySQL to handle validation, user authentication, and storing of user data.<br></br>
                    </p>
                </div>
            </div>
        );
    }
}

export default About;