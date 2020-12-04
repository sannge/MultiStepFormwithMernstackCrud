import React from 'react'
import PlacesAutocomplete from 'react-places-autocomplete';

function PlaceForm({noShadow, labelOff,disabled,formError,state,setState}) {
    return (
        <div>
            <div className="flex flex-col">
            {!labelOff ? formError && formError.location ? <p className="m-2 text-red-500">{formError.location}</p>:<label className="m-2">Location</label> : ''}
            
            <PlacesAutocomplete
                 value={state.location}
                 onChange={(addr) => setState.setLocation(addr)}
                 >
                 {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                     <div>
                     <input
                     onChange={(e) => setState.setLocation(e.target.value)}
                     value={state.location}
                     {...getInputProps({
                        disabled: disabled,
                         placeholder: 'Search Places ...',
                         className: `${formError && formError.location && 'invalid'} focus:outline-none border-none ${!noShadow && 'shadow-lg'} rounded p-2 w-full`,
                     })}
                     />
                     <div className="autocomplete-dropdown-container absolute z-50">
                     {loading && <div>Loading...</div>}
                     {suggestions.map((suggestion,index) => {
              
              // inline style for demonstration purpose
                         const style = suggestion.active
                         ? { backgroundColor: '#42a5f5', cursor: 'pointer' }
                         : { backgroundColor: '#ffffff', cursor: 'pointer' };
                         return (
                             <div key={index} className="flex flex-col px-2"
                             {...getSuggestionItemProps(suggestion, {
                                 
                                 style,
                             })}
                             >
                                 <div>
                                 <i className="material-icons"></i> <span className="p-3">{suggestion.description}</span>
                                 <hr/>
                                 </div>
                             
                             </div>
                         );
                     })}
                     </div>
                     </div>
                 )}
                 </PlacesAutocomplete>
                 </div>
        </div>
    )
}

export default PlaceForm
