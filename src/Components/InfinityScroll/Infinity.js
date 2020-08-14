import React, {Component} from 'react';
import './Infinity.css';
import Loader from '../../images/loader.svg';
import Axios from 'axios';

class Infinity extends Component{
    constructor(props){
        super(props);
        this.state = {
            images: [],
            readyToLoad: true
        }
    }
    componentDidMount(){
        this.getImages();
        this.scroll();
    }

    getImages = () => {
        try{
            setTimeout( async () =>{
                await Axios.get('https://api.unsplash.com/photos/random/?client_id=sEgzNqbaFQl5dPMz2yaxASDh-Py4Yb9fmaPSHuQHHx8&count=10').then(res =>{
                this.setState({images: [...this.state.images, ...res.data], readyToLoad: true})
                }, 750)
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
                        <img key={image.urls.regular} src={image.urls.regular} alt={image.alt_description}></img>
                    )
                })
       }
    }

    scroll = () => {
        window.addEventListener('scroll', () =>{
            if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && this.state.readyToLoad === true){
                this.setState({readyToLoad: false})
                setTimeout(() => {this.getImages()}, 500)
            }
        })
    }

    renderLoader(){
        return(
            <div className="infinity-loader" id="loader">
                <img className="infinity-loader-image" src={Loader} alt="loading..."></img>
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