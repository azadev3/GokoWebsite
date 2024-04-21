import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import {ToastContainer, toast, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export default function Log() {
  const [showPass, setShowPass] = useState(false);
  const showPassword = () => {
    setShowPass(false);
  };
  const hidePassword = () => {
    setShowPass(true);
  };

  //animation on page
  const [animation, setAnimation] = useState(false);
  useEffect (() => {
    setAnimation(true);
  }, [animation])



  //backend connection on mysql database my front end values;
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [token, setToken] = useState('');
const navigate = useNavigate();
const login = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:3001/daxil-ol-login", {
    username: username,
    password: password,
    })
    if (response.data.message === "success") {
        const token = response.data.token;
        const userHelloMsg = response.data.userHelloMsg;
        localStorage.setItem('token', token);
        localStorage.setItem('name', userHelloMsg);
        localStorage.getItem('name');
        setToken(token);
      toast.success ("Giriş uğurludur, yönləndirilirsiniz..", {
        position: toast.POSITION.TOP_CENTER
      })
    } else if (response.data.message === "messageWrong") {
      toast.warn ("Xanaları doldurun!", {
        position: toast.POSITION.TOP_CENTER
      })
    } else if (response.data.message === "wrongpass") {
      toast.error ("Şifrə yaxud digər məlumatlar səhv daxil edilib. Düzgünlüyünü yoxlayıb yenidən yazın.", {
        position: toast.POSITION.TOP_CENTER
      })
    }
  } catch {
    if (error) {
      console.log(error + "hata")
    }

  }

}
useEffect (() => {
  if (token){
    axios.get ('http://localhost:3001/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then ((response) => {
      if (response){
        navigate('/profile');
      }
    }).catch ((error) => {
      navigate('/daxil-ol-login');
      console.log(error + 'Axios xetasi')
    })
  }
  
}, [token])
//backend connection on mysql database my front end values;


  return (
    <div className="login">
      <CSSTransition in={animation} timeout={1500} classNames="fade"> 
        <form action="/daxil-ol-login" method="post">
          <ToastContainer 
          draggable={false}
          transition={Bounce}
          autoClose={2100}
          />
          <div className="back">
            <h4>
              Geri qayıt
              <Link to="/">
                <i className="bi bi-backspace" />
              </Link>
            </h4>
          </div>
          <div className="form-input">
            <label>İstifadəçi adı yaxud Email-Gmail:</label>
            <input type="text" name="text" required value={username} onChange={(e) => setUsername(e.target.value)}/>
          </div>

          <div className="form-input">
            <label>Şifrə:</label>
            <div className="input" style={{ position: "relative" }}>
              <input
                type={showPass ? "password" : "text"}
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <i
                id="iconEye"
                style={{
                  color: "black",
                  cursor: "pointer",
                  position: "absolute",
                }}
                className={showPass ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"}
                onClick={showPass ? showPassword : hidePassword}
              />
            </div>
          </div>

          <button type="submit" name="submit" onClick={login}>
            Daxil ol
          </button>

          <div className="help-part">
            <Link to="">Şifrəmi unutmuşam</Link>
            <Link to="">Email & Gmail unutmuşam</Link>
            <Link to="/qeydiyyat-register">Qeydiyyat'dan keçməmişəm</Link>
          </div>
         
        </form>
      </CSSTransition>
      
  
    </div>
  );
}