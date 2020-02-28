import React, {useState, useEffect} from 'react';
import {withFormik,  Field, Form} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'



const FormMaker = ({values, errors, touched, status}) => {
   
    const [user,setUser] = useState([])

    useEffect(() => {
        console.log('status has changed!', status)
        status && setUser(user => [...user,status])
        console.log(user)
    },[status])
   

    

  
    
    return (
     <div>
           <Form>
            <label htmlFor='name'>
           <Field  id='name' type='text' name='name'/>
           {touched.name && errors.name && (
               <p>{errors.name}</p>
           )}
           
           </label>
           <Field type='email' id='email' name='email'/>
           {touched.email && errors.email && (
               <p>{errors.email}</p>
        
           )}
           
           <Field type='password' id='password' name='password'/>
           {touched.password && errors.password && (
               <p>{errors.password}</p>
           )}
           <Field type='checkbox' id='checkbox' name='TOS'/>
           <button type='submit'>submit</button>
         </Form>
         {user.map(elem => {
     return<div>
             <p>{elem.name}</p>
            <p>{elem.email}</p>
            <p>{elem.password}</p>
        </div>
           
          
})}
    </div>       
        
    );
};
const FormikForm = withFormik({
    mapPropsToValues(props) {
     return {
         name: props.name || '',
         email: props.email || '',
         password: props.password || ''
     }

    },
    validationSchema: Yup.object().shape({
        name: Yup.string().min(3).required('Required!'),
        email:Yup.string().email().required('Required'),
        password: Yup.string().required('Required')
    }),
    handleSubmit(values, {setStatus, resetForm}) {
        console.log('submitting', values)
        axios.post('https://reqres.in/api/users', values)
        .then(res => {
            console.log(res)
            setStatus(res.data)
            resetForm()
        })
    }
})(FormMaker)
export default FormikForm;