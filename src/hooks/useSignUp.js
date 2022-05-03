import { useState } from "react"
import { useEffect } from "react"
import {projectAuth} from '../firebase/config'
import { useAuthContext } from "./useAuthContext"

export const useSignUp = () => {
 const[error,setError] = useState(null)
 const[loading,setIsLoading] = useState(false)
 const {dispatch} = useAuthContext()
 const [canceled,setIsCanceled] = useState(false);

 const signup = async(email,password,displayName) => {
    setError(null)
    setIsLoading(true)
    
    try{
        //signup user
        const res = await projectAuth.createUserWithEmailAndPassword(email,password)
        

        if(!res){
            throw new Error("Could not complete signup!")
        }

        //add display name to user
        await res.user.updateProfile({displayName})

        //dispatch login action
        dispatch({type:'LOGIN',payload:res.user})

       //update state
       if(!canceled){
        setIsLoading(false)
        setError(null)}
    }

    catch(err){
        if(!canceled){
     console.log(err.message)
     setError(err.message)
     setIsLoading(false)
        }
    }
 }
 useEffect(() => {
     //clean up function
   return () => setIsCanceled(true)
 },[])

 return {error,loading,signup}
}