import React, {Component} from 'react';
import auth from '../hoc/auth';
import github from '../assets/images/github.png';
import linkedin from '../assets/images/linkedin.png';
import home from '../assets/images/home.png';
import "../assets/css/about.css";

class About extends Component {
    render () {
        return (
            <div>
                <h1 className=" main-title white-text">Meet the Team</h1>
                    <div>
                        <img className="developer" src="http://worldartsme.com/images/women-stick-figure-clipart-1.jpg"/>
                        <h4 className="name white-text">Tiffany Kim</h4>
                        <div className="iconDiv">
                            <a>
                            <img className="icon" src={github}/>
                            </a>
                            <a>
                                <img className="icon" src={linkedin}/>
                            </a>
                            <a>
                                <img className="icon" src={home}/>
                            </a>
                        </div>
                    </div>
                    <div>
                        <img className="developer" src="https://files.slack.com/files-pri/T1EHQUJ8J-FETCK2Y3V/image.png"/>
                        <h4 className="name white-text">Brandon Park</h4>
                        <div className="iconDiv">
                            <a>
                            <img className="icon" src={github}/>
                            </a>
                            <a>
                                <img className="icon" src={linkedin}/>
                            </a>
                            <a>
                                <img className="icon" src={home}/>
                            </a>
                        </div>
                    </div>
                    <div>
                        <img className="developer" src="http://worldartsme.com/images/women-stick-figure-clipart-1.jpg"/>
                        <h4 className="name white-text">Vienna Tran</h4>
                        <div className="iconDiv">
                            <a>
                            <img className="icon" src={github}/>
                            </a>
                            <a>
                                <img className="icon" src={linkedin}/>
                            </a>
                            <a>
                                <img className="icon" src={home}/>
                            </a>
                        </div>
                    </div>
                    <div>
                        <img className="developer" src="https://files.slack.com/files-pri/T1EHQUJ8J-FETAH2KCL/image.png"/>
                        <h4 className="name white-text">Kyle Umbarger</h4>
                        <div className="iconDiv">
                            <a>
                            <img className="icon" src={github}/>
                            </a>
                            <a>
                                <img className="icon" src={linkedin}/>
                            </a>
                            <a>
                                <img className="icon" src={home}/>
                            </a>
                        </div>
                    </div>

                <h1 className=" main-title white-text">About This App</h1>
                <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec orci fringilla, molestie nibh ut, dignissim est. Vivamus egestas gravida eros. Nullam ipsum lectus, dapibus sed lorem et, fringilla placerat dui. Morbi a nunc vel purus malesuada consequat in ut nulla. Nam fringilla malesuada dapibus. Donec hendrerit nibh eget lacus accumsan dictum. Vestibulum egestas eu arcu sed tempor. Proin varius eros lectus, ac fringilla elit viverra sed. Integer vel malesuada massa. Suspendisse venenatis dignissim massa, eget efficitur velit laoreet a. Nullam ac risus sit amet tellus fringilla vestibulum. Vestibulum pulvinar, risus eleifend mollis mattis, magna leo ullamcorper felis, nec porta erat enim eget eros. Sed at arcu est.</p>
            </div>
        );
    }
}

export default auth(About);