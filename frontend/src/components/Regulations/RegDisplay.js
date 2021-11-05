import React, { Component } from 'react';
import './regstyle.css';
import { API_BASE_URL } from '../../constants/apiConstants';

export default class NewsDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            News: [],
            isLoaded: false,
        };
    }
    

    getNewsData() {

        fetch(API_BASE_URL+ 'api/v1/CMS/news')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    News: json,
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
            <div style={{display: "flex", justifyContent: "center", marginTop: 0, marginBottom:100}}>
                <div className="col-12 col-lg-10 login-card mt-2 hv-center" style={{padding:30, paddingTop: 40, paddingBottom: 50, backgroundColor: 'white', borderRadius: 10}}>
                    <h4>Businesses must adhere to sector-specific requirements as stipulated below</h4>
                <ul class="jekyllcodex_accordion">
                        <li>
                            <input id="accordion1" type="checkbox"/>
                            <label for="accordion1">
                            Accounting Practices
                            </label>
                            <div>
                                <p>
                                    Accounting practices are to comply to measures stipulated 
                                    <a href="https://isca.org.sg/covid-19-series/faqs/?j=538131&sfmc_sub=28753357&l=215_HTML&u=10800996&mid=7235277&jb=1" target="_blank" rel="noreferrer">here</a>
                                    . 
                                </p>
                            </div>
                        </li>

                        <li>
                            <input id="accordion2" type="checkbox"/>
                            <label for="accordion2">
                            Arts and Culture
                            </label>
                            <div>
                                <p>
                                    Arts and culture stakeholders are to comply to measures stipulated
                                    <a href="https://www.nac.gov.sg/whatwedo/support/sustaining-the-arts-during-covid-19/Sustaining-the-arts-during-COVID-19.html" target="_blank" rel="noreferrer">here</a>
                                    . 
                                </p>
                            </div>
                        </li>

                        <li>
                            <input id="accordion3" type="checkbox"/>
                            <label for="accordion3">
                            Attractions
                            </label>
                            <div>
                                <p>
                                    Attractions operators are to comply to measures stipulated
                                    <a href="https://www.stb.gov.sg/content/stb/en/home-pages/advisory-for-attractions.html#Attractions" target="_blank" rel="noreferrer">here</a>
                                    . 
                                </p>
                            </div>
                        </li>

                        <li>
                            <input id="accordion4" type="checkbox"/>
                            <label for="accordion4">
                            Aviation Industry
                            </label>
                            <div>
                                <p>
                                    All enterprises in the aviation section are to comply to mandatory measures stipulated
                                    <a href="https://www.caas.gov.sg/about-caas/newsroom" target="_blank" rel="noreferrer">here</a>
                                    . 
                                </p>
                            </div>
                        </li>

                        <li>
                            <input id="accordion5" type="checkbox"/>
                            <label for="accordion5">
                            Built Environment
                            </label>
                            <div>
                                <p>
                                    Enterprises in the construction sector are to comply to measures stipulated
                                    <a href="https://www1.bca.gov.sg/COVID-19" target="_blank" rel="noreferrer">here</a>
                                    . 
                                </p>
                            </div>
                        </li>

                        <li>
                            <input id="accordion6" type="checkbox"/>
                            <label for="accordion6">
                            Education
                            </label>
                            <div>
                                <p>
                                    Personnel and schools in the education sector are to comply to measures stipulated
                                    <a href="https://www.moe.gov.sg/faqs-covid-19-infection" target="_blank" rel="noreferrer">here</a>
                                    . 
                                </p>
                            </div>
                        </li>

                        <li>
                            <input id="accordion7" type="checkbox"/>
                            <label for="accordion7">
                            Finance
                            </label>
                            <div>
                                <p>
                                    Enterprises in the finance sector can view the latest news
                                    <a href="https://www.mas.gov.sg/news?content_type=Media%20Releases" target="_blank" rel="noreferrer">here</a>
                                    . 
                                </p>
                            </div>
                        </li>

                        <li>
                            <input id="accordion8" type="checkbox"/>
                            <label for="accordion8">
                            Food & Beverage
                            </label>
                            <div>
                                <p>
                                    F&B establishments are to comply to measures stipulated
                                    <a href="https://www.sfa.gov.sg/covid-19" target="_blank" rel="noreferrer">here</a>
                                    . 
                                </p>
                            </div>
                        </li>

                        <li>
                            <input id="accordion9" type="checkbox"/>
                            <label for="accordion9">
                            Hotels
                            </label>
                            <div>
                                <p>
                                    Hotels are to comply to measures stipulated
                                    <a href="https://www.stb.gov.sg/content/stb/en/home-pages/advisory-for-hotels.html#Hotels" target="_blank" rel="noreferrer">here</a>
                                    . 
                                </p>
                            </div>
                        </li>

                        <li>
                            <input id="accordion10" type="checkbox"/>
                            <label for="accordion10">
                            Infocomm and Media
                            </label>
                            <div>
                                <p>
                                    Media content productions are to comply with the measures stipulated
                                    <a href="https://www.imda.gov.sg/news-and-events/Media-Room/Media-Releases/2020/Advisories-on-COVID-19-Situation" target="_blank" rel="noreferrer">here</a>
                                    . 
                                </p>
                            </div>
                        </li>

                        <li>
                            <input id="accordion11" type="checkbox"/>
                            <label for="accordion11">
                            Maritime
                            </label>
                            <div>
                                <p>
                                    All enterprises in or serving the maritime sector are to comply with the measures stipulated
                                    <a href="https://www.mpa.gov.sg/web/portal/home/maritime-singapore/what-maritime-singapore-offers/covid-19_for_maritime_community" target="_blank" rel="noreferrer">here</a>
                                    . 
                                </p>
                            </div>
                        </li>

                        <li>
                            <input id="accordion12" type="checkbox"/>
                            <label for="accordion12">
                            Public Entertainment Venues
                            </label>
                            <div>
                                <p>
                                    Public Entertainment (PE) venue operators are to comply to measures stipulated
                                    <a href="https://www.police.gov.sg/e-Services/Police-Licences/Public-Entertainment-Licence" target="_blank" rel="noreferrer">here</a>
                                    . 
                                </p>
                            </div>
                        </li>

                        <li>
                            <input id="accordion13" type="checkbox"/>
                            <label for="accordion13">
                            Point to Point Transport Industry, Public Transport Operators and Contractors
                            </label>
                            <div>
                                <p>
                                   LTS's measures for Covid 19 can be found 
                                    <a href="https://www.lta.gov.sg/content/ltagov/en/industry_innovations/industry_matters/LTA's Measures for COVID-19.html" target="_blank" rel="noreferrer">here</a>
                                    . 
                                </p>
                            </div>
                        </li>

                        <li>
                            <input id="accordion14" type="checkbox"/>
                            <label for="accordion14">
                            Real Estate Agency Industry
                            </label>
                            <div>
                                <p>
                                   Real estate agencies are to comply to measures stipulated
                                    <a href="http://www.cea.gov.sg/covid19" target="_blank" rel="noreferrer">here</a>
                                    . 
                                </p>
                            </div>
                        </li>

                        <li>
                            <input id="accordion15" type="checkbox"/>
                            <label for="accordion15">
                            Tours
                            </label>
                            <div>
                                <p>
                                    Tour operators and tourist guides are to comply to measures stipulated
                                    <a href="https://www.stb.gov.sg/content/stb/en/home-pages/advisory-for-tours.html#Tours" target="_blank" rel="noreferrer">here</a>
                                    . 
                                </p>
                            </div>
                        </li>

                        <li>
                            <input id="accordion16" type="checkbox"/>
                            <label for="accordion16">
                            Tourism Industry
                            </label>
                            <div>
                                <p>
                                    Advisory on COVID-19 for tourism businesses can be found
                                    <a href="https://www.stb.gov.sg/content/stb/en/home-pages/advisory-on-covid-19.html" target="_blank" rel="noreferrer">here</a>
                                    . 
                                </p>
                            </div>
                        </li>

                    </ul>
                    <h6>For more information, please visit <a href="https://www.gobusiness.gov.sg/safemanagement/sector/">this website</a></h6>
                </div>
            </div>
            )
        }
    }
}