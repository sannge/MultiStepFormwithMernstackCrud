import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import {withRouter} from 'react-router-dom'

function NavbarContainer(props) {
    const [showHeader,setShowHeader] = useState(false)
    const viewAthletesHandler = () => {
        props.history.push('/athletes');
    }


    useEffect(() => {
        
        const handleWindowResize = () => {
            if(window.innerWidth > 768) {
            
                setShowHeader(true)
            }else {
                setShowHeader(false)
            }
        }
        handleWindowResize();
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    },[])

    return (
        <div>
            <Navbar showHeader={showHeader} viewAthletesHandler={viewAthletesHandler}/>
        </div>
    )
}

export default withRouter(NavbarContainer)
