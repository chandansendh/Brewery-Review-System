import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext =createContext();

export const AuthProvider = ({children}) => {

    const[token,setToken]=useState(localStorage.getItem("token"));
    const[user,setUser] = useState();

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    };

    const isLogIn = !! token;

    const logOutUser=()=>{
        setToken("");
        return localStorage.removeItem("token");
    }

    const userAuthentication = async()=>{
        try {
            const responce = await fetch(
              "https://brewery-server.onrender.com/api/auth/user",
              {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            if(responce.ok){
                const data = await responce.json()
                setUser(data.userData);
            }
        } catch (error) {
            console.error("Error Fetching User Data");
        }
    };

    useEffect(() => {
      userAuthentication();
    }, [isLogIn]);

    return (
        <AuthContext.Provider value={{storeTokenInLS, logOutUser, isLogIn, user,}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth=()=>{
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth used outside of the Proviser");
    }
    return authContextValue;
};