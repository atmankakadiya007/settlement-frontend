import React from 'react'
import CustomTable from'../Common/CustomTable'
import { trans_data } from '../../constants/data'


function Transactions({ transactions }){
    return(
        <div className="box table-box">
            <h4 className="d-flex align-items-center">Transaction History 
                {/* <span className="ml-auto"><a href="#"><i className="fa fa-edit"></i> edit</a></span> */}
            </h4>
            <div className="scroll-table">
                <CustomTable
                    headings={['ID', 'DATE', 'NAME', 'PLAN', 'AMOUNT']}
                    rowdata={transactions}
                />
            </div>
         </div>
    )
}

export default Transactions