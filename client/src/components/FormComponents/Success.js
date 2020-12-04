import React from 'react'
import Button from '../Util/Button'
import RightTick from '../../assets/righttTick.png'

function Success({onClick}) {
    return (
        <div className="mt-5 w-full h-full flex justify-center items-center">
           <div className="md:p-12 sm:shadow-lg w-full md:w-3/4 lg:w-2/4 flex-col flex m-auto">
               <div className="flex justify-center">
                  <img className="w-24" src={RightTick} alt=""/>
               </div>
               
               <h1 className="mb-5 text-center font-bold text-3xl">You have successfully added an Athlete!</h1>
               <div className="w-full flex justify-center">
                  <Button onClick={onClick}>Back to Home</Button>
               </div>
           </div>
        
        </div>
    )
}

export default Success
