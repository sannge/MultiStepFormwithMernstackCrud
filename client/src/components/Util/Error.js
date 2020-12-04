import React from 'react'

function Error() {
    return (
        <div style={{minHeight: '100px'}} className="flex max-w-lg m-auto justify-center items-center text-center rounded-xl transition duration-300 ease-in-out opacity-80 px-10 bg-red-200 text-red-500">
            <p>Something is wrong! Please try again later.</p>
        </div>
    )
}

export default Error
