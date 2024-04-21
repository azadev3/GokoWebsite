import React, { useContext, useEffect, useState } from "react";
import "./search.scss";
import gokologo from "/goko-logo.svg";
import { CSSTransition } from "react-transition-group";
import { ClipLoader } from "react-spinners";

export default function SearchPage() {
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 300);
  }, []);

  const [prop, setProp] = useState(false);
  useEffect(() => {
    setProp(true);
  }, [prop]);

  const [logged, setLogged] = useState(false);
  const token = localStorage.getItem('token');
  useEffect (() => {
    if (token) {
      setLogged(true);
    }
  }, [token, logged])

  return (
    <>
{logged ? (
  <h1>salam</h1>
  ) : (
    <div>
      {loader ? (
        <div
        className="cliploader"
        style={{ position: "absolute", right: "40%", top: "40%" }}
        >
          <ClipLoader color={"medimslateblue"} loading={loader} size={80} />
        </div>
      ) : (
        <div className="search">
          <header className="search-header">
            <img src={gokologo} alt="GOKO" />
          </header>

          <CSSTransition in={prop} timeout={1500} classNames="fade">
            <div className="search-area">
              <i id="srcIcon" className="bi bi-search" />
              <input type="search" placeholder="Uyğun bir şey axtar.." />
              <button id="srcBtn" type="search">
                Axtar
              </button>
            </div>
          </CSSTransition>
        </div>
      )}
    </div>
  )}
  </>
  );
}
