import React from 'react'
import styles from './Signup.module.css'
import { useState } from 'react'
import { useSignUp } from '../../hooks/useSignUp'

export default function SignUp() {

  const [email,setEmail] = useState('')
   const [password,setPassword] = useState('')
   const[displayName,setDisplayName] = useState('')
   const {error,loading,signup} = useSignUp()

   const handleSubmit = (e) => {
     e.preventDefault();
     signup(email,password,displayName)
   }

  return (
    <form onSubmit={handleSubmit} className={styles['signup-form']}>
    <h2>SignUp</h2>
    <label>
      <span>email:</span>
      <input 
      type='email'
      onChange={(e) => setEmail(e.target.value)}
      value={email}
      />
    </label>

    <label>
      <span>password:</span>
      <input 
      type='password'
      onChange={(e) => setPassword(e.target.value)}
      value={password}
      />
    </label>

    <label>
      <span>display name:</span>
      <input 
        type='text'
        onChange={(e) => setDisplayName(e.target.value)}
        value={displayName}
       />
    </label>

    {!loading&&<button className='btn'>SignUp</button>}
    {loading&&<button className='btn' disabled>loading</button>}
    {error&&<p>{error}</p>}
</form>
  )
}
