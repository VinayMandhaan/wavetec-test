import React, { useState, useEffect } from 'react'
import { useTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom'
import { notification, Divider, Space } from 'antd';
import './Login.css'
import { login, register } from '../../utils/api';



const Login = (props) => {
    const theme = useTheme();
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayRegister, setDisplayRegister] = useState(false)

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

    //     })
    // }

    const openNotification = (msg) => {
        notification.success({
            message: `${msg} Success`,
            description:
              '',
            placement:'bottomRight'
        });
    };

    const userLogin = async() => {
        const res = await login(email,password)
        if(res.token){
            localStorage.setItem('token',res.token)
            history.push('/')
            openNotification('Login')
        }
    }

    const userRegister = async() => {
        const res = await register(email,password)
        if(res.user){
            openNotification('Register')
        }
    }

    useEffect(() => {
        var userToken = localStorage.getItem('token')
        if(userToken !==null){
          history.push('/')
        } else {
          history.push('/login')
        }
      }, [])



    return (
        <div className="login-container">
                {/* <img style={{width:'20%'}} src={Logo}/> */}
            <div className="deform">
                <div className="hedin">
                    {
                        displayRegister ? <h1>REGISTER</h1> :  <h1>LOGIN</h1>
                    }
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
                        {
                            displayRegister ? (
                                <Button onClick={()=>userRegister()} className={'submitBtn'} variant="contained" color="secondary" disableElevation>
                                SIGN UP
                            </Button>
                            ) : (
                                <Button onClick={()=>userLogin()} className={'submitBtn'} variant="contained" color="secondary" disableElevation>
                                LOG IN
                            </Button>
                            )
                        }
                    </div>
                </form>
                <div>
                    {
                        displayRegister ? (
                            <h3 onClick={()=>setDisplayRegister(false)} style={{textAlign:'center', marginTop:20}}>LOGIN</h3>
                        ) : (
                            <h3 onClick={()=>setDisplayRegister(true)} style={{textAlign:'center', marginTop:20}}>REGISTER</h3>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Login