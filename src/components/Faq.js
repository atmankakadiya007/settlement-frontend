import React, { Fragment } from 'react';


function Faq (){
    return (
        <Fragment>
            <section className="tax-line">
                <div className="container">
                <p>After successfull NSW launch, soon we are launching in QLD and other Australian states!<br />
                </p> 
                </div>
            </section>
            <section className="meet spacing">
                <div className="container">
                    <div className="head">
                        <h2>FAQ - How can we help you?</h2>
                        <h6>Common Questions. Simple Answers</h6>
                    </div>
                    <div className="freqently_asked_questions">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#owners" role="tab" aria-controls="home" aria-selected="true">Owners</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#tenants" role="tab" aria-controls="profile" aria-selected="false">Tenants</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="owners" role="tabpanel" aria-labelledby="home-tab">
                            <div className="questions_list">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#general" role="tab" aria-controls="home" aria-selected="true">General</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#inspection" role="tab" aria-controls="profile" aria-selected="false">Inspection</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="contact-tab" data-toggle="tab" href="#insurance" role="tab" aria-controls="contact" aria-selected="false">Insurance</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="contact-tab" data-toggle="tab" href="#leasing" role="tab" aria-controls="contact" aria-selected="false">Leasing</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="contact-tab" data-toggle="tab" href="#maintenance" role="tab" aria-controls="contact" aria-selected="false">Maintenance</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="contact-tab" data-toggle="tab" href="#rent_Guarantee" role="tab" aria-controls="contact" aria-selected="false">Rent Guarantee</a>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active general_questions" id="general" role="tabpanel" aria-labelledby="home-tab">
                                        <div id="accordion">
                                            <div className="card">
                                                <div className="card-header" id="headingOne">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                        Why did you start Different?
                                                        </button>
                                                    </h5>
                                                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                                        <div className="card-body">
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. 
                                                        </div>
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="card">
                                                <div className="card-header" id="headingTwo">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                            What services do you offer?
                                                        </button>
                                                    </h5>
                                                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                                        <div className="card-body">
                                                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                                                        </div>
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="card">
                                                <div className="card-header" id="headingThree">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                        Where is your service available?
                                                        </button>
                                                    </h5>
                                                    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                                        <div className="card-body">
                                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                                                        </div>
                                                    </div>
                                                </div>  
                                            </div>
                                            <div className="card">
                                                <div className="card-header" id="headingFour">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                                        Are you a real estate agent or just software?
                                                        </button>
                                                    </h5>
                                                    <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordion">
                                                        <div className="card-body">
                                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                                                        </div>
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="card">
                                                <div className="card-header" id="headingFive">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                                        Different a licensed real estate agency?
                                                        </button>
                                                    </h5>
                                                    <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-parent="#accordion">
                                                        <div className="card-body">
                                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="card-header" id="headingSix">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                                        What is your experience?
                                                        </button>
                                                    </h5>
                                                    <div id="collapseSix" className="collapse" aria-labelledby="headingSix" data-parent="#accordion">
                                                        <div className="card-body">
                                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.
                                                        </div>
                                                    </div>
                                                </div>  
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade general_questions" id="inspection" role="tabpanel" aria-labelledby="profile-tab">
                                        <div id="accordion">
                                            <div className="card">
                                                <div className="card-header" id="headingOne1">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne1" aria-expanded="true" aria-controls="collapseOne1">
                                                            Why did you start Different?
                                                        </button>
                                                    </h5>
                                                    <div id="collapseOne1" className="collapse show" aria-labelledby="headingOne1" data-parent="#accordion">
                                                        <div className="card-body">
                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. 
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="card-header" id="headingTwo2">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo2" aria-expanded="false" aria-controls="collapseTwo2">
                                                        Collapsible Group Item #2
                                                        </button>
                                                    </h5>
                                                    <div id="collapseTwo2" className="collapse" aria-labelledby="headingTwo2" data-parent="#accordion">
                                                        <div className="card-body">
                                                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="card-header" id="headingThree3">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree3" aria-expanded="false" aria-controls="collapseThree3">
                                                        Collapsible Group Item #3
                                                        </button>
                                                    </h5>
                                                    <div id="collapseThree3" className="collapse" aria-labelledby="headingThree3" data-parent="#accordion">
                                                        <div className="card-body">
                                                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade general_questions" id="insurance" role="tabpanel" aria-labelledby="contact-tab">
                                        <div id="accordion">
                                            <div className="card">
                                                <div className="card-header" id="headingOne01">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne01" aria-expanded="true" aria-controls="collapseOne01">
                                                            Why did you start Different?
                                                        </button>
                                                    </h5>
                                                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne01" data-parent="#accordion">
                                                        <div className="card-body">
                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. 
                                                        </div>
                                                    </div>
                                                </div>      
                                            </div>
                                            <div className="card">
                                                <div className="card-header" id="headingTwo02">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo02" aria-expanded="false" aria-controls="collapseTwo02">
                                                        Collapsible Group Item #2
                                                        </button>
                                                    </h5>
                                                    <div id="collapseTwo02" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                                        <div className="card-body">
                                                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="card-header" id="headingThree03">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree03" aria-expanded="false" aria-controls="collapseThree03">
                                                        Collapsible Group Item #3
                                                        </button>
                                                    </h5>
                                                    <div id="collapseThree03" className="collapse" aria-labelledby="headingThree03" data-parent="#accordion">
                                                        <div className="card-body">
                                                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade general_questions" id="leasing" role="tabpanel" aria-labelledby="profile-tab">
                                        <div id="accordion">
                                            <div className="card">
                                                <div className="card-header" id="headingOne001">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne001" aria-expanded="true" aria-controls="collapseOne001">
                                                            Why did you start Different?
                                                        </button>
                                                    </h5>
                                                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne001" data-parent="#accordion">
                                                        <div className="card-body">
                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. 
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="card-header" id="headingTwo002">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo002" aria-expanded="false" aria-controls="collapseTwo002">
                                                        Collapsible Group Item #2
                                                        </button>
                                                    </h5>
                                                    <div id="collapseTwo002" className="collapse" aria-labelledby="headingTwo002" data-parent="#accordion">
                                                        <div className="card-body">
                                                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="card-header" id="headingThree003">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree003" aria-expanded="false" aria-controls="collapseThree003">
                                                        Collapsible Group Item #3
                                                        </button>
                                                    </h5>
                                                    <div id="collapseThree003" className="collapse" aria-labelledby="headingThree003" data-parent="#accordion">
                                                        <div className="card-body">
                                                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade general_questions" id="maintenance" role="tabpanel" aria-labelledby="contact-tab">
                                        <div id="accordion">
                                            <div className="card">
                                                <div className="card-header" id="headingOne_1">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne_1" aria-expanded="true" aria-controls="collapseOne_1">
                                                            Why did you start Different?
                                                        </button>
                                                    </h5>
                                                    <div id="collapseOne_1" className="collapse show" aria-labelledby="headingOne_1" data-parent="#accordion">
                                                        <div className="card-body">
                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. 
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="card-header" id="headingTwo_2">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo_2" aria-expanded="false" aria-controls="collapseTwo_2">
                                                        Collapsible Group Item #2
                                                        </button>
                                                    </h5>
                                                    <div id="collapseTwo_2" className="collapse" aria-labelledby="headingTwo_2" data-parent="#accordion">
                                                        <div className="card-body">
                                                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="card-header" id="headingThree_3">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree_3" aria-expanded="false" aria-controls="collapseThree_3">
                                                        Collapsible Group Item #3
                                                        </button>
                                                    </h5>
                                                    <div id="collapseThree_3" className="collapse" aria-labelledby="headingThree_3" data-parent="#accordion">
                                                        <div className="card-body">
                                                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade general_questions" id="rent_guarantee" role="tabpanel" aria-labelledby="contact-tab">
                                        <div id="accordion">
                                            <div className="card">
                                                <div className="card-header" id="headingOne_01">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne_01" aria-expanded="true" aria-controls="collapseOne_01">
                                                            Why did you start Different?
                                                        </button>
                                                    </h5>
                                                    <div id="collapseOne_01" className="collapse show" aria-labelledby="headingOne_01" data-parent="#accordion">
                                                        <div className="card-body">
                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. 
                                                        </div>
                                                    </div>
                                                </div>    
                                            </div>
                                            <div className="card">
                                                <div className="card-header" id="headingTwo_02">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo_02" aria-expanded="false" aria-controls="collapseTwo_02">
                                                        Collapsible Group Item #2
                                                        </button>
                                                    </h5>
                                                    <div id="collapseTwo_02" className="collapse" aria-labelledby="headingTwo_02" data-parent="#accordion">
                                                        <div className="card-body">
                                                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="card-header" id="headingThree_03">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree_03" aria-expanded="false" aria-controls="collapseThree_03">
                                                        Collapsible Group Item #3
                                                        </button>
                                                    </h5>
                                                    <div id="collapseThree_03" className="collapse" aria-labelledby="headingThree_03" data-parent="#accordion">
                                                        <div className="card-body">
                                                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="tenants" role="tabpanel" aria-labelledby="tenants-tab">
                            <div className="questions_list">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#general" role="tab" aria-controls="home" aria-selected="true">General</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#inspection" role="tab" aria-controls="profile" aria-selected="false">Inspection</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="contact-tab" data-toggle="tab" href="#insurance" role="tab" aria-controls="contact" aria-selected="false">Insurance</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="contact-tab" data-toggle="tab" href="#leasing" role="tab" aria-controls="contact" aria-selected="false">Leasing</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="contact-tab" data-toggle="tab" href="#maintenance" role="tab" aria-controls="contact" aria-selected="false">Maintenance</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="contact-tab" data-toggle="tab" href="#rent_Guarantee" role="tab" aria-controls="contact" aria-selected="false">Rent Guarantee</a>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active general_questions" id="general" role="tabpanel" aria-labelledby="home-tab">
                                        <div id="accordion">
                                            <div className="card">
                                                <div className="card-header" id="headingOne_001">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne_001" aria-expanded="true" aria-controls="collapseOne_001">
                                                        Collapsible Group Item #1
                                                        </button>
                                                    </h5>
                                                    <div id="collapseOne_001" className="collapse show" aria-labelledby="headingOne_001" data-parent="#accordion">
                                                        <div className="card-body">
                                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                                        </div>
                                                    </div>
                                                </div>  
                                            </div>
                                            <div className="card">
                                                <div className="card-header" id="headingTwo_002">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo_002" aria-expanded="false" aria-controls="collapseTwo_002">
                                                        Collapsible Group Item #2
                                                        </button>
                                                    </h5>
                                                    <div id="collapseTwo_002" className="collapse" aria-labelledby="headingTwo_002" data-parent="#accordion">
                                                        <div className="card-body">
                                                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div className="card">
                                                <div className="card-header" id="headingThree_003">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree_003" aria-expanded="false" aria-controls="collapseThree_003">
                                                            Collapsible Group Item #3
                                                        </button>
                                                    </h5>
                                                    <div id="collapseThree_003" className="collapse" aria-labelledby="headingThree_003" data-parent="#accordion">
                                                        <div className="card-body">
                                                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="inspection" role="tabpanel" aria-labelledby="profile-tab">...</div>
                                    <div className="tab-pane fade" id="insurance" role="tabpanel" aria-labelledby="contact-tab">...</div>
                                    <div className="tab-pane fade" id="leasing" role="tabpanel" aria-labelledby="profile-tab">...</div>
                                    <div className="tab-pane fade" id="maintenance" role="tabpanel" aria-labelledby="contact-tab">...</div>
                                    <div className="tab-pane fade" id="rent_guarantee" role="tabpanel" aria-labelledby="contact-tab">...</div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>  
            </div>
        </section>
        <section className="check-service spacing">
            <div className="container">
                <div className="head">
                    <h2>Check if we service your area</h2>
                </div>
                <div className="col-lg-6 offset-lg-3">
                    <div className="location_search">
                        <input type="text" placeholder="Search by suburb or postcode"/>
                        <button type="button" className="btn">check location</button>
                    </div>
                </div>
            </div>
        </section>
   </Fragment>)
}

export default Faq