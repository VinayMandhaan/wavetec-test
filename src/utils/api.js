import axios from 'axios'
import { notification, Divider, Space } from 'antd';


var baseUrl = 'http://localhost:5000/api'
var userToken = localStorage.getItem('token')
export const getTasks = async () => {
    userToken = localStorage.getItem('token')
    try {
        const response = await axios({
            method: 'GET',
            url: `${baseUrl}/tasks/get`,
            headers: {
                "x-auth-token": userToken
            }
        }).then((res) => {
            return res.data
        })
        return response
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => notification.error({
                message: 'Error',
                description:
                    `${error.msg}`,
                placement: 'bottomRight'
            }))
        } 
    }
}

export const updateTask = async (id, name) => {
    try {
        console.log(id, name)
        const response = await axios({
            method: 'PUT',
            url: `${baseUrl}/tasks/update`,
            headers: {
                "x-auth-token": userToken
            },
            data: {
                task_id: id,
                taskName: name
            }
        }).then((res) => {
            console.log(res)
            return res.data
        })
        return response
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => notification.error({
                message: 'Error',
                description:
                    `${error.msg}`,
                placement: 'bottomRight'
            }))
        } 
    }
}


export const addTask = async (title, priority, date) => {
    try {
        const response = await axios({
            method: 'POST',
            url: `${baseUrl}/tasks`,
            headers: {
                "x-auth-token": userToken
            },
            data: {
                task: title,
                priority: priority,
                due_date: date
            }
        }).then((res) => {
            console.log(res)
            return res.data
        })
        return response
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => notification.error({
                message: 'Error',
                description:
                    `${error.msg}`,
                placement: 'bottomRight'
            }))
        } 
    }
}

export const deleteTask = async (id) => {
    try {
        const response = await axios({
            method: 'DELETE',
            url: `${baseUrl}/tasks/delete`,
            headers: {
                "x-auth-token": userToken
            },
            data: {
                task_id: id
            }
        }).then((res) => {
            console.log(res)
            return res.data
        })
        return response
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => notification.error({
                message: 'Error',
                description:
                    `${error.msg}`,
                placement: 'bottomRight'
            }))
        } 
    }
}


export const login = async (email, password) => {
    try {
        const response = await axios({
            method: 'POST',
            url: `${baseUrl}/auth`,
            data: {
                email: email,
                password: password
            }
        }).then((res) => {
            console.log(res)
            return res.data
        })
        return response
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => notification.error({
                message: 'Error',
                description:
                    `${error.msg}`,
                placement: 'bottomRight'
            }))
        } 
    }
}

export const register = async (email, password) => {
    try {
        const response = await axios({
            method: 'POST',
            url: `${baseUrl}/auth/create`,
            data: {
                email: email,
                password: password
            }
        }).then((res) => {
            console.log(res)
            return res.data
        })
        return response
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => notification.error({
                message: 'Error',
                description:
                    `${error.msg}`,
                placement: 'bottomRight'
            }))
        } 
    }
}

