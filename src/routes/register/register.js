import { TextField } from '@mui/material'
import React, { useContext } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'; // for form validation schema
import { useFormik } from 'formik';
import { ProductContext } from '../../components/context/Context';



const registerSchemaValidation = yup.object({
  userName: yup.string().min(3, 'name should have minimum 3 character').required("Enter Your Name"),
  email: yup.string().email().required("Enter Email"),
  mobile: yup.string().matches(/^[0-9]{10}/, "Enter valid mobile number").required("Enter Mobile Number"),
  password: yup.string().min(8, 'enter minimum 8 character').required('not valid'),
  confirmpassword: yup.string().min(8, 'enter minimum 8 character').oneOf([yup.ref('password')], "Password Not Matched").required('Enter Password to Confirm')

})


const Register = () => {

  const navigate = useNavigate();
  const {url} = useContext(ProductContext);


  // formik function
  const { values, handleChange, handleSubmit, handleBlur, errors, touched } = useFormik({
    initialValues: {
      userName: "",
      email: "",
      mobile: "",
      password: "",
      confirmpassword: ""
    },

    validationSchema: registerSchemaValidation,
    onSubmit: (newuser) => signup(newuser)

  })



  async function signup(newuser) {

    try {
      await axios.post(`${url}/users/signup`, newuser).data
      toast.success('Registration successful');
      navigate('/login')
    } catch (error) {
      toast.error('Registration failed.Try again later')
    }

  }


  return (

    <div className='row signup-registration d-flex justify-content-center align-items-center' style={{ background: 'rgb(0,55,190)radial-gradient(circle, rgba(0,55,190,1) 0%, rgba(0,18,46,1) 100%)',flexDirection: 'column', height: '100vh'}}>

      <div className='form col-md-6 bs ' style={{ borderRadius: "5px", position: 'absolute' }} >

        <h1 style={{ textAlign: "center", color:'white' }}>Sign-Up</h1>

        <form onSubmit={handleSubmit}>

          <TextField id="outlined-basic1" required label="USER NAME" onBlur={handleBlur} variant="filled" fullWidth margin="normal" name="userName" value={values.userName} onChange={handleChange} InputLabelProps={{ style: { color: "white", fontSize:'13px' } }} /> <br />
          {touched.userName && errors.userName ? <p style={{ color: "red" }}>{errors.userName}</p> : ""}

          <TextField id="outlined-basic2" required label="EMAIL" variant="filled" onBlur={handleBlur} fullWidth margin="normal" name="email" value={values.email} onChange={handleChange} InputLabelProps={{ style: { color: "white", fontSize:'13px' } }}/> <br />
          {touched.email && errors.email ? <p style={{ color: "red" }}>{errors.email}</p> : ""}

          <TextField id="outlined-basic3" required label="MOBILE NUMBER" variant="filled" onBlur={handleBlur} fullWidth margin="normal" name="mobile" value={values.mobile} onChange={handleChange} InputLabelProps={{ style: { color: "white", fontSize:'13px' } }}/> <br />
          {touched.mobile && errors.mobile ? <p style={{ color: "red" }}>{errors.mobile}</p> : ""}

          <TextField id="outlined-basic4" required label="PASSWORD" variant="filled" onBlur={handleBlur} fullWidth margin="normal" name="password" value={values.password} onChange={handleChange} InputLabelProps={{ style: { color: "white", fontSize:'13px' } }}/> <br />
          {touched.password && errors.password ? <p style={{ color: "red" }}>{errors.password}</p> : ""}

          <TextField id="outlined-basic5" required label="CONFIRM PASSWORD" variant="filled" onBlur={handleBlur} fullWidth margin="normal" name="confirmpassword" value={values.confirmpassword} onChange={handleChange} InputLabelProps={{ style: { color: "white", fontSize:'13px' } }}/>
          {touched.confirmpassword && errors.confirmpassword ? <p style={{ color: "red" }}>{errors.confirmpassword}</p> : ""}

          <button className='btn btn-dark register-btn' type='submit' style={{ position: 'relative', left: '45%', marginTop:'20px' }} onClick={() => console.log('clicked')} >REGISTER</button>

        </form>
      </div>
    </div>
  )
}

export default Register