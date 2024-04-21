import React, { useEffect, useRef } from "react";
import gokologo from "/goko-logo.svg";
import { useState } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import ClipLoader from "react-spinners/ClipLoader";

export default function Homepage() {
  const [logoAnimation, setLogoAnimation] = useState(true);
  const logoRef = useRef(null);

  useEffect(() => {
    const animateLogo = () => {
      setLogoAnimation(true);
    };
    window.addEventListener("load", animateLogo);
    return () => {
      window.removeEventListener("load", animateLogo);
    };
  }, []);

  useEffect(() => {
    if (logoAnimation) {
      logoRef.current.style.animation = "top 1.5s ease-out forwards normal";
    } else {
      logoRef.current.style.animation = "none";
    }
  }, [logoAnimation]);

  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
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
        <div className="homepage-index">
          <section className="layerOne">
            <img
              src={gokologo}
              alt="GOKO"
              id="gokologohomepage"
              ref={logoRef}
            />
            <div className="text">
              <h1>Azərbaycanda ilk</h1>
              <Link to="/qeydiyyat-register" className="regstr">
                Sən də qeydiyyatdan keç,
              </Link>
              <h2>Sən də mənə qoşul 😉</h2>
            </div>
          </section>

          <section className="layerTwo">
            <AnimationOnScroll animateIn="animate__fadeInDown" delay={300}>
              <div className="articleOne">
                <i className="bi bi-chat-right-heart" />
                <p id="layer1msg">
                  Sevdiklərinlə istədiyin anda, istədiyin məkandan mesajlaş
                </p>
              </div>
            </AnimationOnScroll>

            <AnimationOnScroll animateIn="animate__fadeInDown" delay={400}>
              <div className="articleTwo">
                <i className="bi bi-cash-stack" />
                <p id="layer2msg">NO MONEY 😉</p>
              </div>
            </AnimationOnScroll>

            <AnimationOnScroll animateIn="animate__fadeInDown" delay={500}>
              <div className="articleThree">
                <i className="bi bi-arrow-up-circle" />
                <p id="layer3msg">
                  Azərbaycanın kodlaşdırma sahəsində daha da inkişafı üçün
                  çalışıram 😊
                </p>
              </div>
            </AnimationOnScroll>
          </section>

          <section className="layerThree">
            <div className="bar">
              <div className="left">
                <i className="bi bi-file-earmark-code" />
                <span>../</span>
              </div>
              <div className="right">
                <i className="bi bi-x-circle" />
                <i className="bi bi-aspect-ratio" />
                <i className="bi bi-chevron-compact-down" />
              </div>
            </div>
            <div className="whoAm">
              <span>C:\Users\Admin</span>
              <Typewriter
                options={{ loop: true, delay: "40" }}
                onInit={(typewrite) => {
                  typewrite
                    .typeString(
                      "Mən Mirheydərzadə Azad İsmayıl oğlu 2001-ci il İyun ayının 9-u <br /> Naxçıvan şəhərində anadan olmuşam.<br />Kodlaşdırmağa uşaqlıqdan həvəsli olmuşam. Böyüdükcə bunu işim halına gətirdim<br/>və GOKO'nu yaratmağı qərara aldım."
                    )
                    .start();
                }}
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
}
