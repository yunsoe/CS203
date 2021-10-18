import React, { Component } from 'react';
import Cards from './CardUI';



export default class NewsDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            News: [],
            isLoaded: false,
        };
    }
    

    getNewsData() {

        fetch('https://newsapi.org/v2/top-headlines?q=covid&country=sg&apiKey=c01cde2cf83347a9acda8bfa4287242f')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    News: json.articles,
                })
            });
      

        /* Manual Fetch */
        // fetch('http://localhost:8080/news')
        //     .then(res => res.json())
        //     .then(json => {
        //         this.setState({
        //             isLoaded: true,
        //             News: json,
        //         })
        //     });
    }

    componentDidMount(){
        this.getNewsData()
    }

    render() {
        var { News, isLoaded } = this.state; 

        if(!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className='news'>
                        {News.slice(0, 7).map(News => (
                            <div className='container fluid d-flex justify-content-center' key={News.id}> 
                            <div className='row'>
                                <div className='col-md-4'>
                                    <Cards url={News.urlToImage} title={News.title} des={News.publishedAt} link={News.url} />
                                </div>
                            </div>
                        </div>
                        ))};
                </div>
            )
        }
    }
}