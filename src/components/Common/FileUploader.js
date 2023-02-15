import React from 'react'
import Dropzone from 'react-dropzone-uploader'
import { getBase64 } from '../../utils/common'

function FileUploader (props) {
    return(
        <Dropzone 
            // accept='*/images'
            // inputContent='Drag Images to Box or Click to Browse'
            multiple={props.multiple}
            getUploadParams={props.getUploadParams ? (data) => props.getUploadParams(data) : null}
            onSubmit={ props.onSubmit ? (files) => {
                files.forEach(file => {
                    getBase64(file.file)
                    .then((res , index )=> {
                        console.log(res, index, "after base 64 ")
                        props.uploadFile(res, file)
                    })
                    .catch(err => { console.log('Promis error',err)})
                 })
            } : null}
        />
    )
}

export default FileUploader