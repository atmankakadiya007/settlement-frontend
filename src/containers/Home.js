import React, { useEffect, useState } from 'react';
import Banner from '../components/Home/Banner'
import Category from '../components/Home/Category'
import Cards from '../components/Home/Cards'
import Directory from '../components/Home/Directory'
import MostView from '../components/Home/MostView'
import ClientReviews from '../components/Home/ClientReviews'
import Article from '../components/Home/Article'
import PricingSection from '../components/Home/PricingSection'
import { connect } from 'react-redux';
import { getPropertyHighlights } from "../actions/common";
import { fetchHomepageProperties, fetchArticles, fetchArticleImages } from "../Apis/home";
import { getAllImageIdsOfProperty } from "../Apis/property";
import SignupModal from '../components/Modal/SignupPlanModal'
import { homepageFilters } from "../constants/data";
import axios from 'axios';
import PageLoader from 'react-loader-advanced';
import { toast } from 'react-toastify';

function Home(props) {

  const [openSignup, openSignupModal] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [homepageProperties, saveProperties] = useState([])
  const [loading, setLoading] = useState(false)
  const [property_images, setPropertyImages] = useState([])
  const [articles, saveArticles] = useState([])
  const [articleImages, saveArticleImages] = useState({})
  const [call, setCall] = useState(1);

  if (call === 1) {
    // window.reload();
    // setCall(2);
  }
  
  useEffect(() => {
    props.getHighlights()
    let info = JSON.parse(sessionStorage.getItem('user'))
    if (info && info.user_information_uuid) {
      setLoggedIn(true)
      // window.location.reload();  
    }
    fetchProperties()
    getArticles()
    return () => { }
  }, [])


  const getArticles = () => {
    fetchArticles()
      .then(res => {
        if (res && res.length > 0) {
          saveArticles(res)
          getArticleImages(res)
        }
        else {
          console.log(res, "res")
        }
      })
  }

  const getArticleImages = (list) => {
    let imagesArr = { ...articleImages }

    list.forEach((element, index) => {
      fetchArticleImages(element.featured_media)
        .then((images) => {
          if (images && images.status) {
            //	toast.error(images.data)
          }
          else {
            imagesArr[element.id] = images
            saveArticleImages({ ...imagesArr })
            return images
          }
        })
    })
  }

  const checkLoggedIn = () => {
    if (loggedIn) {
      props.history.push('/search')
    }
    else {
      openSignupModal(true)
    }
  }

  const getAllImages = (list) => {
    let imagesArr = [...property_images]
    list.map((arrItem, index) => {
      arrItem.forEach((element) => {
        getAllImageIdsOfProperty({ 'propertyID': element.property_uuid })
          .then((images) => {
            //console.log(images, "images")
            if (images && images.status) {
              toast.error(images.data)
            }
            else {
              imagesArr[index] = images
              setPropertyImages([...imagesArr])
              return images
            }
          })
      })
    })
  }


  const fetchProperties = () => {
    let makeAPIStack = homepageFilters.map(filter => fetchHomepageProperties({ 'type': filter }))
    //console.log(makeAPIStack, "stack")
    setLoading(true)
    axios.all(makeAPIStack)
      .then(res => {
        //console.log(res, "response")
        saveProperties(res)
        getAllImages(res)
        setLoading(false)
      })
      .catch(err => {
        // console.log(err, "error")
        setLoading(false)
      })
  }



  return (
    <PageLoader show={loading} message={'Fetching....'}>
      <Banner highlights={props.highlights} open={checkLoggedIn} />
      <Category highlights={props.highlights} />
      <div id='registerNow'>
        <h2 className="text-center mb-0 mt-5">Pricing</h2>
        <section className='pricing_section'>
          <PricingSection className="pricing_section" />
        </section>
      </div>
      <Cards redirect={() => {
        props.history.push('/How_it_works')
      }} />
      <Directory properties={homepageProperties[0]} propertyImages={property_images[0]} {...props} />
      <MostView title="Most View" searchText={'is_most_view'}
        properties={homepageProperties[1]} propertyImages={property_images[1]} {...props} />
      <MostView title="New in Market" searchText={'is_new_in_market'}
        properties={homepageProperties[2]} propertyImages={property_images[2]} {...props} />
      <MostView title="Promoted" searchText={'is_promoted'}
        properties={homepageProperties[3]} propertyImages={property_images[3]} {...props} />
      <MostView title="Rare Find" searchText={'is_rare_find'}
        properties={homepageProperties[4]} propertyImages={property_images[4]} {...props} />
      <MostView title="Spacius Home" searchText={'is_spacius_home'}
        properties={homepageProperties[5]} propertyImages={property_images[5]} {...props} />
      <MostView title="Stress Free" searchText={'is_stress_free'}
        properties={homepageProperties[6]} propertyImages={property_images[6]} {...props} />
      <ClientReviews />
      <Article articles={articles} images={articleImages} />
      <SignupModal show={openSignup} onClose={() => openSignupModal(false)} />
    </PageLoader>
  );
}


const mapStateToProps = state => ({
  highlights: state.common.highlights
})

const mapDispatchToProps = dispatch => {
  return {
    getHighlights: () => dispatch(getPropertyHighlights())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);