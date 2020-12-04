import React from 'react'
import Button from '../Util/Button'
import Header from '../Util/Header'
import PlaceForm from '../Util/PlaceForm'
import DropZone from '../Util/DropZone'

function About({formError,onDrop,state,setState,next,prev,Form}) {

    return (
        <div>
            
            <div className="mt-5 w-full h-full flex justify-center items-center">
               
               <Form className="md:p-12 md:shadow-lg w-full md:w-3/4 lg:w-2/4 flex-col flex m-auto">
                 <div className="w-full text-center mb-5">
                    <Header>About</Header>
                 </div>

                 <div className="mb-2 flex flex-col">
                   <PlaceForm formError={formError} state={state} setState={setState}/>
                 </div>
                 
                 <div className="mb-2 flex flex-col">
                    {formError.team ? <p className="m-2 text-red-500">{formError.team}</p> : <label className="m-2">Team</label>}

                     <input value={state.team} onChange={(e) => setState.setTeam(e.target.value)} placeholder="e.g. Barcelona" className={`${formError.team && 'invalid'} focus:outline-none border-none shadow-lg rounded p-2 w-full`} type="text"/>
                 </div>

                 <div className="mb-2 flex flex-col">
                    {formError.image ? <p className="m-2 text-red-500">{formError.image}</p> : <label className="m-2">Profile Picture</label>}
                     {state.previewImage && <img 
                      className="m-2 w-20 h-20 object-cover rounded-full"
                      src={state.previewImage.preview} alt="Profile"/>}
                     <DropZone state={state} onDrop={onDrop}/>
                 </div>

                 <div className="mb-2 flex flex-col">
                    {formError.desc ? <p className="m-2 text-red-500">{formError.desc}</p> : <label className="m-2">Description</label>}

                    <textarea value={state.desc} onChange={(e) => setState.setDesc(e.target.value)} placeholder="Describe yourself in at least 150 characters" className={`${formError.desc && 'invalid'} h-32 focus:outline-none border-none shadow-lg rounded p-2 mb-2 w-full`} type="text"/>
                 </div>
                 
                 <div className="mt-5 w-full flex flex-wrap items-center justify-between">
                 <Button onClick={prev}>Prev</Button>
                    <Button onClick={(e) => next(e,state)}>Next</Button>
                 </div>
                
                


               </Form>

            </div>
            
            
        </div>
    )
}

export default About
