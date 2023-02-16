import React from 'react'
 
function ClientReviews(){
   return (
      <section className="client_review">
         <h2 className="text-center"> Clients Review</h2>
            <div className="container">
               <div className="row">
                  <div className=" arrow-wrapper text-right">
                     <div className="col-12 client-slider-arrow">
                        <a className="carousel-control-prev" href="#myCarousel8" role="button" data-slide="prev">
                           <span className="fa fa-chevron-left" aria-hidden="true"></span>
                           <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#myCarousel8" role="button" data-slide="next">
                           <span className="fa fa-chevron-right" aria-hidden="true"></span>
                           <span className="sr-only">Next</span>
                        </a>
                     </div>
                  </div>
                  <div id="myCarousel8" className="carousel slide" data-ride="carousel">
                     <div className="carousel-inner">
                        <div className="carousel-item  active">
                           <div className="row p-relative">
                              <div className="col-md-6">
                                 <div className="client-review-container">
                                    <div className="client-name">
                                       <h4>  Kanye West  <span>/ CEO at Google INC. </span>  </h4>
                                       <div className="star-rating">
                                          <span className="fa fa-star-o" data-rating="1"></span>
                                          <span className="fa fa-star-o" data-rating="2"></span>
                                          <span className="fa fa-star-o" data-rating="3"></span>
                                          <span className="fa fa-star-o" data-rating="4"></span>
                                          <span className="fa fa-star-o" data-rating="5"></span>
                                          <input type="hidden" name="whatever1" className="rating-value" value="2.56"/>
                                       </div>
                                    </div>
                                    <div className="client_review_txt">
                                       <p> It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.</p>
                                    </div>
                                 </div>
                              </div>
                              <div className="col-md-6">
                                 <div className="client-review-container">
                                    <div className="client-name">
                                       <h4>  Kanye West  <span>/ CEO at Google INC </span>  </h4>
                                       <div className="star-rating">
                                          <span className="fa fa-star-o" data-rating="1"></span>
                                          <span className="fa fa-star-o" data-rating="2"></span>
                                          <span className="fa fa-star-o" data-rating="3"></span>
                                          <span className="fa fa-star-o" data-rating="4"></span>
                                          <span className="fa fa-star-o" data-rating="5"></span>
                                          <input type="hidden" name="whatever1" className="rating-value" value="2.56"/>
                                       </div>
                                    </div>
                                    <div className="client_review_txt">
                                       <p> It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.</p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="carousel-item ">
                           <div className="row">
                              <div className="col-md-6">
                                 <div className="client-review-container">
                                    <div className="client-name">
                                       <h4>  Kanye West  <span>/ CEO at Google INC </span>  </h4>
                                       <div className="star-rating">
                                          <span className="fa fa-star-o" data-rating="1"></span>
                                          <span className="fa fa-star-o" data-rating="2"></span>
                                          <span className="fa fa-star-o" data-rating="3"></span>
                                          <span className="fa fa-star-o" data-rating="4"></span>
                                          <span className="fa fa-star-o" data-rating="5"></span>
                                          <input type="hidden" name="whatever1" className="rating-value" value="2.56"/>
                                       </div>
                                    </div>
                                    <div className="client_review_txt">
                                       <p> It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.</p>
                                    </div>
                                 </div>
                              </div>
                              <div className="col-md-6">
                                 <div className="client-review-container">
                                    <div className="client-name">
                                       <h4>  Kanye West  <span>/ CEO at Google INC </span>  </h4>
                                       <div className="star-rating">
                                          <span className="fa fa-star-o" data-rating="1"></span>
                                          <span className="fa fa-star-o" data-rating="2"></span>
                                          <span className="fa fa-star-o" data-rating="3"></span>
                                          <span className="fa fa-star-o" data-rating="4"></span>
                                          <span className="fa fa-star-o" data-rating="5"></span>
                                          <input type="hidden" name="whatever1" className="rating-value" value="2.56"/>
                                       </div>
                                    </div>
                                    <div className="client_review_txt">
                                       <p> It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.</p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
        )
 }
export default ClientReviews
