import React, { useState } from 'react'
import { API_URL } from '../../constants/api'

const DetailPageSlider = ({ images }) => {
  const [ activeTab , setActive] = useState(0)
  const [ activeInner , setActiveInner] = useState(0)

  
  return (
    <div className="row">
        <div className="col-12">
            <div className="detail-left-banner">  
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                   <ol className="carousel-indicators">
                     <li data-target="#carouselExampleIndicators"  
                        data-slide-to="0" className={activeTab === 0 ? "active" : ""} 
                        onClick={ () => {
                          setActive(0)
                        }}></li>
                     <li data-target="#carouselExampleIndicators"
                        className={activeTab === 1 ? "active" : ""} 
                        data-slide-to="1" onClick={ () => {
                          setActive(1)
                        }}></li>
                     <li data-target="#carouselExampleIndicators" 
                        data-slide-to="2"
                        className={activeTab === 2 ? "active" : ""}
                        onClick={ () => {
                          setActive(2)
                        }}></li>
                   </ol>
                   {images.length > 0 ? 
                      <div className="carousel-inner">
                        {images.map((image, index) => {
                          return <div key={index} className={activeTab === index ? "carousel-item active" : "carousel-item" }>
                            <img src={API_URL + `property/renderImage?documentID=${image.master_document_uuid}`} alt="First slide"/>
                          </div>})}
                      </div> 
                      : <div className="carousel-inner d-flex align-items-center">
                          <div className="carousel-item active d-flex">
                            <div className="dummy-slider-img">
                              No Image Available
                            </div>
                          </div>
                        </div>}
                   <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                     <span className="sr-only">Previous</span>
                   </a>
                   <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                     <span className="carousel-control-next-icon" aria-hidden="true"></span>
                     <span className="sr-only">Next</span>
                   </a>
                 </div>
            </div>
        </div>
        {/* <div className="col-lg-4 col-md-5 col-xs-12">
            <div className="detail-left-banner h-100">  
                <div id="carouselExampleIndicators1" className="carousel slide" data-ride="carousel">
                {images.length > 0 ? 
                      <div className="carousel-inner">
                        {images.map((image, index)=>  <div className={activeInner === index ? "carousel-item active" : "carousel-item"}>
                        <img src={API_URL + `property/renderImage?documentID=${image.master_document_uuid}`} alt="First slide"/>
                        </div>)}
                      </div> 
                      : <div className="carousel-inner">
                          <div className="carousel-item active">
                              <img src="/images/property_listing.png" alt="..." alt="First slide"/>
                          </div>
                          <div className="carousel-item">
                              <img src="/images/property_listing.png" alt="..." alt="Second slide"/>
                          </div>
                          <div className="carousel-item">
                              <img src="/images/property_listing.png" alt="..." alt="Third slide"/>
                          </div>
                      </div>}
                   <a className="carousel-control-prev" href="#carouselExampleIndicators1" role="button" data-slide="prev">
                     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                     <span className="sr-only">Previous</span>
                   </a>
                   <a className="carousel-control-next" href="#carouselExampleIndicators1" role="button" data-slide="next">
                     <span className="carousel-control-next-icon" aria-hidden="true"></span>
                     <span className="sr-only">Next</span>
                   </a>
                 </div>
                 <div className="detail-page-btn">
                    <a href="#" className="btn btn-outline-secondary white-btn "> <img src="/images/play-btn.png" alt="..."/> <span>Videos </span> </a>
                    <a data-toggle="modal" data-target="#galleryModal" className="btn btn-outline-secondary white-btn"> <img src="/images/photo_dots.png" alt="..."/> <span>Show all photos </span> </a>
                </div> 
            </div>
        </div> */}
         
    </div>
)}

export default DetailPageSlider