import axios from 'axios'

var baseUrl = 'http://localhost:5000/api'
var userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIzYjQ5MmEzZWZlYmQyYWE0NTMyM2Y4In0sImlhdCI6MTY0ODA2MzE5MywiZXhwIjoxNjQ4MDk5MTkzfQ.Yc5gk3ViBnNG9H-49gUMPnFUpB3u4r_Np5Gmlq-6xbw"
export const getTasks = async() => {
    try{
        const response = await axios({
            method:'GET',
            url:`${baseUrl}/tasks/get`,
            headers: {
                "x-auth-token":userToken
            }
        }).then((res) => {
            return res.data
        })
        return response
    }catch(err){
        console.log(err)
    }
}

export const updateTask = async(id,name) => {
    try{
        console.log(id,name)
        const response = await axios({
            method:'PUT',
            url:`${baseUrl}/tasks/update`,
            headers: {
                "x-auth-token":userToken
            },
            data: {
                task_id : id,
                taskName: name
            }
        }).then((res) => {
            console.log(res)
            return res.data
        })
        return response
    }catch(err){
        console.log(err)
    }
}


export const addTask = async(title,priority,date) => {
    try{
        const response = await axios({
            method:'POST',
            url:`${baseUrl}/tasks`,
            headers: {
                "x-auth-token":userToken
            },
            data: {
                task: title,
                priority:priority,
                due_date:date
            }
        }).then((res) => {
            console.log(res)
            return res.data
        })
        return response
    }catch(err){
        console.log(err)
    }
}

export const deleteTask = async(id) => {
    try{
        const response = await axios({
            method:'DELETE',
            url:`${baseUrl}/tasks/delete`,
            headers: {
                "x-auth-token":userToken
            },
            data: {
                task_id: id
            }
        }).then((res) => {
            console.log(res)
            return res.data
        })
        return response
    }catch(err){
        console.log(err)
    }
}

