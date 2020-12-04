import React,{useState,useEffect} from 'react'

function Home(props) {
    
    const [showButton, setShowButton] = useState(false)
    useEffect(() => {
        
        const handleWindowResize = () => {

     
            if(window.innerWidth > 768) {
            
                setShowButton(false)
            }else {
                setShowButton(true)
            }
        }
        handleWindowResize();
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    },[])

    return (
        <div className="bg-opacity-50 h-screen">
            <div className="flex items-center flex-col justify-center h-5/6">
                   <h1 className="mb-10 font-bold text-5xl sm:text-7xl">Welcome!</h1>
                   
                   <div className="flex flex-wrap items-center justify-center">
                   <button onClick={() => props.history.push('./form')} className="mr-3 mb-3 transition duration-200 ease-in-out hover:bg-gray-800 hover:text-white border border-gray-700 border-opacity-100 text-black text-xl px-3 py-2 focus:outline-none rounded-3xl font-bold">Add Athletes</button>
                   {showButton && <button onClick={() => props.history.push('./athletes')} className="mr-3 mb-3 transition duration-200 ease-in-out hover:bg-gray-800 hover:text-white border border-gray-700 border-opacity-100 text-black text-xl px-3 py-2 focus:outline-none rounded-3xl font-bold">View Athletes</button>}
                   </div>
                   

            </div>
        </div>
    )
}

export default Home
