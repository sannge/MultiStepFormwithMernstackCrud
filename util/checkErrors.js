const checkErrors = ({name, sport, gender, dob, desc, location, team, image}) => {
    const errors = {};
    
    const sports = ['Golf','Tennis','Cricket','Basket','Baseball',
    'American Football','Aquatics','Archery','Automobile Racing','Badminton',
    'Beach Volleyball','Bobsleigh','Body Building','Boxing','Cross Country Running',
    'Cross Country Skiing','Curling','Cycling','Darts','Decathlon',
    'Down Hill Skiing','Equestrianism','eSports','Fencing','Field Hockey',
    'Figure Skating','Gymnastics','Ice Hockey','Martial Arts','Mixed Martial Arts',
    'Modern Pentathlon','Motorcycle Racing','Netball','Polo',
    'Racquetball', 'Rowing', 'Rugby', 'Sailing', 'Softball',
    'Shooting', 'Skatboarding', 'Skeet Shooting', 'Skeleton', 'Snow Boarding',
    'Soccer (Football)', 'Squash', 'Surfing', 'Swimming', 'Track and Field'];

    const genders = ['Male', 'Female'];

    if(name && name.trim() === '') {
        errors.name = "Name cannot be empty!"
    }

    if(name && name.length < 2) {
        errors.name = "Name should contain at least 2 letters"
    }

    if(name) {
        let nameTokens = name.split(' ');
        let capitalCount=0;
        for(let j=0;j<nameTokens.length;j++) {
                        
            if(nameTokens[j].charAt(0) === nameTokens[j].charAt(0).toUpperCase()) {
                capitalCount+=1;
            }
    }

    if((capitalCount !== nameTokens.length)) {
        errors.name = "Name initals must start with Uppercase"
    }
    }

    if(sport && !sports.includes(sport)) {
        errors.sport = "Sport must be one of the followings from the selection"
    }

    if(gender && !genders.includes(gender)) {
        errors.gender = "Gender must be Male or Female"
    }

    if(dob && dob.trim() === '') {
        errors.dob = "Please select the date"
    }

    if(dob && new Date(dob) === undefined) {
        errors.dob = "Date is undefined"
    }

    if(dob && Date.now() - new Date(dob).getTime() <= 3600000000) {
        errors.dob = "Please select the valid date"
    }

    if(desc && desc.length < 150) {
        errors.desc = "Please write at least 150 letters about yourself"
    }

    if(location && location.length < 2) {
        errors.location = "Please provide a valid location"
    }

    if(team && team.trim() === '') {
        errors.team ="Team must not be empty"
    }

    if(image && image.trim() === '') {
        errors.image = 'Image must not be empty'
    }

    return errors;
    
}

module.exports = checkErrors