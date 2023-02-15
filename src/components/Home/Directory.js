import React from 'react'
import { Link } from 'react-router-dom'
import CardView from './CardView'
import ViewButton from '../Common/ViewButton'
import ListItem from '../Listing/ListItem'


function Directory (props){
   // console.log(props, "Directory")

    const goToDetail = (id, loc = {}) => {
		
		let pos = {
			lat: parseFloat(loc.lat), 
			lng: parseFloat(loc.long)
		}

		sessionStorage.setItem('location', JSON.stringify(pos))
		return props.history.push(`/detail/${id}`)
	}

    return(
        <section className="pt-5">
            <div className="product-grid">
                <div className="container-fluid">
                    <h2 className="text-center"> <span> Our </span> Directory</h2>
                    <div className="directory-header-panel">
                        <div className="left-panel">
                            <h4>Expert Picks</h4>
                        </div>
                        <ViewButton redirect={`/search?property_filter_type=is_expert_picks`}/>
                    </div>
                    <div className="container-fluid text-center my-3">
                        <div className="row mx-auto my-auto">
                            <div className="row">
                                <div className="col-12">
                                    <a className="carousel-control-prev text-dark" href="#myCarousel" role="button" data-slide="prev">
                                        <span className="fa fa-chevron-left" aria-hidden="true"></span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                </div>
                            </div>
                            <div id="myCarousel" data-interval="false" className="carousel slide w-100" data-ride="carousel">
                                <div className="carousel-inner" role="listbox">
                                {props.properties && (props.properties.length > 0) ?  
                                    <div className="carousel-item active">
                                        <div className="row">   
                                            { props.properties.map((data,index) => 
                                                <ListItem
                                                    key = {index}
                                                    user={{}}
                                                    addFav={() => {}}
                                                    goToDetail={goToDetail}
                                                    viewMap={false}
                                                    favorite={false}
                                                    propertyImages={props.propertyImagess || null} 
                                                    item={data}
                                                    />)}
                                        </div>
                                    </div>  : <p>No property available.</p>}
                                    {/* <div className="carousel-item ">
                                        <div className="row">
                                            {props.properties && props.properties.map((val,index) => {
                                                return <ListItem item={val}/>
                                            })} 
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <a className="carousel-control-next text-dark" href="#myCarousel" role="button" data-slide="next">
                                        <span className="fa fa-chevron-right" aria-hidden="true"></span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="row">
                <div className="col-12">
                    <a className="carousel-control-next text-dark" href="#myCarousel" role="button" data-slide="next">
                        <span className="fa fa-chevron-right" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div> */}
        </section>
    )
}

export default Directory