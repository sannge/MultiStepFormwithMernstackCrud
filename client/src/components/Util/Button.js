import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
button:disabled{
    opacity:0.5;
}

button:disabled:hover {
    background: none;
    color: black;
    cursor: inherit;
}
`

function Button(props) {
    return (
        <Div>
            <button className=" m-2 transition duration-200 ease-in-out hover:bg-gray-800 hover:text-white border border-gray-700 border-opacity-100 text-black text-xl px-4 py-1 focus:outline-none rounded" {...props}/>
        </Div>
    )
}

export default Button
