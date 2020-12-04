import Dropzone from "react-dropzone";
import React from 'react'

function DropZoneButton({state,onDrop}) {
    
    return (
        // only accept png and jpg
        <>
        
        {/* {uploaded ?  */}
        {/* <button onClick={removeFile} className="text-white hover:text-white bg-red-700 shadow-sm hover:bg-red-600 rounded-lg w-24 pt-2 pb-2 pl-3 pr-3 text-center border cursor-pointer">Remove</button> */}
         {/* : */}
        <Dropzone accept="image/png, image/jpg, image/jpeg" onDrop={onDrop}>
    
            {({getRootProps, getInputProps, isDragActive}) => (
                <div className="focus:outline-none trasition duration-300 ease-in-out m-2 text-gray-800 hover:text-white bg-transparent shadow-sm hover:bg-gray-700 rounded w-20 pt-1 pb-1 pl-1 pr-1 text-center border border-gray-600 cursor-pointer" {...getRootProps()}>
                     <input {...getInputProps()} />
                    {isDragActive ? <p>Drop</p> : state.image ? <p>Edit</p> : <p>Upload</p>}
                 </div>
            )}
 
        </Dropzone>
        {/* }    */}
        </>
    )
}

export default DropZoneButton