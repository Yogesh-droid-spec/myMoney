import { useState } from "react"
import {projectAuth} from '../firebase/config'
import { useAuthContext } from "./useAuthContext"
import { useEffect } from "react"

export const useLogout = () => {
    const [error,setError] = useState(null)
    const [loading,setIsLoading] = useState(false)
    const {dispatch} = useAuthContext()
    const [canceled,setIsCanceled] = useState(false);
    

    const logout = async () => {
        setError(null)
        setIsLoading(true)

        //sign the user out
        try{
          await projectAuth.signOut()

          //dispatch the  logout action
          dispatch({type:'LOGOUT'})

          //update state
       if(!canceled){
        setIsLoading(false)
        setError(null)}

        }
        catch(error){
            if(!canceled){
                console.log(error.message)
                setError(error.message)
                setIsLoading(false)
            }
        }   
    }

    useEffect(() => {
        //clean up function
      return () => setIsCanceled(true)
    },[])

    return {logout,loading,error}
}