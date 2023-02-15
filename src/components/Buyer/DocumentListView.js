import React from 'react'
import moment from 'moment'


function DocumentListView (props) {
    const { list = [] } = props
   // console.log(list, "list")
     return(
        <div className="document-list">
            {list && list.length > 0 ? list.map((item,index) => <DocumentListItem  key={index} item={item} />) : 
                <div className="item"> No document available.</div>}
        </div>
    )
}


export default DocumentListView

/***************** Document List Item *******/

const DocumentListItem = (props) => {
    return (
        <div className="item">
           <img src="/images/document-img.png" alt="" className="doc"/>
           <h5>{props.item.master_document_name}</h5>
           <p>{moment(props.item.master_document_created_date).format('MMMM DD, YYYY') ||  'July 1,2018' }</p>
        </div>
    )
}