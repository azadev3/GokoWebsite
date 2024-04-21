import React, { useEffect, useState } from "react";
import "./settings.scss";
import gokologo from "/goko-logo.svg";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";


export default function Settings() {
  const headerItemsSettings = [
    { id: 1, title: "Profil" },
    { id: 2, title: "Hesab ayarları" },
    { id: 3, title: "Video yüklə" },
    { id: 4, title: "Dəstək" },
  ];

  const linkClassname = "li";

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
        <div className="settings">
          <header className="settings-header">
            <div className="bar">
              <div className="left">
                <span>Geri</span>
                <Link id="backIcon" to="/">
                  <i id="backIcon" className="bi bi-backspace-reverse" />
                </Link>
                <span id="settingText">Tənzimləmələr</span>
                <i id="settingIcon" className="bi bi-sliders" />
              </div>

              <div className="center">
                {headerItemsSettings.map((items) => (
                  <li key={items.id}>
                    {items.title === "Profil" ? (
                      <Link className={linkClassname} to="">
                        {items.title}
                      </Link>
                    ) : items.title === "Hesab ayarları" ? (
                      <Link className={linkClassname} to="">
                        {items.title}
                      </Link>
                    ) : items.title === "Video yüklə" ? (
                      <Link className={linkClassname} to="">
                        {items.title}
                      </Link>
                    ) : items.title === "Dəstək" ? (
                      <Link className={linkClassname} to="">
                        {items.title}
                      </Link>
                    ) : (
                      items.title
                    )}
                  </li>
                ))}
              </div>

              <div className="right">
                <img src={gokologo} alt="GOKO" />
              </div>
            </div>
          </header>

          <div className="settings-main"></div>
        </div>
      )}
    </>
  );
}
