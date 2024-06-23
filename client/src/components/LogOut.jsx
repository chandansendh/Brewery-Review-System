import { useEffect } from "react"
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Logout = () =>{
    const {logOutUser} = useAuth();
    useEffect(()=>{
        logOutUser();
        toast.success("Log out successful");
    },[logOutUser])
    return(
        <>
            <Navigate to="/"></Navigate>
        </>
    )
}