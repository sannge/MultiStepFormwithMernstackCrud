import React, {useState,useEffect} from 'react'
import Athlete from '../../components/Athlete'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {Axios} from '../../AsyncUtil/Axios'
import Error from '../../components/Util/Error'
import Loading from '../../components/Util/Loading/Loading'

function Athletes(props) {
    
    const [athleteData, setAthleteData] = useState([])
    const [fetchError,setFetchError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [deleteError, setDeleteError] = useState(false)

    useEffect(() => {
        setLoading(true);
        Axios.get("/get-athletes")
        .then(res => {
            setLoading(false);
            const arr = Object.values(res.data);
            setAthleteData(arr)}
            )
        .catch(err => {
            setLoading(false);
            setFetchError(true)
        })
    },[])

    const deleteAthleteHandler = (id) => {
        Axios.delete(`/delete-athlete/${id}`)
        .then((res) => {
            setDeleted(true)
        })
        .catch((err) => {
            setDeleted(false)
            setDeleteError(true)
        setTimeout(() => {
            setDeleteError(false)
        },2000)
        })
    }

    useEffect(() => {
       
       if(deleted){
        setLoading(true);
        Axios.get("/get-athletes")
        .then(res => {
        setLoading(false);
        const arr = Object.values(res.data);
        setAthleteData(arr)}
        )
        .catch(err => {
        setLoading(false);
        setFetchError(true)
    })
       }
  
    },[deleted])

    const editProfileHandler = (id) => {
        props.history.push(`/athletes/${id}`)
    }

    //each athlete will show image, name, team, gender, Date of Birth, Location
    return (
        <>
        {deleteError &&<div className="my-10"> <Error/></div>}
        {loading ? <div><Loading/></div> : 
        fetchError ? (
            <div className="mt-10">
                <Error/>
            </div>
        ) : 
        athleteData ? (
        <div className="mt-10 bg-white shadow overflow-hidden sm:rounded-md">

           <ul className="divide-y divide-gray-200">
               {
                   athleteData.map(athlete => (
                    <li key={athlete._id}>
                    <Athlete 
                    editProfileHandler={editProfileHandler}
                    deleteAthleteHandler={deleteAthleteHandler}
                    athlete={athlete} 
                    Icons={{EditIcon,DeleteIcon}}/></li>
                   ))
               }
          </ul>
          
        </div>)
        : 
        (<div style={{wordBreak:'break-word'}} className="text-center p-3 mt-10 text-lg w-full flex justify-center items-center">
           <p>No Athletes have been added yet...</p>
        </div>)}
        </>

    )
}

export default Athletes
