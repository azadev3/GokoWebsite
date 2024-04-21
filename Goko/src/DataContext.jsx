import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const DataContext = createContext();

export default function UserDataContext ({children}) {
     const navigate = useNavigate();
     const [userData, setUserData] = useState(null);
     const [token, setToken] = useState("");
     useEffect(() => {
          axios.post("http://localhost:3001/daxil-ol-login", {
          }).then ((response) => {
               if (response.data.message === 'success'){
                    const token = response.data.token;
                    const userHelloMsg = response.data.userHelloMsg;
                    setUserData({token, userHelloMsg});
                    setToken(token);
               }
          }).catch ((error) => {
               console.log(error)
          })
     }, [])

     const Logout = () => {
          setUserData(null);
          navigate ('/daxil-ol-login')
     }

     useEffect (() => {
          axios.get("http://localhost:3001/profile", {
               headers: {
                    Authorization: `Bearer ${token}`,
               }
          }).then ((response) => {
               if (response) {
                    navigate('/profile');
               }
          }).catch ((error) => {
               if (error) {
                    navigate('/daxil-ol-login');
                    console.log(error + 'AXIOS ERROR (response doesnt work');
               }
          })
     }, [token])

     return (
          <DataContext.Provider value={{ userData, Logout }}>
               {children}
          </DataContext.Provider>
     )
}