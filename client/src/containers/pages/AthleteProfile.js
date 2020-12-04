import React,{useState, useEffect} from 'react'

import styled from 'styled-components'

import PlaceForm from '../../components/Util/PlaceForm'
import Error from '../../components/Util/Error'
import Success from '../../components/Util/Success'
import Loading from '../../components/Util/Loading/Loading'

import {Axios} from '../../AsyncUtil/Axios'

import DropZone from '../../components/Util/DropZone'

const TextArea = styled.textarea`
&{
    background: rgba(243, 244, 246, 1);
}

&:disabled {
    background: white;
}
`
const Btn = styled.button`
&:disabled:hover {
    background: transparent;
}
`

function AthleteProfile(props) {
    const [state,setState] = useState({})
    const [fetchError,setFetchError] = useState(false)
    const [loading,setLoading] = useState(false)
    const [editable,setEditable] = useState(false)
    const [preview,setPreview] = useState(null)
    const [formError,setFormError] = useState({
        location: '',
        desc: ''
    })
    const [disabled, setDisabled] = useState(false);
    const [patchError, setPatchEror] = useState(false)
    const [success,setSuccess] = useState(false)


    const setLocation = (address) => {
        setPreview({...preview,location: address})
    }

    useEffect(() => {
        setPreview({...state})
    },[editable,state])

    useEffect(() => {
        const id = props.match.params.id;
        setLoading(true);
        Axios.get(`/get-athlete/${id}`)
        .then(res => {
            setLoading(false)
            setState(res.data.doc)
        })
        .catch(err => {
            setLoading(false)
            setFetchError(true)
        })
    },[props.match.params.id])

    const formCheck = (state) => {
        const {location,desc} = state;
        let errors = {...setFormError}
        let count = 0;
        if(desc.length >= 150) {
            errors = {...errors,desc: ''}
            count+=1;
        }else {
           errors = {...errors,desc: 'Please write 150 or more characters about yourself'}
        }

        if(location.trim().length >= 2 ) {
            errors = {...errors,location: ''}
            count+=1;
        } else {
            //Please choose an valid location
            errors = {...errors,location: "Please select valid location"}
        }

        setFormError({...errors})

        if(count === 2) {
            return true;
        } else {
            return false;
        }
    }

    useEffect(() => {
        if(success) {
            setTimeout(() => {
                setSuccess(false)
            },2000)
        }

        if(patchError) {
            setTimeout(() => {
                setPatchEror(false)
            },2000)
        }
    },[success,patchError])

    useEffect(() => {
    },[formError])

    const saveButtonHandler = () => {
        
        if(formCheck(preview)) {
            setDisabled(true)
            
            setState({...preview})
            
            const formData = new FormData();
            // formData.append("data",state)

            const config = {
                header: {'content-type': 'multipart/form-data'}
            }

            const payload = {...preview,image: null}
            formData.append("image",preview.image);
            formData.append("data",JSON.stringify(payload))

            Axios.patch("/update-athlete", formData,config)
            .then(res => {
                setDisabled(false)
                setEditable(false)
                setSuccess(true);
            })
            .catch(err => {
                setPatchEror(true)
                setDisabled(false)
                setEditable(false)
            })
        }        
    }

    const setImageHandler = ([file]) => {
        const reader = new FileReader();
             reader.onload = (event) => {
                 
                if(editable) {
                    setPreview({...preview,image: event.target.result})
                }else {
                    setState({...state,image: event.target.result})
                }
                 
             };
             reader.readAsDataURL(file);
            
            // setPreviewImage(Object.assign({...file},{preview: URL.createObjectURL(file)}));
    }

    return (
        <div className="mt-10">
            {
                loading ? <Loading/>
                : fetchError ? <Error/>
                : (
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
  <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
    {/* <h3 className="text-lg leading-6 font-medium text-gray-900">
      Applicant Information
    </h3> */}

    <div className="relative">
    <img className="h-24 w-24 object-contain rounded-full" src={`${editable ? preview.image : state.image}`} alt=""/>
    {editable && <div className="mt-4"><DropZone onDrop={setImageHandler} state={{image: state.image}}/></div>}
    <p className="mt-1 max-w-2xl text-sm text-gray-500">
      Personal details and application.
    </p>
    </div>

    <div>
    {!editable && <button onClick={() => setEditable(true)} style={{minWidth:'80px'}} className="hover:bg-gray-800 hover:text-white transition duraion-200 ease-in-out border mb-3 py-1 px-3 rounded-xl">Edit</button>}
    </div>
    
  </div>
  <div className="border-t border-gray-200">
    <dl>
      <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">
          Full name
        </dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
         {state.name}
        </dd>
      </div>
      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">
          Gender
        </dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        {state.gender}
        </dd>
      </div>
      <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">
          Date of Birth
        </dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {state.dob}
        </dd>
      </div>
      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">
          Sport
        </dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {state.sport}
        </dd>
      </div>
      <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">
          {formError.location ? <p className="text-red-500">{formError.location}</p> : 'Address'}
        </dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <PlaceForm noShadow formError={formError} disabled={!editable} labelOff state={{location: `${editable ? (preview.location ? preview.location : '') : state.location ? state.location : ''}`}} setState={{setLocation}}/>
        </dd>
      </div>
      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">
        {formError.desc ? <p className="text-red-500">{formError.desc}</p> : 'Desciption'}
        </dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <TextArea disabled={!editable} style={{minHeight:'120px', width: '90%'}} className="p-2" onChange={(e) => {editable ? setPreview({...preview,desc: e.target.value}) : setState({...state,desc:e.target.value})}} value={editable ? preview.desc : state.desc}></TextArea>
        </dd>
        
      </div>
    </dl>
    <div className="flex justify-center items-center flex-col items-center md:flex-row">
        {editable && <Btn onClick={() => {setPreview({...state});setEditable(false)}} disabled={disabled} style={{minWidth:'80px'}} className="focus:outline-none hover:bg-gray-800 hover:text-white transition duraion-200 ease-in-out border mb-3 mr-3 py-1 px-3 rounded-xl">Cancel</Btn>}
        {editable && <Btn onClick={saveButtonHandler} style={{minWidth:'80px'}} disabled={disabled} className="focus:outline-none hover:bg-gray-800 hover:text-white transition duraion-200 ease-in-out border mb-3 mr-3 py-1 px-3 rounded-xl">Save</Btn>}
    </div>
    {patchError && 
    (<div className="m-3">
       <Error/>
    </div>)}
    {success && (
        <div className="m-3">
        <Success/>
        </div>
    )}
  </div>
</div>
                )
            }
            
        </div>
    )
}

export default AthleteProfile
