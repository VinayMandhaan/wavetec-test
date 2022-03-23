import React, { useState, useEffect } from 'react'
import { useTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom'
import { notification, Divider, Space } from 'antd';
import './Login.css'



const Login = (props) => {
    const theme = useTheme();
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // const login = () => {
    //     api({
    //         method:'POST',
    //         url:'/user',
    //         data:{
    //             email:email,
    //             password:password
    //         }
    //     }).then((res) =>{
    //         console.log(res)
    //         openNotification()
    //         localStorage.setItem('token',res.data.token)
    //         setAuthToken(res.data.token)
    //         history.push('/')
    //     }).catch((err) => {
    //         notification.error({
    //             message: 'Error',
    //             description:
    //               `${err}`,
    //             placement:'bottomRight'
    //         });
    //     })
    // }

    const openNotification = () => {
        notification.success({
            message: 'Login Success',
            description:
              '',
            placement:'bottomRight'
        });
    };



    return (
        <div className="login-container">
                {/* <img style={{width:'20%'}} src={Logo}/> */}
            <div className="deform">
                <div className="hedin">
                    <h1>LOGIN</h1>
                </div>
                <form action={'JavaScript:void(0)'}>
                    <div className="form-field">
                        <label style={{ color: theme.palette.text.primary }}>Email Address</label>
                        <input required type="email" onChange={(e)=>setEmail(e.target.value)} style={{ color: theme.palette.text.secondary }} placeholder="Email" />
                    </div>
                    <div className="form-field">
                        <label style={{ color: theme.palette.text.primary }}>Password</label>
                        <input required type="password" onChange={(e)=>setPassword(e.target.value)} style={{ color: theme.palette.text.secondary }} placeholder="Password" />
                    </div>
                    <div className="form-field btn-login">
                        {/* <input type="submit" value="Log in" /> */}
                        <Button className={'submitBtn'} variant="contained" color="secondary" disableElevation>
                            LOG IN
                    </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login