import React from 'react'
import Modal from 'react-responsive-modal'
import {
    FacebookShareButton,
    LinkedinShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton
  } from "react-share";

function SocialSharingPopup (props) {

    const shareUrl = `https://searchnsettle.trigma.in//detail/${props.propertyId}`;
    const title = 'Real Estate Property';

    return(
        <Modal classNames="social-share-modal" open={props.show} onClose={props.onClose} center>
            <div className="modal-header">
                <h5 className="modal-title" id="pricingModalLabel">Share</h5>
            </div>
            <div className="modal-content"> 
                
               <div className="col-lg-12 mt-4 mb-4">
               <div className="row social-share">
                    <div className="col-lg-4">
                        <FacebookShareButton
                        url={shareUrl}
                        quote={title}
                        >
                        <img src={'/images/social/facebook.svg'}/>
                        </FacebookShareButton>
                    </div>
                    <div className="col-lg-4">
                        <LinkedinShareButton 
                    url={shareUrl}
                >
                    <img src={'/images/social/linkedin.svg'}/>
                </LinkedinShareButton>
                    </div>
                    <div className="col-lg-4">
                    <RedditShareButton
                    url={shareUrl}
                    title={title}
                >
                    <img src={'/images/social/reddit.svg'}/>
                </RedditShareButton>
                    </div>
                    <div className="col-lg-4">
                    <TelegramShareButton
                    url={shareUrl}
                    title={title}
                >
                    <img src={'/images/social/telegram.svg'}/>
                </TelegramShareButton>
                    </div>
                    <div className="col-lg-4">
                    <TumblrShareButton
                    url={shareUrl}
                    title={title}
                >
                    <img src={'/images/social/tumblr.svg'}/>
                </TumblrShareButton>
                    </div>
                    <div className="col-lg-4">
                        <TwitterShareButton
                    url={shareUrl}
                    title={title}
                >
                    <img src={'/images/social/twitter.svg'}/>
                </TwitterShareButton>
                    </div>
                </div>
               </div>                
                
            </div>
        </Modal>
    )
}

export default SocialSharingPopup