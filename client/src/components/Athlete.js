import React from 'react'

function Athlete({editProfileHandler,deleteAthleteHandler,Icons:{DeleteIcon,EditIcon},athlete:{_id,image,name,gender,sport,team,dob,location}}) {
    return (
              <div className="block hover:bg-gray-50">
                <div className="flex items-center px-4 py-4 sm:px-6">
                  <div className="min-w-0 flex-1 flex items-center">
                    <div className="flex-shrink-0">
                      <img className="h-12 w-12 rounded-full" src={image} alt=""/>
                    </div>
                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                      <div>
                        <p className="text-sm font-medium text-indigo-600 truncate">{name}</p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                        <span className="truncate">{gender}, {sport}, {team}</span>
                        </p>
                    </div>
                    <div className="hidden md:block">
                    <div>
                    <p className="text-sm text-gray-900">
                       Date of Birth:
                           <span>{dob}</span>
                  </p>
                  <p className="mt-2 flex items-center text-sm text-gray-500">
                    {location}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col sm:flex-row">
            <button onClick={() => editProfileHandler(_id)} className="focus:outline-none m-2 hover:text-gray-500"><EditIcon/></button>
            <button onClick={() => deleteAthleteHandler(_id)} className="focus:outline-none m-2 hover:text-red-500"><DeleteIcon/></button>
            </div>
          </div>
        </div>
      </div>

    )
}

export default Athlete
