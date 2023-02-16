import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import ViewButton from '../Common/ViewButton'


function Article(props){
    const { articles=[], images={} } = props  
    //console.log(images, "images")

    return (
        <section className="article-grid">
            <div className="container-fluid">
                <div className="directory-header-panel">
                    <div className="text-center w-100">
                        <h2> Articles & Tips </h2>
                    </div>
                </div>
                <div className="container-fluid text-center">
                    <div className="row">
                        {props.articles && (props.articles.length > 0 )? 
                            props.articles.map((article,index) => {
                               // console.log( article.link, "article")
                                return (<div key={index} className="col-md-3">
                                            <div className="property-list-item">
                                                <figure>
                                                    <div className="property_img_container">
                                                    <a href={article.link} target={"_blank"}>
                                                        {images[article.id] && (images[article.id].length > 0) ? 
                                                            <img src={images[article.id][0]['guid']['rendered']}/>
                                                            : <img src="/images/property_listing.png"/>} 
                                                    </a>   
                                                    </div>
                                                    {/* <div className="red-txt">
                                                        <span> Business </span>        
                                                    </div> */}
                                                    <div className="article-title">
                                                        <h4>{article.title.rendered}</h4>
                                                        <div  dangerouslySetInnerHTML={{__html: article.content.rendered }}/>
                                                    </div>
                                                </figure>
                                                <div className="property_price">
                                                    <span> <img src="/images/avatar.png"/> </span>
                                                    <span className="date-txt ml-auto">{moment(article.date).format('DD MMMM, YYYY')}</span>    
                                                </div>
                                            </div>
                                        
                                </div>)
                                }) : <p> No article available.</p>}
                            </div>
                        </div>
                    </div>
                </section>
    )
 }
export default Article