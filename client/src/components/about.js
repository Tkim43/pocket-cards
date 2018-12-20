import React, {Component} from 'react';
import auth from '../hoc/auth';
import github from '../assets/images/github.png';
import linkedin from '../assets/images/linkedin.png';
import home from '../assets/images/home.png';
import tiffany from '../assets/images/tiffany.jpeg';
import brandon from '../assets/images/brandon.jpeg';
import vienna from '../assets/images/vienna.JPG';
import "../assets/css/about.css";

class About extends Component {
    render () {
        return (
            <div>
                <div className="developers-container">
                <h1 className=" main-title">Meet the Team</h1>
                <h4 className="front-end center">Front End Developers</h4>
                    <div className="developer-wrapper"> 
                        <img className="developer tiffany" src={tiffany}/>
                        <h5 className="name center">Tiffany Kim</h5>
                        <div className="iconDiv">
                            <a href="https://github.com/Tkim43">
                            <img className="icon" src={github}/>
                            </a>
                            <a href="https://www.linkedin.com/in/tiffany-kim-b24966171/">
                                <img className="icon" src={linkedin}/>
                            </a>
                            <a href="http://tiffanyykim.com/">
                                <img className="icon" src={home}/>
                            </a>
                        </div>
                    </div>
                    <div>
                        <img className="developer brandon" src={brandon}/>
                        <h5 className="name center">Brandon Park</h5>
                        <div className="iconDiv">
                            <a href="https://github.com/brandon206">
                            <img className="icon" src={github}/>
                            </a>
                            <a href="https://www.linkedin.com/in/brandonpark206/">
                                <img className="icon" src={linkedin}/>
                            </a>
                            <a href="http://www.brandontravispark.com/">
                                <img className="icon" src={home}/>
                            </a>
                        </div>
                    </div>
                    <div>
                        <img className="developer vienna" src={vienna}/>
                        <h5 className="name center">Vienna Tran</h5>
                        <div className="iconDiv">
                            <a href="https://github.com/viennaltran">
                            <img className="icon" src={github}/>
                            </a>
                            <a href="https://www.linkedin.com/in/vienna-tran-180586159/">
                                <img className="icon" src={linkedin}/>
                            </a>
                            <a href="http://viennatran.com/">
                                <img className="icon" src={home}/>
                            </a>
                        </div>
                    </div>
                    </div>
                    {/* <div>
                        <img className="developer" src="https://cdn.shopify.com/s/files/1/0949/0582/products/7946a-gingerbread-man-cookie-dozen-eggs-01-pop_1400x.jpg?v=1527319761"/>
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
                    </div> */}

                {/* <h1 className=" main-title white-text">About This App</h1>
                <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec orci fringilla, molestie nibh ut, dignissim est. Vivamus egestas gravida eros. Nullam ipsum lectus, dapibus sed lorem et, fringilla placerat dui. Morbi a nunc vel purus malesuada consequat in ut nulla. Nam fringilla malesuada dapibus. Donec hendrerit nibh eget lacus accumsan dictum. Vestibulum egestas eu arcu sed tempor. Proin varius eros lectus, ac fringilla elit viverra sed. Integer vel malesuada massa. Suspendisse venenatis dignissim massa, eget efficitur velit laoreet a. Nullam ac risus sit amet tellus fringilla vestibulum. Vestibulum pulvinar, risus eleifend mollis mattis, magna leo ullamcorper felis, nec porta erat enim eget eros. Sed at arcu est.</p> */}
            </div>
        );
    }
}

export default auth(About);