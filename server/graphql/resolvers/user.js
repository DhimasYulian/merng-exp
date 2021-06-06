const bcrypt = require('bcryptjs')
const {UserInputError} = require('apollo-server')

const User = require('../../models/User')
const {validateRegistrationInput, validateLoginInput} = require('../../utils/userValidators')
const generateToken = require('../../utils/generateToken')

const userResolver = {
    Mutation: {
        login: async (_, {loginInput: {email, password}}) => {
            const {errors} = validateLoginInput(email, password)
            const user = await User.findOne({email})
            if(!user){
                errors.general = "User not found"
                throw new UserInputError("User not found", {
                    errors: {
                        email: "User not found"
                    }
                })
            }

            const match = await bcrypt.compareSync(password, user.password)

            if(!match){
                errors.general = "Wrong credentials"
                throw new UserInputError("Wrong credentials", {
                    errors: {
                        password: "Wrong credentials"
                    }
                })
            }

            const token = generateToken(user)

            return {
                ...user._doc,
                id: user._id,
                token
            }
        },
        register: async (_, {registerInput: {username, email, password, confirmPassword}}) => {
                const {errors, valid} = validateRegistrationInput(username, email, password, confirmPassword)
                if(!valid) {
                    throw new UserInputError("errors", {errors})
                }
                const user = await User.findOne({email})
                if(user) {
                    throw new UserInputError("Email is already in use", {
                        errors: {
                            email: "Email is already in use"
                        }
                    })
                } 
                const hashedPassword = await bcrypt.hash(password, 12)
                const newUser = new User({
                    email,
                    username,
                    password: hashedPassword,
                    createdAt: new Date().toISOString()
                })
                const res = await newUser.save()
                
                const token = generateToken(res)

                return {
                    ...res._doc,
                    id: res._id,
                    token
                }

        }
    }
}

module.exports = userResolver
