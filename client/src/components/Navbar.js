import React from 'react'
import {Link} from 'react-router-dom'
import Logo from '../assets/opensponsership.png'

function Navbar({viewAthletesHandler,showHeader}) {
    return (
        <nav className="relative bg-gray-800">
            <div className="flex text-white justify-center items-center md:justify-between h-16 max-w-7xl 2xl:mx-auto mx-6">
            <Link to="/">
                <div className="flex flex-row items-center">
                  {!showHeader && <img className="w-32"src={Logo} alt=""/>}
                  {showHeader && <h2 className="inline-block font-semibold text-xl tracking-wide">OPENSPONSERSHIP</h2>}
                </div>
            </Link>
               {showHeader && <button onClick={viewAthletesHandler} className="transition duration-200 ease-in-out hover:bg-gray-300 hover:text-black border border-gray-300 border-opacity-100 text-gray-300  px-2 py-1 focus:outline-none shadow-inner rounded-xl font-bold">View Athletes</button>}
            </div>
        </nav>
    )
}

export default Navbar
