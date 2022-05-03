import { useReducer,useState,useEffect} from "react";
import { projectFirestore ,timestamp} from "../firebase/config";

let initialState = {
    document:null,
    loading:false,
    error:null,
    success:null
}

const firestoreReducer = (state,action) => {
    switch(action.type){
        case 'LOADING':
            return {loading:true,document:null,error:null,success:null}

        case 'ADDED_DOCUMENT':
             return {document:action.payload,loading:false,success:true,error:null}

        case 'DELETED_DOCUMENT':
            return {document:null,loading:false,success:true,error:null}     
             
        case 'ERROR':
            return {loading:false,document:null,success:false,error:action.payload}     

        default:
            return state
    }
} 

export const useFirestore = (collection) => {
     const [response,dispatch] = useReducer(firestoreReducer,initialState)
     const[canceled,setIsCanceled] = useState(false)

     //collection ref
     const ref = projectFirestore.collection(collection)

     //only dispatch if not canceled
     const dispatchIfNotCanceled = (action) => {
         if(!canceled)
         {
             dispatch(action)
         }
     }

     //add document
     const addDocument = async(doc) => {
      dispatch({type:'LOADING'})

      try{
          const createdAt = timestamp.fromDate(new Date())
         const addedDocument =  await ref.add({...doc,createdAt})
          dispatchIfNotCanceled({type:'ADDED_DOCUMENT',payload:addedDocument})
      }
      catch(err){
          dispatchIfNotCanceled({type:'ERROR',payload:err.message})
      }
     }

     //delete a document
     const deleteDocument = async(id) => {
         dispatch({type:'LOADING'})

        try{ 
         await ref.doc(id).delete()
        dispatchIfNotCanceled({type:'DELETED_DOCUMENT'})
        }
        catch (err) {
        dispatchIfNotCanceled({type:'ERROR',payload:'could not delete'})
        }

     }
    
     //cleanup function
     useEffect(() => {
      return () => setIsCanceled(true)
     },[])

     return {addDocument,deleteDocument,response}
} 