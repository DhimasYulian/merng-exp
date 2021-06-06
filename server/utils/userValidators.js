const validateRegistrationInput = (username, email, password, confirmPassword) => {
    const errors = {}
    if(username.trim() === ""){
        errors.username = "Username can't be empty"
    } 
    if(email.trim() === ""){
        errors.email = "Email can't be empty"
    }else{
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if(!email.match(regEx)) errors.email = "Email is not valid"
    }
    if(password === ""){
        errors.password = "Password can't be empty"
    }else if(password !== confirmPassword){
        errors.password = "Password doesn't match"
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
} 

const validateLoginInput = (email, password) => {
    const errors = {}
    if(password.trim() === ""){
        errors.password = "Username can't be empty"
    } 
    if(email.trim() === ""){
        errors.email = "Email can't be empty"
    }else{
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if(!email.match(regEx)) errors.email = "Email is not valid"
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
} 

module.exports = {
    validateRegistrationInput,
    validateLoginInput
}