import React  from 'react'
import { Link } from 'react-router-dom'


function Category (props){
    return (
        <>
            <section className="category">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="cat_inner">
                                <h2><span>Or</span> Browse The Highlights</h2>
                                <ul className="cat_box">
                                    {props.highlights && props.highlights.length>0 && props.highlights.map((da, index) => {
                                        return <li key={index}>
                                            <Link to={`/search/` + da.master_highlight_id }>
                                                <img alt='...' src={da.master_highlight_icon}></img>{da.master_highlight_label}</Link>
                                            </li>})} 
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )   
}

export default Category