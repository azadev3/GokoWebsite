import React, { useEffect, useState } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";
import axios from "axios";
import { ToastContainer, Bounce, toast } from "react-toastify";

export default function Reg() {
  //password skill
  const [showPass, setShowPass] = useState(false);
  const showPassword = () => {
    setShowPass(false);
  };
  const hidePassword = () => {
    setShowPass(true);
  };

  //backend connection on mysql database my front end values;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");

  const register = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/qeydiyyat-register", {
        username: username,
        email: email,
        password: password,
        date: date,
        gender: gender,
      })
      .then((response) => {
        if (response.data.message === "empty") {
          toast.warn("Zəhmət olmasa bütün xanaları doldurun..", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else if (response.data.message === "errControl") {
          toast.error(
            "Bu istifadəçi adı yaxud email zatən mövcuddur. Zəhmət olmasa daxil olun.",
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
        } else if (response.data.message === "tryagain") {
          toast.error("Bir problem var..yeniden yoxlayin", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else if (response.data.message === "success") {
          toast.success(
            "Təşəkkür edirəm! Qeydiyyat uğurla tamamlandı. Giriş səhifəsinə yönləndirilirsiniz.",
            {
              position: toast.POSITION.TOP_CENTER,
            }
          );
          
          setTimeout(() => {
            window.location.href = '/daxil-ol-login';
          }, 2000);
        } else if (response.data.message === "required") {
          toast.error(
            "@ işarəsi və E-poçta aid atributlar məcburidir! Müəyyən təhlükəsizliklərdən qaçınmaq üçün düzgün email yaxud gmail qeyd etməyiniz xahiş olunur."
          ),
            {
              position: toast.POSITION.TOP_CENTER,
            };
        }
      });
  };
  //backend connection on mysql database my front end values;

  
  //loading animation
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 650);
  }, []);

  return (
    <>
      {loader ? (
        <div style={{ position: "absolute", right: "45%", top: "40%" }}>
          <RingLoader color={"mediumslateblue"} loading={loader} size={100} />
        </div>
      ) : (
        <div className="register">
          <form action="/qeydiyyat-register" method="post">
            <ToastContainer
              draggable={false}
              autoClose={2200}
              transition={Bounce}
            />
            <div className="back">
              <h4>
                Geri qayıt
                <Link to="/">
                  <i className="bi bi-backspace" />
                </Link>{" "}
                <br />
                <Link to="/daxil-ol-login" style={{ fontSize: "1.2rem" }}>
                  Zatən bir hesabım var
                </Link>
              </h4>
            </div>
            <div className="form-input">
              <label>İstifadəçi adı:</label>
              <input
                type="text"
                name="text"
                required
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>

            <div className="form-input">
              <label>Email yaxud Gmail:</label>
              <input
                type="email"
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="form-input">
              <label>Şifrə:</label>
              <div className="input" style={{ position: "relative" }}>
                <input
                  type={showPass ? "password" : "text"}
                  name="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />

                <i
                  id="iconEye"
                  style={{
                    color: "black",
                    cursor: "pointer",
                    position: "absolute",
                  }}
                  className={
                    showPass ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"
                  }
                  onClick={showPass ? showPassword : hidePassword}
                />
              </div>
            </div>

            <div className="form-input">
              <label>Doğum tarixiniz:</label>
              <input
                type="date"
                required
                onChange={(e) => setDate(e.target.value)}
                value={date}
              />
            </div>

            <div className="form-input-gender">
              <label>Cinsiyyətiniz:</label>
              <input
                type="radio"
                name="gender"
                value="Kişi"
                checked={gender === "Kişi"}
                onChange={(e) => setGender(e.target.value)}
              />
              <small>Kişi</small>
              <input
                type="radio"
                name="gender"
                value="Qadın"
                checked={gender === "Qadın"}
                onChange={(e) => setGender(e.target.value)}
              />
              <small>Qadın</small>
              <input
                type="radio"
                name="gender"
                value="Null"
                checked={gender === "Null"}
                onChange={(e) => setGender(e.target.value)}
              />
              <small>Null</small>
            </div>
            <button type="submit" name="submit" onClick={register}>
              Qeydiyyatdan keç
            </button>
          </form>
        </div>
      )}
    </>
  );
}
