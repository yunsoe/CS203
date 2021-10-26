import React, { Component } from 'react';
import './regstyle.css';



export default class RegDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            News: [],
            isLoaded: false,
        };
    }
    

    getNewsData() {

        fetch('http://localhost:8080/api/v1/CMS/news')
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

    base_API = "https://www.gobusiness.gov.sg";

    render() {

        var { News, isLoaded } = this.state; 
        
            return (
                
                <div className='news'>
                    <div className='content'>
                        {/* <h2 id='sector-specific-requirements'>Sector Specific Requirements</h2> */}
                        <h4>Businesses must adhere to sector-specific requirements as stipulated below, in addition to the   
                             <a href="https://www.gobusiness.gov.sg/safemanagement/general/">general requirements</a>
                            .
                        </h4>

                        <ul class="jekyllcodex_accordion">
                            <li>
                                <input id="accordion1" type="checkbox"/>
                                <label for="accordion1">
                                {News[0]}
                                </label>
                                <div>
                                    <p>
                                        Accounting practices are to comply to measures stipulated in this 
                                        <a href={this.base_API + News[1]} target="_blank" rel="noreferrer">document</a>
                                        . You can also refer to the Institute of Singapore Chartered Accountants 
                                        <a href={News[2]} target="_blank" rel="noreferrer">website</a>
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion2" type="checkbox"/>
                                <label for="accordion2">
                                {News[4]}
                                </label>
                                <div>
                                    <p>
                                        Arts and culture stakeholders are to comply to measures stipulated in this  
                                        <a href={this.base_API + News[5]} target="_blank" rel="noreferrer">document</a>
                                        , the FET 
                                        <a href={this.base_API + News[6]} target="_blank" rel="noreferrer">document</a>
                                        , and the VoRT
                                        <a href={this.base_API + News[7]} target="_blank" rel="noreferrer">document</a>
                                        . You can also refer to the National Arts Council 
                                        <a href={News[8]} target="_blank" rel="noreferrer">website</a>
                                        .
                                    </p>
                                    <p>
                                        Museum stakeholders are to comply to measures stipulated in this   
                                        <a href={this.base_API + News[9]} target="_blank" rel="noreferrer">document</a>
                                        . You can also refer to the National Heritage Board
                                        <a href={News[10]} target="_blank" rel="noreferrer">website</a>
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion3" type="checkbox"/>
                                <label for="accordion3">
                                {News[11]}
                                </label>
                                <div>
                                    <p>
                                        Attractions operators are to comply to measures stipulated in this  
                                        <a href={this.base_API + News[12]} target="_blank" rel="noreferrer">document</a>
                                        . You can also refer to the Singapore Tourism Board 
                                        <a href={News[13]} target="_blank" rel="noreferrer">website</a>
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion4" type="checkbox"/>
                                <label for="accordion4">
                                {News[14]}
                                </label>
                                <div>
                                    <p>
                                        Enterprises in the construction sector are to comply to measures stipulated in this 
                                        <a href={this.base_API + News[15]} target="_blank" rel="noreferrer">document</a>
                                        , and this
                                        <a href={this.base_API + News[16]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                    <p>
                                        Enterprises undertaking renovation works and building works for residential properties from 2 June 2020 are to comply to measures stipulated in this 
                                        <a href={this.base_API + News[17]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                    <p>
                                        Enterprises employing foreign workers registered with MOM under construction account are to refer to BCA’s Circular on 
                                        permission for companies to resume work from 10 August 2020 and review of COVID-Safe accommodation criteria in this 
                                        <a href={this.base_API + News[18]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                    <p>
                                        Enterprises in the construction sector are to comply to measures stipulated in this 
                                        <a href={this.base_API + News[19]} target="_blank" rel="noreferrer">document </a>
                                         on measures relating to the implementation of staggered rest days for Work Permit and S Pass holders
                                        .
                                    </p>
                                    <p>
                                        Enterprises in the construction section are to comply to mandatory measures stipulated in this 
                                        <a href={this.base_API + News[20]} target="_blank" rel="noreferrer">FET-RRT Notice</a>
                                        .
                                    </p>
                                    <p>
                                        All enterprises in the construction sector and enterprises under regulatory workheads RW02 (lift contractors) and 
                                        RW03 (escalator contractors) are to comply with the Vaccinate or Regular Test (VoRT) regime, stipulated in this 
                                        <a href={this.base_API + News[21]} target="_blank" rel="noreferrer">VoRT notice</a>
                                        .
                                    </p>
                                    <p>
                                        For the latest updates from BCA, companies can visit BCA’s COVID-19  
                                        <a href={News[22]} target="_blank" rel="noreferrer">website </a>
                                        or subscribe to BCA’s channel on the Telegram app 
                                        <a href={News[23]} target="_blank" rel="noreferrer">https://t.me/BCASingapore</a>
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion5" type="checkbox"/>
                                <label for="accordion5">
                                {News[24]}
                                </label>
                                <div>
                                    <p>
                                        Cinema operators are to comply to measures stipulated on the Infocomm Media Development Authority  
                                        <a href={News[25]} target="_blank" rel="noreferrer">website</a>
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion6" type="checkbox"/>
                                <label for="accordion6">
                                {News[26]}
                                </label>
                                <div>
                                    <p>
                                        Country and recreation clubs are to comply to measures stipulated in this   
                                        <a href={this.base_API + News[27]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion7" type="checkbox"/>
                                <label for="accordion7">
                                {News[28]}
                                </label>
                                <div>
                                    <p>
                                        All enterprises that operate within the following critical food supply nodes (“Nodes”) – (a) Jurong Fishery Port; (b) Senoko Fishery Port; (c) Changi Creek; (d) Pasir Panjang Wholesale Centre; 
                                        (e) abattoirs; and (f) slaughterhouses (“Enterprises”) are to comply with the Vaccinate or Regular Test (“VoRT”) regime, stipulated in this   
                                        <a href={this.base_API + News[29]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion8" type="checkbox"/>
                                <label for="accordion8">
                                {News[30]}
                                </label>
                                <div>
                                    <p>
                                        Disinfection companies (companies listed on NEA’s website providing disinfection services at non-healthcare premises exposed to confirmed COVID-19 cases) 
                                        are to comply with the mandatory Fast and Easy Testing (FET) and Vaccinate or Regular Test (VoRT) regime for disinfection workers, 
                                        with the measures stipulated in these notices:  
                                    </p>
                                    <p>
                                        <a href={this.base_API + News[31]} target="_blank" rel="noreferrer">FET Notice</a>
                                    </p>

                                    <p>
                                        <a href={this.base_API + News[32]} target="_blank" rel="noreferrer">VoRT Notice</a>
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion9" type="checkbox"/>
                                <label for="accordion9">
                                {News[37]}
                                </label>
                                <div>
                                    <p>
                                        Dormitory operators are to comply to measures stipulated in this    
                                        <a href={this.base_API + News[38]} target="_blank" rel="noreferrer">document </a>
                                         on measures relating to the implementation of staggered rest days for dormitory residents
                                        .
                                    </p>
                                    <p>
                                        All enterprises that provide services within migrant worker dormitories, migrant worker recreation centres and migrant worker onboarding centres are to comply to VoRT measures stipulated in this    
                                        <a href={this.base_API + News[39]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion10" type="checkbox"/>
                                <label for="accordion10">
                                {News[40]}
                                </label>
                                <div>
                                    <p>
                                        All driving schools and private driving instructors are to comply to VoRT measures stipulated in this    
                                        <a href={this.base_API + News[41]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion11" type="checkbox"/>
                                <label for="accordion11">
                                {News[42]}
                                </label>
                                <div>
                                    <p>
                                        Private tuition and enrichment providers are to comply to measures stipulated in the     
                                        <a href={this.base_API + News[43]} target="_blank" rel="noreferrer">Notification </a>
                                        on Suspension of In-Person Tuition and Enrichment and 
                                        <a href={this.base_API + News[44]} target="_blank" rel="noreferrer">Advisory </a>
                                        on Safe Management Measures for Private Tuition and Enrichment
                                        .
                                    </p>
                                    <p>
                                        For more information on Fast and Easy Testing (FET) and Vaccinate or Regular Test (VoRT) in the Private Tuition and Enrichment Sector, please refer to the     
                                        <a href={this.base_API + News[45]} target="_blank" rel="noreferrer">FET Notice </a>
                                        on Suspension of In-Person Tuition and Enrichment, 
                                        <a href={this.base_API + News[46]} target="_blank" rel="noreferrer">VoRT Notice</a>
                                        , and visit
                                        <a href={News[47]} target="_blank" rel="noreferrer">https://go.gov.sg/tuition-enrichment-fet</a>
                                        .
                                    </p>
                                    <p>
                                        SSG-funded/supported CET Providers (excluding Institutes of Higher Learning) are to comply to measures stipulated     
                                        <a href={News[48]} target="_blank" rel="noreferrer">here</a>
                                        . All training providers are to comply to the FET measures stipulated in this  
                                        <a href={this.base_API + News[49]} target="_blank" rel="noreferrer">document </a>
                                         and VoRT measures stipulated in this 
                                        <a href={this.base_API + News[50]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                    <p>
                                        Private Education Institutions (PEIs) are to comply to the SMMs stipulated in this      
                                        <a href={this.base_API + News[51]} target="_blank" rel="noreferrer">document</a>
                                        , and updated requirements on FET-RRT and VoRT, as stipulated in the   
                                        <a href={this.base_API + News[52]} target="_blank" rel="noreferrer">FET-RRT Notice </a>
                                         and  
                                        <a href={this.base_API + News[53]} target="_blank" rel="noreferrer">VoRT Notice </a>
                                         respectively
                                        .
                                    </p>
                                    <p>
                                        Privately-Funded Schools (PFSs) are to comply to the FET measures stipulated in this       
                                        <a href={this.base_API + News[54]} target="_blank" rel="noreferrer">document </a>
                                        and VoRT measures stipulated in this 
                                        <a href={this.base_API + News[55]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion12" type="checkbox"/>
                                <label for="accordion12">
                                {News[56]}
                                </label>
                                <div>
                                    <p>
                                        Estate agents and real estate salespersons are to comply to measures stipulated in this     
                                        <a href={this.base_API + News[57]} target="_blank" rel="noreferrer">document</a>
                                        . You can also refer to Council for Estate Agencies 
                                        <a href={News[58]} target="_blank" rel="noreferrer">website</a>
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion13" type="checkbox"/>
                                <label for="accordion13">
                                {News[59]}
                                </label>
                                <div>
                                    <p>
                                        Enterprises in the finance sector are to comply to measures stipulated in this      
                                        <a href={this.base_API + News[60]} target="_blank" rel="noreferrer">document</a>
                                        . You can also refer to the Monetary Authority of Singapore  
                                        <a href={News[61]} target="_blank" rel="noreferrer">website</a>
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion14" type="checkbox"/>
                                <label for="accordion14">
                                {News[62]}
                                </label>
                                <div>
                                    <p>
                                        All Fruit Machine Rooms (FMRs) are to comply to measures stipulated in this       
                                        <a href={this.base_API + News[63]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion15" type="checkbox"/>
                                <label for="accordion15">
                                {News[64]}
                                </label>
                                <div>
                                    <p>
                                        Enterprises in the funeral sector are to comply to measures stipulated in this        
                                        <a href={this.base_API + News[65]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion16" type="checkbox"/>
                                <label for="accordion16">
                                {News[66]}
                                </label>
                                <div>
                                    <p>
                                        F&B establishments are to comply to measures stipulated         
                                        <a href={News[67]} target="_blank" rel="noreferrer">here</a>
                                        .
                                    </p>
                                    <p>
                                        In addition, all dine-in F&B establishments, establishments in malls, and establishments with in-house last-mile delivery 
                                        personnel are to comply to the mandatory Fast and Easy Testing (FET) regime and Vaccinate or Regular Test (VoRT) regime 
                                        for employees, with the measures stipulated in these notices:
                                    </p>
                                    <p>
                                        <a href={this.base_API + News[68]} target="_blank" rel="noreferrer">FET Notice</a>
                                        .
                                    </p>
                                    <p>
                                        <a href={this.base_API + News[69]} target="_blank" rel="noreferrer">VoRT Notice</a>
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion17" type="checkbox"/>
                                <label for="accordion17">
                                {News[74]}
                                </label>
                                <div>
                                    <p>
                                        All enterprises that operate Government Quarantine Facilities (“GQF(s)”) and 
                                        Stay-Home Notice Dedicated Facilities (“SDF(s)”) or deploy security personnel to GQFs and SDFs are to 
                                        comply with the requirements of the Vaccinate or Regular Test (VoRT) regime as stipulated in this         
                                        <a href={this.base_API + News[75]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion18" type="checkbox"/>
                                <label for="accordion18">
                                {News[76]}
                                </label>
                                <div>
                                    <p>
                                        All enterprises in the Healthcare and Community care sectors are to comply with the Vaccinate or 
                                        Regular Test (“VoRT”) regime, stipulated in this          
                                        <a href={this.base_API + News[77]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion19" type="checkbox"/>
                                <label for="accordion19">
                                {News[78]}
                                </label>
                                <div>
                                    <p>
                                        Hostels are to comply to the measures stipulated in this          
                                        <a href={this.base_API + News[79]} target="_blank" rel="noreferrer">document</a>
                                        . You can also refer to the Singapore Tourism Board 
                                        <a href={News[80]} target="_blank" rel="noreferrer">website</a>
                                        .
                                    </p>
                                    <p>
                                        For Annex A, please refer to this         
                                        <a href={this.base_API + News[81]} target="_blank" rel="noreferrer">document</a>
                                        . For Annex B, please refer to this 
                                        <a href={this.base_API + News[82]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                    <p>
                                        In addition, hostels are to comply to the mandatory Fast and Easy Testing (FET) regime for relevant employees, 
                                        with the measures stipulated in this        
                                        <a href={this.base_API + News[83]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                    <p>
                                        All hostels are to comply with the requirements of the Vaccinate or Regular Test (VoRT) regime as stipulated in this         
                                        <a href={this.base_API + News[84]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion20" type="checkbox"/>
                                <label for="accordion20">
                                {News[85]}
                                </label>
                                <div>
                                    <p>
                                        Hotels are to comply to measures stipulated in this          
                                        <a href={this.base_API + News[86]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                    <p>
                                        You can also refer to the Singapore Tourism Board         
                                        <a href={News[87]} target="_blank" rel="noreferrer">website</a>
                                        .
                                    </p>
                                    <p>
                                        In addition, hotels are to comply to the mandatory Fast and Easy Testing (FET) regime for relevant employees, 
                                        with the measures stipulated in this          
                                        <a href={this.base_API + News[88]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                    <p>
                                        All hotels are to comply with the requirements of the Vaccinate or Regular Test (VoRT) regime as stipulated in this         
                                        <a href={this.base_API + News[89]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion21" type="checkbox"/>
                                <label for="accordion21">
                                {News[90]}
                                </label>
                                <div>
                                    <p>
                                        All landscape-related services and nurseries will resume, subject to safe management measures as 
                                        required by MOM and NParks. More information for the landscape sector is available      
                                        <a href={News[91]} target="_blank" rel="noreferrer">here</a>
                                        . For further clarification, email
                                        <a href={News[92]} target="_blank" rel="noreferrer">NParks_Industry@nparks.gov.sg</a>
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion22" type="checkbox"/>
                                <label for="accordion22">
                                {News[93]}
                                </label>
                                <div>
                                    <p>
                                        With effect from 27 September 2021, marriage solemnisations and wedding receptions are required to comply 
                                        to measures stipulated in this       
                                        <a href={this.base_API + News[94]} target="_blank" rel="noreferrer">document</a>
                                        , depending on venue
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion23" type="checkbox"/>
                                <label for="accordion23">
                                {News[95]}
                                </label>
                                <div>
                                    <p>
                                        Enterprises in the M&O sector are to comply with the COVID-Safe restart criteria for shipyards, resident contractors and common contractors       
                                        <a href={this.base_API + News[96]} target="_blank" rel="noreferrer">here</a>
                                        .
                                    </p>
                                    <p>
                                        For FAQ regarding COVID-Safe restart criteria, please refer to this 
                                        <a href={this.base_API + News[97]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                    <p>
                                        For more details on the implementation of Sea Crew Vaccination Initiative (SEAVAX) for foreign 
                                        Not-to-Land (NTL) Sea Crew at Shipyards, please refer to this 
                                        <a href={this.base_API + News[98]} target="_blank" rel="noreferrer">document </a>
                                        and the supporting documents:
                                    </p>
                                    <p>
                                        <a href={this.base_API + News[99]} target="_blank" rel="noreferrer">Order Form for Moderna</a>
                                    </p>
                                    <p>
                                        <a href={this.base_API + News[100]} target="_blank" rel="noreferrer">Daily Vaccination Site Reporting Template</a>
                                    </p>
                                    <p>
                                        <a href={this.base_API + News[101]} target="_blank" rel="noreferrer">Nominal Roll Template</a>
                                    </p>
                                    <p>
                                        Enterprises in the M&O sectors are to implement mandatory Antigen Rapid Test (ART) for non-dormitory personnel 
                                        entering the production areas of marine shipyards, with effect from 10 August 2021. Please refer to this 
                                        <a href={this.base_API + News[102]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                    <p>
                                        All enterprises are to comply with the testing requirements stipulated in this 
                                        <a href={this.base_API + News[103]} target="_blank" rel="noreferrer">cover letter </a>
                                        and
                                        <a href={this.base_API + News[104]} target="_blank" rel="noreferrer">VoRT notice</a>
                                        .
                                    </p>
                                    <p>
                                        Marine sectors are to implement “Vaccinate or Regular Test (VoRT)” regime from 1 October 2021 as outlined in this 
                                        <a href={this.base_API + News[105]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                    <p>
                                        For more information on the Rostered Routine Testing and Charging Policy for Workers in Marine Sectors, please refer to this 
                                        <a href={this.base_API + News[106]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                    <p>
                                        For more information on the Updated Heightened Mandatory Precautionary Measures for all ships arriving at 
                                        EDB/ESG-managed shipyards for repairs or at EDB/ESG-managed process terminals and shipyards for contact/contactless operations, 
                                        please refer to this 
                                        <a href={this.base_API + News[107]} target="_blank" rel="noreferrer">document </a>
                                        and this
                                        <a href={this.base_API + News[108]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                    <p>
                                        For more information on COVID-19 healthcare protocols for the Marine Sector, please refer to this  
                                        <a href={this.base_API + News[109]} target="_blank" rel="noreferrer">document</a>
                                        ,
                                        <a href={this.base_API + News[110]} target="_blank" rel="noreferrer">PPT </a>
                                        and
                                        <a href={this.base_API + News[111]} target="_blank" rel="noreferrer">FAQ</a>
                                        .
                                    </p>
                                    <p>
                                        For more information on the Transition to 3 Day FET for Workers on 7 day PCR RRT in Marine Sectors, please refer to this 
                                        <a href={this.base_API + News[112]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion24" type="checkbox"/>
                                <label for="accordion24">
                                {News[119]}
                                </label>
                                <div>
                                    <p>
                                        All enterprises in or serving the maritime sector are to comply with the testing requirements stipulated in this    
                                        <a href={this.base_API + News[120]} target="_blank" rel="noreferrer">document</a>
                                        , 
                                        <a href={this.base_API + News[121]} target="_blank" rel="noreferrer">RRT notice </a>
                                        and
                                        <a href={this.base_API + News[122]} target="_blank" rel="noreferrer">VoRT Notice</a>
                                        .
                                    </p>
                                    <p>
                                        Port operators and pilotage service provider are to comply to measures stipulated in this     
                                        <a href={this.base_API + News[123]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                    <p>
                                        Regional Ferry Terminal Operator are to comply to measures stipulated in this      
                                        <a href={this.base_API + News[124]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                    <p>
                                        Relevant marina operators are to comply to measures stipulated in this       
                                        <a href={this.base_API + News[125]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion25" type="checkbox"/>
                                <label for="accordion25">
                                {News[126]}
                                </label>
                                <div>
                                    <p>
                                        Media content productions are to comply with the Mandatory Safety Rules for the Resumption of Content 
                                        Productions and accompanying FAQs published on the Infocomm Media Development Authority 
                                        <a href={News[127]} target="_blank" rel="noreferrer">website</a>
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion26" type="checkbox"/>
                                <label for="accordion26">
                                {News[128]}
                                </label>
                                <div>
                                    <p>
                                        Event Organisers and Event Venues (collectively “EOs”) must submit an application for STB’s assessment 
                                        and approval from the Ministry of Trade and Industry (MTI). EOs may proceed only upon obtaining MTI’s written approval. 
                                        Please refer to the Singapore Tourism Board 
                                        <a href={News[129]} target="_blank" rel="noreferrer">website </a>
                                        for more information on the Safe Management Measures for MICE events, application process and FAQs. 
                                        Alternatively, you may also refer to this 
                                        <a href={this.base_API + News[130]} target="_blank" rel="noreferrer">document </a>
                                        for the latest SMMs
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion27" type="checkbox"/>
                                <label for="accordion27">
                                {News[131]}
                                </label>
                                <div>
                                    <p>
                                        Nightlife operators that were allowed to pivot to F&B operations are to comply to measures stipulated in this 
                                        <a href={this.base_API + News[132]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion28" type="checkbox"/>
                                <label for="accordion28">
                                {News[133]}
                                </label>
                                <div>
                                    <p>
                                        All establishments providing personal care services must comply with the mandatory Fast and Easy Testing (FET) regime for outlet employees, stipulated in this  
                                        <a href={this.base_API + News[134]} target="_blank" rel="noreferrer">document </a>
                                        and requirements of the Vaccinate or Regular Test (VoRT) regime as stipulated in this 
                                        <a href={this.base_API + News[135]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                    <p>
                                        Massage Establishments (MEs) are to comply to measures stipulated in this 
                                        <a href={this.base_API + News[136]} target="_blank" rel="noreferrer">document </a>
                                        . MEs are also encouraged to refer to the 
                                        <a href={this.base_API + News[137]} target="_blank" rel="noreferrer">Best Practices </a>
                                        and adopt the additional measures within, where possible
                                        .
                                    </p>
                                    <p>
                                        With effect from 15 July 2021, all MEs must comply with the mandatory requirements to carry out Fast and Easy Testing (FET) set out in this 
                                        <a href={this.base_API + News[138]} target="_blank" rel="noreferrer">notice</a>
                                        .
                                    </p>
                                    <p>
                                        Starting from 1 Oct 2021, all MEs must also comply with the mandatory requirements of the Vaccinate or Regular Test (VoRT) regime. 
                                        More details can be found in this 
                                        <a href={this.base_API + News[139]} target="_blank" rel="noreferrer">notice</a>
                                        .
                                    </p>
                                    <p>
                                        You can also refer to the Singapore Police Force 
                                        <a href={News[140]} target="_blank" rel="noreferrer">website</a>
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion29" type="checkbox"/>
                                <label for="accordion29">
                                {News[141]}
                                </label>
                                <div>
                                    <p>
                                        In line with the announcement by MTF on 24 Sep 2021, private mahjong (or gambling) rooms will be closed from 27 Sep 2021.
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion30" type="checkbox"/>
                                <label for="accordion30">
                                {News[142]}
                                </label>
                                <div>
                                    <p>
                                        PCM companies and Energy and Chemicals plant owners are to comply with the COVID-safe restart criteria stipulated in this 
                                        <a href={this.base_API + News[143]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                    <p>
                                        For FAQ regarding COVID-Safe restart criteria, please refer to this 
                                        <a href={this.base_API + News[144]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                    <p>
                                        For more information on the TraceTogether contact tracing token, please refer to this 
                                        <a href={this.base_API + News[145]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                    <p>
                                        All enterprises are to comply with the testing requirements stipulated in this 
                                        <a href={this.base_API + News[146]} target="_blank" rel="noreferrer">cover letter </a>
                                        and
                                        <a href={this.base_API + News[147]} target="_blank" rel="noreferrer">VoRT Notice</a>
                                        .
                                    </p>
                                    <p>
                                        Process sectors are to implement “Vaccinate or Regular Test (VoRT)” regime from 1 October 2021 as outlined in this 
                                        <a href={this.base_API + News[148]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                    <p>
                                        For more information on the Rostered Routine Testing and Charging Policy for Workers in Process Sectors, please refer to this  
                                        <a href={this.base_API + News[149]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                    <p>
                                        For more information on the Updated Heightened Mandatory Precautionary Measures for all ships arriving at EDB/ESG-managed shipyards 
                                        for repairs or at EDB/ESG-managed process terminals and shipyards for contact/contactless operations, please refer to this   
                                        <a href={this.base_API + News[150]} target="_blank" rel="noreferrer">document </a>
                                        and this
                                        <a href={this.base_API + News[151]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                    <p>
                                        For more information on COVID-19 healthcare protocols for the Process Sector, please refer to this 
                                        <a href={this.base_API + News[152]} target="_blank" rel="noreferrer">document</a>
                                        ,
                                        <a href={this.base_API + News[153]} target="_blank" rel="noreferrer">PPT </a>
                                        and
                                        <a href={this.base_API + News[154]} target="_blank" rel="noreferrer">FAQ</a>
                                        .
                                    </p>
                                    <p>
                                        For more information on the Transition to 3 Day FET for Workers on 7 day PCR RRT in Process Sectors, please refer to this 
                                        <a href={this.base_API + News[155]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion31" type="checkbox"/>
                                <label for="accordion31">
                                {News[156]}
                                </label>
                                <div>
                                    <p>
                                        Developers are to comply to measures stipulated in this  
                                        <a href={this.base_API + News[157]} target="_blank" rel="noreferrer">document</a>
                                        . You can also refer to the Urban Redevelopment Authority 
                                        <a href={News[158]} target="_blank" rel="noreferrer">website</a>
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion32" type="checkbox"/>
                                <label for="accordion32">
                                {News[159]}
                                </label>
                                <div>
                                    <p>
                                        Public Entertainment (PE) venue operators are to comply to measures stipulated in this   
                                        <a href={this.base_API + News[160]} target="_blank" rel="noreferrer">document</a>
                                        . PE operators are also encouraged to refer to the 
                                        <a href={this.base_API + News[161]} target="_blank" rel="noreferrer">annex </a>
                                        and adopt the additional measures within, where possible 
                                        
                                    </p>
                                    <p>
                                        You can also refer to the Singapore Police Force   
                                        <a href={News[162]} target="_blank" rel="noreferrer">website</a>
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion33" type="checkbox"/>
                                <label for="accordion33">
                                {News[163]}
                                </label>
                                <div>
                                    <p>
                                        Religious organisations are to comply to measures stipulated in this   
                                        <a href={this.base_API + News[164]} target="_blank" rel="noreferrer">document</a>
                                        . You can also refer to the MCCY 
                                        <a href={News[165]} target="_blank" rel="noreferrer">website</a>
                                        .
                                    </p>
                                    <p>
                                        For more information on COVID-19 for the religious sector, please visit  
                                        <a href={News[166]} target="_blank" rel="noreferrer">www.cpro.gov.sg </a>
                                        or contact MCCY’s Crisis Preparedness for Religious Organisations Programme Office at 
                                        <a href={News[167]} target="_blank" rel="noreferrer">cpro@mccy.gov.sg</a>
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion34" type="checkbox"/>
                                <label for="accordion34">
                                {News[168]}
                                </label>
                                <div>
                                    <p>
                                        Retail establishments and lifestyle-related services are to comply to measures stipulated  
                                        <a href={News[169]} target="_blank" rel="noreferrer">here</a>
                                        .
                                    </p>
                                    <p>
                                        In addition, all retail mall operators, operators of large standalone stores, and enterprises 
                                        operating stores or booths located within the premises of retail malls and large standalone stores 
                                        are to comply with the mandatory Fast and Easy Testing (FET) and Vaccinate or Regular Test (VoRT) regimes in the  
                                        <a href={this.base_API + News[170]} target="_blank" rel="noreferrer">FET notice </a>
                                        and 
                                        <a href={this.base_API + News[171]} target="_blank" rel="noreferrer">VoRT notice </a>
                                        respectively
                                        .
                                    </p>
                                    <p>
                                        In addition, all operators of supermarkets (consumer-facing outlets with a Supermarket License from Singapore Food Agency (SFA)) 
                                        are to comply with the mandatory Fast and Easy Testing (FET) and Vaccinate or Regular Test (VoRT) regimes in the 
                                        <a href={this.base_API + News[172]} target="_blank" rel="noreferrer">FET notice </a>
                                        and 
                                        <a href={this.base_API + News[173]} target="_blank" rel="noreferrer">VoRT notice </a>
                                        respectively. Operators of establishments without a Supermarket License from SFA but 
                                        located within a retail mall should comply with the mandatory FET and VoRT regimes for retail mall establishments
                                        .
                                    </p>
                                    <p>
                                        Businesses providing cleaning services at common areas of retail malls are also required 
                                        to comply with the mandatory FET and VoRT requirements set out in the  
                                        <a href={this.base_API + News[174]} target="_blank" rel="noreferrer">FET notice </a>
                                        and the
                                        <a href={this.base_API + News[175]} target="_blank" rel="noreferrer">VoRT notice </a>
                                        respectively
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion35" type="checkbox"/>
                                <label for="accordion35">
                                {News[176]}
                                </label>
                                <div>
                                    <p>
                                        Residential and Community-based Facilities are to comply to measures stipulated in this 
                                        <a href={this.base_API + News[177]} target="_blank" rel="noreferrer">document</a>
                                        . You can also refer to the Ministry of Social and Family Development 
                                        <a href={News[178]} target="_blank" rel="noreferrer">website</a>
                                        .
                                    </p>
                                    <p>
                                        Social Service Agencies and community groups distributing essential aid (i.e. supplies necessary for daily 
                                        sustenance e.g. cooked food and food rations, and urgent financial aid) are to comply to measures stipulated in this 
                                        <a href={this.base_API + News[179]} target="_blank" rel="noreferrer">document</a>
                                        . You can also refer to the Ministry of Social and Family Development 
                                        <a href={News[180]} target="_blank" rel="noreferrer">website</a>
                                        .
                                    </p>
                                    <p>
                                        In addition, all Homes and selected Centres, as indicated in the notice, are to comply with the mandatory 
                                        requirements under Fast and Easy Testing (FET) regime for staff, regular vendors and regular volunteers stipulated in this 
                                        <a href={this.base_API + News[181]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                    <p>
                                        In addition, all Homes, Centres and agencies providing social services, as indicated in the notice, are to comply 
                                        with the mandatory requirements under Vaccinate or Regular Test (VoRT) regime for staff, regular vendors and regular 
                                        volunteers stipulated in this 
                                        <a href={this.base_API + News[182]} target="_blank" rel="noreferrer">document</a>
                                        . You might also wish to refer to the FAQ on 
                                        <a href={News[183]} target="_blank" rel="noreferrer">MSF’s website</a>
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion36" type="checkbox"/>
                                <label for="accordion36">
                                {News[184]}
                                </label>
                                <div>
                                    <p>
                                        Sports sector enterprises, sports education, and premises with sports facilities are to comply to 
                                        measures stipulated in this    
                                        <a href={this.base_API + News[185]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                    <p>
                                        In addition, with effect from 15 Jul 2021 onwards, all sports enterprises, including self-employed persons, 
                                        are to comply to the mandatory Fast and East Testing (FET) regime for relevant employees, with the measures stipulated in this 
                                        <a href={this.base_API + News[186]} target="_blank" rel="noreferrer">document</a>
                                        , and the mandatory VoRT requirements stipulated in this 
                                        <a href={this.base_API + News[187]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                    <p>
                                        Lion Dance Performing Troupes are to comply to measures stipulated in this 
                                        <a href={this.base_API + News[188]} target="_blank" rel="noreferrer">document</a>
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion37" type="checkbox"/>
                                <label for="accordion37">
                                {News[189]}
                                </label>
                                <div>
                                    <p>
                                        Student Care Centres are to comply to the measures stipulated in this    
                                        <a href={this.base_API + News[190]} target="_blank" rel="noreferrer">document</a>
                                        . You can also refer to the 
                                        <a href={News[191]} target="_blank" rel="noreferrer">Student Care Portal </a>
                                        for more details
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion38" type="checkbox"/>
                                <label for="accordion38">
                                {News[192]}
                                </label>
                                <div>
                                    <p>
                                        Tour operators and tourist guides are to comply to measures stipulated in this 
                                        <a href={this.base_API + News[193]} target="_blank" rel="noreferrer">document</a>
                                        . You can also refer to the Singapore Tourism Board
                                        <a href={News[194]} target="_blank" rel="noreferrer">website</a>
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion39" type="checkbox"/>
                                <label for="accordion39">
                                {News[195]}
                                </label>
                                <div>
                                    <p>
                                        All animal and veterinary-related services and activities to resume, as long as they comply with safe 
                                        management measures as required by MOM and the Animal & Veterinary Service, a cluster of NParks. More 
                                        information is available 
                                        <a href={News[196]} target="_blank" rel="noreferrer">here</a>
                                        .
                                    </p>
                                </div>
                            </li>

                            <li>
                                <input id="accordion40" type="checkbox"/>
                                <label for="accordion40">
                                {News[197]}
                                </label>
                                <div>
                                    <p>
                                        Maintenance companies should refer to the following documents on measures relating to the thorough cleaning, 
                                        disinfection and testing before re-opening/re-starting of cooling towers, swimming pools and water fountains:
                                        .
                                    </p>
                                    <p>
                                        NEA’s 
                                        <a href={this.base_API + News[198]} target="_blank" rel="noreferrer">circular </a>
                                        on measures to be taken when re-starting cooling towers.
                                    </p>
                                    <p>
                                        NEA’s 
                                        <a href={this.base_API + News[199]} target="_blank" rel="noreferrer">circular </a>
                                        on measures to be taken when re-opening and re-starting of swimming pools and water fountains
                                    </p>
                                </div>
                            </li>

                        </ul>

                    </div>
                </div>
            )
        
    }
}