import React from "react";
import "./messages.scss";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

export default function Messages() {
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 300);
  }, []);

  return (
    <>
      {loader ? (
        <div
          className="cliploader"
          style={{ position: "absolute", right: "40%", top: "40%" }}
        >
          <ClipLoader color={"medimslateblue"} loading={loader} size={80} />
        </div>
      ) : (
        <div className="messages">
          <div className="alert">
            <div className="bar">
              <h1>Ups! Aşağını oxu 😉</h1>
            </div>
            <div className="content">
              <i className="bi bi-cone-striped" />
              <p>
                Mesajlarınıza baxmaq, mesaj atmaq, videoları izləmək <br />
                və saytın bir çox özəlliklərindən faydalanmaq üçün <br />
                zəhmət olmasa aşağıdakı düyməni sıxıb qeydiyyatdan keçin.
              </p>
            </div>
            <div className="accountbuttons">
              <Link to="/qeydiyyat-register" id="regbtn">
                <button type="submit">Qeydiyyat</button>
              </Link>
              <span>Hesabın var?</span>
              <Link to="/daxil-ol-login" id="logbtn">
                <button type="submit">Daxil ol</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
