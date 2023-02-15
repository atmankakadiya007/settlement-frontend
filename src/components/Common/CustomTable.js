import React from 'react'
import { priceFormat } from '../../utils/common'
import moment from 'moment'

function CustomTable(props){
    return(
        <table className="table">
            <thead>
                <tr>
                    {props.headings && 
                        props.headings.map((head, index) => <th scope="col" key={index}>{head}</th>)}
                </tr>
            </thead>
            <tbody>
                {props.rowdata && props.rowdata.length > 0 ?  props.rowdata.map((data, index) => {
                    return(
                        <tr key={index}>
                            <td>{data.transaction_uuid}</td>
                            <td>{moment(data.transaction_created_date).format('DD/MM/YYYY')}</td>
                            <td>{data.user_information_fullname}</td>
                            <td>{data.plan_name}</td>
                            <td>{priceFormat(data.amount)}</td>
                        </tr>)
                }) : <tr className="text-center"><td colSpan={5}> No data available.</td></tr>}
            </tbody>
        </table>
    )
}

export default CustomTable 