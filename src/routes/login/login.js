import { TextField } from '@mui/material'
import React, {useState, useContext } from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Box from '@mui/material/Box';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../components/context/Context';



const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    let {url , dispatch } = useContext(ProductContext);
    

    async function login() {

        if(email === ''){
            return toast.error('Please enter your Email')
        }

        const user = {
            email,
            password,
        }
       

        try {
             await axios.post(`${url}/users/login`, user)
                .then(res => {
                    
                    localStorage.setItem('user', JSON.stringify(res.data.userData));

                    axios.post(`${url}/cart/getCart`, { email })
                    .then(res => {
                     // dispatch({ type: "setCart", payload:res.data.cart })
                     
                      console.log('object login',res.data.cart)
                      localStorage.setItem('cartArray', JSON.stringify(res.data.cart))
                      //cart = JSON.parse(localStorage.getItem('cartArray'))
                      dispatch({type:"setCart"})
                    })
                    .catch(err => console.log(err))

                })
            if (JSON.parse(localStorage.getItem('user'))) {
                navigate('/home')
            }
            toast.success('Login successful');
        } catch (error) {
            console.log('error : ', error.response.data.message)
            toast.error(error.response.data.message)
        }
    }

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };



    return (
        <div style={{background: 'rgb(0,55,190)radial-gradient(circle, rgba(0,55,190,1) 0%, rgba(0,18,46,1) 100%)', height: '100vh', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', flexDirection: 'column' }} className='d-flex justify-content-center align-items-center'>


            <h1 style={{ textAlign: "center", color: 'white', marginBottom: '80px' }}>Sign-In</h1>


            <Box sx={{ '& > :not(style)': { m: 1 }, input: { color: 'white' }, '& label': { color: 'white' } }}>
                <TextField
                    id="input-with-icon-textfield"
                    label="EMAIL"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon style={{ color: 'white' }} />
                            </InputAdornment>
                        ),
                    }}
                    variant="standard" fullWidth
                    value={email} onChange={(e) => setEmail(e.target.value)}

                />   <br />


                <FormControl sx={{ m: 1 }} variant="standard" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} >
                    <InputLabel htmlFor="standard-adornment-password" >PASSWORD</InputLabel>
                    <Input

                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}

                        startAdornment={
                            <InputAdornment position="start">
                                <VpnKeyIcon style={{ color: 'white' }} />
                            </InputAdornment>
                        }

                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff style={{ color: 'white' }} /> : <Visibility style={{ color: 'white' }} />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>

            </Box>

            <p style={{ textDecoration: 'none', color: 'white' }}>Don't have an account?<a href='/register' style={{ textDecoration: 'none', color: 'black', fontWeight:'bold' }} className='m-1'>Sign Up</a></p> <br />

            <button className='btn btn-dark mb-3' onClick={login} >LOGIN</button>

        </div>


    )
}

export default Login