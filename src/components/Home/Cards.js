import React from 'react'


const images = [
    {
        'image': "images/card01.png",
        'title': "No Stress",
        'text': "We do all the work of contacting and directing all parties involved until the proerty is yours."
    }, 
    {
        'image': "images/card02.png",
        'title': "Online 24/7",
        'text': "Our team works tirelessly and provide you real time update on each step."
    }, 
    {
        'image': "images/card03.png",
        'title': "Afforable",
        'text': "We provide great rates while maintaing the excellent standards."
    }, 
    {
        'image': "images/card04.png",
        'title': "Start to Setttlement",
        'text': "We are involved starting from financial health check through to settlement process and even beyond."
    }, 
    {
        'image': "images/card05.png",
        'title': "Settlement Manager",
        'text': "Our settlement managers manages each until it yours."
    }, 
    {
        'image': "images/card06.png",
        'title': "Competitive",
        'text': "We uses standard industry data and uses complex algorithm to determine future property growth."
    }, 
    {
        'image': "images/card07.png",
        'title': "Australia's favourite",
        'text': "We are currently trending hot and soon will become number ONE in Australia."
    }, 
    {
        'image': "images/card08.png",
        'title': "Not just your dream",
        'text': "It's not just yours but our dream also to settle your new property."
    }
]


function Cards(props){
    return (
        <section className="what_we_do">
            <div className="container-fluid">
                <h2 className="text-center">What We Do</h2>
                <div className="row">
                    {images.map((info, index)=> <CardBlock {...info} key={index} redirect={props.redirect}/>)}
                </div>
            </div>
        </section>
    )
 }
export default Cards


const CardBlock = (props) => {
    return (
        <div className="col-md-3">
            <div className="card" onClick={props.redirect}>
                <img className="card-img-top" src={props.image} alt="" />
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.text}</p>
                </div>
            </div>
        </div>
    )
}