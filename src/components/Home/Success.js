import React, { useEffect } from "react";
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changeShow } from '../../actions/common';
const Success = (props) => {
    const redirectPath = useHistory();
    const dispatch = useDispatch();
    const onClickHandler = () => {
        dispatch(changeShow());
        // props.changeShow();
        redirectPath.push(`/`);
    }
    useEffect(() => {
        dispatch(changeShow());
        // props.changeShow();
    }, []);
    return (
        <section className="success-section">
            <div className="success-card">
                <div className="success-icon-card mb-2">
                    <img src="images/success.gif"></img>
                </div>
                <h1>Thank You!</h1>
                <p>We received your payment</p>
                <button onClick={onClickHandler} className="btn mt-2" style={{ background: '#ff385c', color: 'white' }}>Go to Dashboard</button>
            </div>
        </section>
    )
}

// const mapStateToProps = state => ({
//     isShow: state.common.isShow
// })

// const mapDispatchToProps = dispatch => {
//     return {
//         changeShow: () => dispatch(changeShow())
//     }
// }


// export default connect(mapStateToProps, mapDispatchToProps)(Success);
export default Success;
