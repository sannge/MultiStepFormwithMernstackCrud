import React from 'react'
import Button from '../Util/Button'
import Header from '../Util/Header'

function BasicInfo({formError,genderOptions,Form,state,setState,options,next}) {

    return (
        <div>
            
            <div className="mt-5 w-full h-full flex justify-center items-center">
               
               <Form className="md:p-12 md:shadow-lg w-full md:w-3/4 lg:w-2/4 flex-col flex m-auto">
                 <div className="w-full text-center mb-5">
                    <Header>Basic Info</Header>
                 </div>
                 <div className="mb-2 flex flex-col">
                     {formError.name ? <p className="m-2 text-red-500">{formError.name}</p>:<label className="m-2">Name</label>}
                    <input value={state.name} onChange={(e) => setState.setName(e.target.value)} placeholder="e.g. Christiano Ronaldo" className={`${formError.name && 'invalid'} focus:outline-none border-none shadow-lg rounded p-2 w-full`} type="text"/>
                 </div>
                  
                 <div className="mb-2 flex flex-col">
                   {formError.sport ? <p className="m-2 text-red-500">{formError.sport}</p> : <label className="m-2">Sport</label>}
                    <select onChange={(e) => setState.setSport(e.target.value)} value={state.sport} className={`${formError.sport && 'invalid'} focus:outline-none text-center border-none shadow-lg rounded p-2 w-full`}>
                       {options.map((option,index) => (
                           <option value={option} key={index}>
                               {option}
                           </option>
                       ))}
                    </select>
                 </div>
                 
                 <div className="mb-2 flex flex-col">
                    {formError.gender ? <p className="m-2 text-red-500">{formError.gender}</p> : <label className="m-2">Gender</label>}
                    <select  onChange={(e) => setState.setGender(e.target.value)} value={state.gender} className={`${formError.gender && 'invalid'} focus:outline-none border-none shadow-lg rounded p-2 w-full`} type="text">
                        {genderOptions.map((option,index) => (
                           <option value={option} key={index}>
                               {option}
                           </option>
                       ))}
                    </select>
                 </div>

                 <div className="mb-2 flex flex-col">
                    {formError.dob ? <p className="m-2 text-red-500">{formError.dob}</p> : <label className="m-2">Date of Birth</label>}
                    <input value={state.dob} onChange={(e) => setState.setDob(e.target.value)} className={`${formError.dob && 'invalid'} cursor-pointer focus:outline-none border-none shadow-lg rounded p-2 w-full`} type="date"/>
                 </div>
                 
                 <div className="mt-5 w-full flex justify-end">
                    <Button onClick={(e) => next(e,state)}>Next</Button>
                 </div>
                
                


               </Form>

            </div>
            
            
        </div>
    )
}

export default BasicInfo
