import React,{useState} from 'react'

import BasicInfo from '../../components/FormComponents/BasicInfo'
import About from '../../components/FormComponents/About'
import Summary from '../../components/FormComponents/Summary'
import Success from '../../components/FormComponents/Success'

import styled from 'styled-components'

import {Axios} from '../../AsyncUtil/Axios'

const FormContainer = styled.form`
    & input:focus, & select:focus, & textarea:focus {
        box-shadow: 0 0 8px rgb(100,150,255);
    }

    & input.invalid, & textarea.invalid, & select.invalid {
        box-shadow: 0 0 8px rgb(255,0,0);
    }
    `
    

function Form(props) {
    
    const [step,setStep] = useState(1);
    const [name,setName] = useState('');
    const [sport,setSport] = useState('');
    const [gender,setGender] = useState('');
    const [dob,setDob] = useState('');
    const [desc,setDesc] = useState('');
    const [location,setLocation] = useState('');
    const [team,setTeam] = useState('');
    const [image,setImage] = useState(null);
    const [previewImage,setPreviewImage] = useState(null);
    const [serverError,setServerError] = useState(false);
    const [disableButton, setDisableButton] = useState(false);

    //null or ''
    const [formError,setFormError] = useState({
        name: '',
        sport: '',
        gender: '',
        dob: '',
        desc: '',
        location: '',
        team: '',
        image: ''
    });

    const [options] = useState([ 'Select the Options',
        'Golf','Tennis','Cricket','Basket','Baseball',
        'American Football','Aquatics','Archery','Automobile Racing','Badminton',
        'Beach Volleyball','Bobsleigh','Body Building','Boxing','Cross Country Running',
        'Cross Country Skiing','Curling','Cycling','Darts','Decathlon',
        'Down Hill Skiing','Equestrianism','eSports','Fencing','Field Hockey',
        'Figure Skating','Gymnastics','Ice Hockey','Martial Arts','Mixed Martial Arts',
        'Modern Pentathlon','Motorcycle Racing','Netball','Polo',
        'Racquetball', 'Rowing', 'Rugby', 'Sailing', 'Softball',
        'Shooting', 'Skatboarding', 'Skeet Shooting', 'Skeleton', 'Snow Boarding',
        'Soccer (Football)', 'Squash', 'Surfing', 'Swimming', 'Track and Field'
    ])

    const [genderOptions] = useState(['Select the Options', 'Male', 'Female'])


    const addAthletes = () => {
        const url = '/add-athlete';
    

        const config = {
            header: {'content-type': 'multipart/form-data'}
        }

        let payload = {
            name,
            sport,
            gender,
            dob,
            desc,
            location,
            team,
        }
        
        //create Form Data and then send it to server as Strings
        const formData = new FormData();
        formData.append("file",image)
       
        
        let toSendPayload = JSON.stringify(payload)
        formData.append("jspayload",toSendPayload)
       
        setDisableButton(true);
        Axios.post(url,formData,config)
        .then(res => {console.log(res);
            setDisableButton(false);
            goTo(4);
        })
        .catch(err => {
            console.log(err);
            setDisableButton(false);
            setServerError(true)
            setTimeout(() => {
                setServerError(false)
            },2000)
        })
    }

    const next = (e,state) => {
        e.preventDefault();
        if( validateInputs(state)){
            setStep(step+1);
        }
        
    }

    const prev = (e,state) => {
        e.preventDefault();
        setStep(step-1);
    }

    const onDrop = async ([file]) => {
        //conver to base64 String, then set it to Image
             const reader = new FileReader();
             reader.onload = (event) => {
                 setImage(event.target.result)
             };
             reader.readAsDataURL(file);
            
            setPreviewImage(Object.assign({...file},{preview: URL.createObjectURL(file)}));
    }

    const goTo = (step) => {
        setStep(step);
    }

    const validateInputs = (state) => {

        let keys = Object.keys(state);
        if(keys.includes("previewImage")) {
            keys.splice(keys.indexOf("previewImage"),1);
        }
        let targetCount = keys.length;
        let count = 0;
        let errors = {...formError}

        for(let i=0;i<keys.length;i++) {
            //if the test pass, increment the COUNT
            switch(keys[i]) {
                case "name":
                    if(state.name.trim() !== '') {
                        let nameTokens = state.name.split(' ');
                        let capitalCount=0;
                        for(let j=0;j<nameTokens.length;j++) {
                        
                            if(nameTokens[j].charAt(0) === nameTokens[j].charAt(0).toUpperCase()) {
                                capitalCount+=1;
                            }
                        }
                        if(state.name.trim().length >= 2 && capitalCount === nameTokens.length) {
                            errors = {...errors,name:''}
                            // setFormError({...formError,name: ''})
                            count+=1;
                        } else {
                            //Please choose an appropriate name
                            errors = {...errors,name: "Please choose an appropriate name"}
                            // setFormError((formError) => ( {...formError,name: "Please choose an appropriate name"}))
                        }
                    } else {
                        //Please fill out the field
                        errors = {...errors,name: "Please fill out the field"}
                        // setFormError({...formError,name: "Please fill out the field"})
                    }
                    break;

                case "sport":
                    if(state.sport !== options[0] && state.sport !== '') {
                        errors = {...errors,sport: ''}
                        // setFormError({...formError,sport: ''})
                        count+=1;
                    } else {
                        errors = {...errors,sport: "Please select the options"}
                        // setFormError({...formError,sport: "Please select the options"})
                    }
                    break;
                    
                case "gender": 
                    if(state.gender !== genderOptions[0] && state.gender !== '') {
                        errors = {...errors,gender: ''}
                        // setFormError({...formError,gender: ''})
                        count+=1;
                    } else {
                        errors = {...errors,gender: "Please select the options"}
                        // setFormError({...formError,gender: "Please select the options"})
                    }
                    break;
                
                case "dob":
                    if(state.dob) {
                        if(Date.now() - new Date(state.dob).getTime() > 3600000000) {
                            errors = {...errors,dob: ''}
                            count+=1;
                        }
                        else {
                            errors = {...errors,dob: "Please select the valid date"}
                        }
                    } else {
                        errors = {...errors,dob: "Please select the date"}
                    }
                    break;
                
                case "location":
                    if(state.location.trim().length >= 2 ) {
                        errors = {...errors,location: ''}
                        setFormError({...formError,location: ''})
                        count+=1;
                    } else {
                        //Please choose an valid location
                        errors = {...errors,location: "Please select valid location"}
                    }
                    break;
                
                case "team":
                    if(state.team.trim() !== '') {
                        let nameTokens = state.team.split(' ');
                        let capitalCount=0;
                        for(let j=0;j<nameTokens.length;j++) {
                        
                            if(nameTokens[j].charAt(0) === nameTokens[j].charAt(0).toUpperCase()) {
                                capitalCount+=1;
                            }
                        }
                        if(state.team.trim().length >= 2 && capitalCount === nameTokens.length) {
                            errors = {...errors,team: ''}
                            count+=1;
                        } else {
                            errors = {...errors,team: "Please choose an appropriate name"}
                        }
                    } else {
                        errors = {...errors,team: "Please fill out the field"}
                    }
                    break;
                
                case "image":
                    if(previewImage) {
                        errors = {...errors,image: ''}
                        count+=1;
                    }
                    else {
                        errors = {...errors,image: "Please upload the Profile"}
                    }
                    break;
                
                case "desc": 
                    if(state.desc.length > 150) {
                        errors = {...errors,desc: ''}
                        count+=1;
                    }
                    else {
                        errors = {...errors,desc: "Please write 150 or more characters about yourself"}
                    }
                    break;
                
                default: 
            }
        }
        setFormError({...errors})
        if(count === targetCount) {
            return true;
        }

        return false;
    }

    switch(step) {
        case 1:
            return (
                <div className="mx-6">

               
                <BasicInfo
                genderOptions={genderOptions}
                next={next}
                state={{name,sport,gender,dob}}
                setState={{setName,setSport,setGender,setDob,setLocation}}
                options = {options}
                Form={FormContainer}
                formError={formError}
                />
                 </div>
            )
        case 2: 
            return (
                <div className="mx-6">
                <About
                next={next}
                prev={prev}
                state={{desc,location,team,image,previewImage}}
                setState={{setDesc,setLocation,setTeam,setImage}}
                options = {options}
                Form={FormContainer}
                onDrop={onDrop}
                formError={formError}
                />
                </div>

            )
        
        case 3:
            return (
                <div className="mx-6">
                <Summary 
                state={{previewImage,name,sport,gender,dob,desc,location,team,image}} 
                prev={prev} 
                next={next} 
                goTo={goTo}
                addAthletes={addAthletes}
                serverError={serverError}
                disableButton={disableButton}
                />
                </div>
            )
         
        case 4: 
            return (
                <div className="mx-6">
                <Success onClick={() => props.history.push('/')}/>
                </div>
            )
        
        default:
            return (
                <BasicInfo
                next={next}
                state={{name,sport,gender,dob}}
                setState={{setName,setSport,setGender,setDob}}
                options = {options}
                Form={FormContainer}
                formError={formError}
                />
            )
    }
}

export default Form
