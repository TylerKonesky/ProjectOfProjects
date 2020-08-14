import React, {Component} from 'react';
import './Infinity.css';
import Loader from '../../images/loader.svg';
import Test from '../../images/test.jpg'
import Axios from 'axios';

class Infinity extends Component{
    constructor(props){
        super(props);
        this.state = {
            images: [],
            readyToLoad: true
        }
    }
    componentWillMount(){
        this.getImages();
        this.scroll();
    }
    getImages = async () => {
        try{
            await Axios.get('https://api.unsplash.com/photos/random/?client_id=sEgzNqbaFQl5dPMz2yaxASDh-Py4Yb9fmaPSHuQHHx8&count=10').then(res =>{
            console.log(res.data)
            this.setState({images: [...this.state.images, ...res.data], readyToLoad: true})
        })
        }catch(err){
            console.log("there was an error...", err)
        }
        
    }
    renderImages(){
        switch(this.state.images.length){
            case 0:
                return this.renderLoader();
            default:
                return this.state.images.map(image => {
                    return (
                        <img src={image.urls.regular} alt={image.alt_description}></img>
                    )
                })
       }
    }

    scroll = () => {
        window.addEventListener('scroll', () =>{
            if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && this.state.readyToLoad === true){
                this.setState({readyToLoad: false})
                this.getImages();
            }
        })
    }

    renderLoader(){
        return(
            <div className="infinity-loader" id="loader">
                <img className="infinity-loader-image" src={Loader}></img>
            </div>
        )
    }
    render(){
        return(
            <div className="infinity-wrapper">
                <h1>Unsplash API - Infinite Scrolling</h1>
                <div className="infinity-image-container">
                    {this.renderImages()}
                </div>
            </div>
        )
    }
}

export default Infinity