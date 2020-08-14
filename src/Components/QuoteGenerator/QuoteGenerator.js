import React, {Component} from 'react';
import './QuoteGenerator.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTwitter} from '@fortawesome/free-brands-svg-icons'; 
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'

class QuoteGenerator extends Component{
    constructor(props){
        super(props);

        this.state = {
            quote: ''
        }
    }
    componentDidMount(){
        this.getNewQuote()
    }

    getNewQuote = async() =>{
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
        try{
            const response = await fetch(proxyUrl + apiUrl).then(res => res.json()).then(result => this.setState({quote: result}));
            return response;
            
        }catch(error){
            this.getNewQuote();
            console.log("whoops, no quote", error)
        }
    }
    render(){
        return(
            <div className="main-wrapper"> 
                <div className="quote-container" id="quote-container">
                   <div className="quote-text">
                        <FontAwesomeIcon className="fa-quote-left" icon={faQuoteLeft}/>
                        <span id="quote">{this.state.quote.quoteText}</span>
                   </div>
                   <div className="quote-author">
                    <span id="author">{this.state.quote.quoteAuthor !== '' ? this.state.quote.quoteAuthor : 'Unknown'}</span>
                   </div>
                   <div className="button-container">
                        <button className="twitter-button" id="twitter" title="Tweet This!">
                            <FontAwesomeIcon className="fa-twitter" icon={faTwitter}/>
                        </button>
                        <button id="new-quote" onClick={() => this.getNewQuote()}>New Quote</button>
                   </div>
                </div>
            </div>
        )
    }
}

export default QuoteGenerator