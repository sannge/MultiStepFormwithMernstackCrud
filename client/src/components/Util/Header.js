import React from 'react'

function Header(props) {
    return (
        <h1 className="font-bold text-3xl p-2">
           {props.children}
        </h1>
    )
}

export default Header
