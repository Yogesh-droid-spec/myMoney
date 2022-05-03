
import { useState,useEffect } from "react"
import {projectAuth} from '../firebase/config'
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
    const[error,setError] = useState(null)
    const[loading,setIsLoading] = useState(false)
    const[canceled,setIsCanceled] = useState(false)
    const {dispatch} = useAuthContext()

    const login = async(email,password) => {
        setError(null)
        setIsLoading(true)

        //login the user
        try{
         const res = await projectAuth.signInWithEmailAndPassword(email,password)

         //dispatch the login action
         dispatch({type:'LOGIN',payload:res.user})

         //update state
         if(!canceled){
             setError(null)
             setIsLoading(false)
         }
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
        return () => setIsCanceled(true)
    }
    ,[])

    return  {login,loading,error}
}