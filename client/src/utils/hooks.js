import {useState} from 'react'

export const useForm = (cb, initialState = {}) => {
    const [values, setValues] = useState(initialState)
    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        cb()
    }
    return {
        handleChange,
        handleSubmit,
        values
    }
}