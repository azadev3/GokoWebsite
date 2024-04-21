import React, { useEffect, useRef, useState } from 'react'
import '../Account/Account.scss';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import UserSidebar from '../UserSidebar/UserSidebar';

export default function Account() {

  const [loading, setLoading] = useState(true);
  const accountDiv = useRef(null);
  useEffect (() => {
    setTimeout(() => {
      setLoading(false);
      if(accountDiv.current){
        accountDiv.current.style.overflow = 'auto';
      }
    }, 2700);
  }, [loading]);



  //BACKEND-------==-=-=-==--==-
  const [logged, setLogged] = useState(false);
  const token = localStorage.getItem('token');
  const nameUser = localStorage.getItem('name');
  const navigate = useNavigate();
        


  useEffect(() => {
    if (token) {
      setLogged(true);
    } else {
      setLogged(false);
      navigate('/daxil-ol-login');
    }
  }, [token, navigate]);

  if (!logged) {
    return null; 
  }
  //BACKEND -0--00--==--==--=-=-=
 




     
  return (
    <div className='Account' ref={accountDiv}>
      {loading ? (
        <motion.div 
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1.1 }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 30
        }}
        className='WelcomeMessage'>
        <h1>Salam <span>{nameUser}</span>!</h1>
        </motion.div>
          

      ) : (
        <div className='Account'>
        <UserSidebar />
        </div>
      )}


  

    </div>
  );
}