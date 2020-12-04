import React from 'react'
import Button from '../Util/Button'
import Error from '../Util/Error'

function Summary({disableButton,serverError,goTo,state,addAthletes}) {

    return (
        <div>
            
            <div className="mt-5 w-full h-full flex justify-center items-center">
               
            
               <div className="md:p-12 md:shadow-lg w-full md:w-3/4 lg:w-2/4 flex-col flex m-auto">
                  <div>
                  <div className="flex w-full flex-row flex-wrap items-center justify-between">
                         <h1 className="text-3xl font-bold mr-3 mb-3">Basic Info</h1>
                            <button className="text-lg border rounded px-3 py-1 " onClick={() => goTo(1)}>Edit</button>
                      </div>
                      
                      <div className="ml-5 mt-5">
                          <div className="mb-3">
                             <strong>Name</strong>
                            <p className="ml-3">{state.name ? state.name : 'N/A'}</p>
                          </div>

                          <div className="mb-3">
                             <strong>Sport</strong>
                             <p className="ml-3">{state.sport ? state.sport : 'N/A'}</p>
                          </div>

                          <div className="mb-3">
                             <strong>Gender</strong>
                             <p className="ml-3">{state.gender ? state.gender : 'N/A'}</p>
                          </div>

                          <div className="mb-3">
                             <strong>Date of Birth</strong>
                             <p className="ml-3">{state.dob ? state.dob : 'N/A'}</p>
                          </div>
                      </div>  
                  </div>

                  <hr className="inline-block my-5"/>

                  <div>

                      <div className="flex w-full flex-row flex-wrap items-center justify-between">
                         <h1 className="text-3xl font-bold mr-3 mb-3">About</h1>
                            <button className="text-lg border rounded px-3 py-1 " onClick={() => goTo(2)}>Edit</button>
                      </div>

                      <div className="ml-5 mt-5">
                          <div className="mb-3">
                             <strong>Location</strong>
                             <p className="ml-3">{state.location ? state.location : 'N/A'}</p>
                          </div>

                          <div className="mb-3">
                             <strong>Team</strong>
                             <p className="ml-3">{state.team ? state.team : 'N/A'}</p>
                          </div>

                          <div className="mb-3">
                             <strong>Profile Picture</strong>
                             <p className="ml-3">{state.previewImage && state.previewImage.preview ? <img className="m-2 w-20 h-20 object-cover rounded-full" src={state.previewImage.preview} alt="Profile"/> : 'N/A'}</p>
                          </div>

                          <div style={{wordWrap:'break-word',overflowX:'hidden'}} className="mb-3">
                             <strong>Description</strong>
                             <p className="ml-3">{state.desc ? state.desc : 'N/A'}</p>
                          </div>
                          
                      </div>
                     
                  </div>
                  
                  {serverError && <Error/>}
                  
                  <div className="mt-5 w-full flex flex-wrap items-center justify-center">
                    <Button disabled={disableButton} onClick={addAthletes}>Submit</Button>
                  </div>
               </div>
               
                
            

            </div>
            
            
        </div>
    )
}

export default Summary
