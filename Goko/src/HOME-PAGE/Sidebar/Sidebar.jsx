import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import "./Sidebar.scss";
import "./MobileSidebar.scss";
import gokoLogo from "/goko-logo.svg";
import { Link, NavLink } from "react-router-dom";
import { AiTwotoneHome, AiFillMessage, AiTwotoneSetting } from "react-icons/ai";
import { BsSearchHeartFill } from "react-icons/bs";
import { MdSupportAgent } from "react-icons/md";
import { BiLogInCircle } from "react-icons/bi";
import { FaRegRegistered } from "react-icons/fa";
import UserSidebar from '/src/Account/UserSidebar/UserSidebar';

export default function Header() {
  //SIDEBAR MOBILE OPTIONS ---------------
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const sidebarRef = useRef(null);
  const listIcon = useRef(null);
  const registerIconsRef = useRef(null);
  const toggleSidebar = () => {
    setMobileSidebar(!mobileSidebar);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 720) {
        if (listIcon.current && sidebarRef.current && registerIconsRef.current) {
          listIcon.current.classList.add("show");
          listIcon.current.classList.remove("hidden");
          sidebarRef.current.classList.add("hiddenSidebar");
          sidebarRef.current.classList.remove("showSidebar");
          registerIconsRef.current.classList.add("showReg");
          registerIconsRef.current.classList.remove("hiddenReg");
        }
      } else {
        listIcon.current.classList.add("hidden");
        listIcon.current.classList.remove("show");
        sidebarRef.current.classList.add("showSidebar");
        sidebarRef.current.classList.remove("hiddenSidebar");
        registerIconsRef.current.classList.remove("showReg");
          registerIconsRef.current.classList.add("hiddenReg");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const IfCloseMobileSidebarIcons = [
    { id: 1, icon: <AiTwotoneHome /> },
    { id: 2, icon: <BsSearchHeartFill /> },
    { id: 3, icon: <AiFillMessage /> },
    { id: 4, icon: <AiTwotoneSetting /> },
    { id: 5, icon: <MdSupportAgent /> },
  ];
  const IfCloseMobileSidebarRegisterIcons = [
    { id: 1, icon: <FaRegRegistered /> },
    { id: 2, icon: <BiLogInCircle /> },
  ];

  //SIDEBAR MOBILE OPTIONS ---------------
  const SidebarItems = [
    { id: 1, title: "Ana Səhifə" },
    { id: 2, title: "Axtarış" },
    { id: 3, title: "Mesajlar" },
    { id: 4, title: "Tənzimləmələr" },
    { id: 5, title: "Dəstək Bölməsi" },
  ];
  const FooterItems = [
    { id: 1, title: "Qeydiyyat" },
    { id: 2, title: "Giriş" },
  ];


  const [logged, setLogged] = useState(false);
  const token = localStorage.getItem('token');
  useEffect (() => {
    if (token) {
      setLogged(true);
    }
  }, [token, logged])

  
  return (
    <>
      {/* SIDEBAR MOBILE CONTENTS ----------------------------------------------------------------------------------- */}

      <div className="step-1">
        <i className="bi bi-list-ul" onClick={toggleSidebar} ref={listIcon} />
        <div className="IfCloseMobileSidebar" style={{ position: "fixed" }}>
          {IfCloseMobileSidebarIcons.map((items) => (
            <div className="icons" key={items.id}>
              <i key={items.id}>
                {items.id === 1 && (
                  <Link to="/" id="linkI" style={{ color: "#303030" }}>
                    {items.icon}
                  </Link>
                )}
                {items.id === 2 && (
                  <Link
                    to="/search-axtarish"
                    id="linkI"
                    style={{ color: "#303030" }}
                  >
                    {items.icon}
                  </Link>
                )}
                {items.id === 3 && (
                  <Link
                    to="/messages-mesajlar"
                    id="linkI"
                    style={{ color: "#303030" }}
                  >
                    {items.icon}
                  </Link>
                )}
                {items.id === 4 && (
                  <Link
                    to="/settings-tenzimlemeler"
                    id="linkI"
                    style={{ color: "#303030" }}
                  >
                    {items.icon}
                  </Link>
                )}
                {items.id === 5 && (
                  <Link
                    to="/support-destek-bolmesi"
                    id="linkI"
                    style={{ color: "#303030" }}
                  >
                    {items.icon}
                  </Link>
                )}
              </i>
            </div>
          ))}

          <div className="registerIcons" ref={registerIconsRef}>
            {IfCloseMobileSidebarRegisterIcons.map((items) => (
              <i key={items.id}>
                {items.id === 1 && (
                  <Link to="/qeydiyyat-register" id="linkI">
                    {items.icon}
                  </Link>
                )}
                {items.id === 2 && (
                  <Link to="/daxil-ol-login" id="linkI">
                    {items.icon}
                  </Link>
                )}
              </i>
            ))}
          </div>
        </div>
      </div>

      {mobileSidebar && (
        <div className="step-2">
          <div className="MobileSidebar">
            <i className="bi bi-x" onClick={toggleSidebar} />
            <div className="Sidebar">
              <div className="sidebar-top">
                <img src={gokoLogo} alt="GOKO" className="logo-img" />

                <Link to="/" id="logotext">
                  <span className="logotext">Nədir?</span>
                </Link>
              </div>

              <div className="sidebar-content">
                {SidebarItems.map((item) => (
                  <nav key={item.id}>
                    <li>
                      {item.id === 1 && <i className="bi bi-house-door-fill" />}
                      {item.id === 2 && (
                        <i className="bi bi-search-heart-fill" />
                      )}
                      {item.id === 3 && <i className="bi bi-chat-heart-fill" />}
                      {item.id === 4 && <i className="bi bi-gear-fill" />}
                      {item.id === 5 && (
                        <i className="bi bi-question-circle-fill" />
                      )}

                      {item.title === "Axtarış" ? (
                        <NavLink
                          style={{ color: "#303030", textDecoration: "none" }}
                          to="/search-axtarish"
                        >
                          {item.title}
                        </NavLink>
                      ) : item.title === "Ana Səhifə" ? (
                        <NavLink
                          activeclassname="active"
                          style={{ color: "#303030", textDecoration: "none" }}
                          to="/"
                        >
                          {item.title}
                        </NavLink>
                      ) : item.title === "Mesajlar" ? (
                        <NavLink
                          style={{ color: "#303030", textDecoration: "none" }}
                          to="/messages-mesajlar"
                        >
                          {item.title}
                        </NavLink>
                      ) : item.title === "Tənzimləmələr" ? (
                        <NavLink
                          to="/settings-tenzimlemeler"
                          style={{ color: "#303030", textDecoration: "none" }}
                        >
                          {item.title}
                        </NavLink>
                      ) : item.title === "Dəstək Bölməsi" ? (
                        <NavLink
                          to="/support-destek-bolmesi"
                          style={{ color: "#303030", textDecoration: "none" }}
                        >
                          {item.title}
                        </NavLink>
                      ) : (
                        item.title
                      )}
                    </li>
                  </nav>
                ))}
              </div>

              <div className="sidebar-foot">
                {FooterItems.map((items) => (
                  <nav key={items.id}>
                    <li>
                      {items.id === 1 && <i className="bi bi-r-square-fill" />}
                      {items.id === 2 && <i className="bi bi-person-square" />}
                      {items.title === "Qeydiyyat" ? (
                        <Link
                          style={{
                            color: "mediumblue",
                            textDecoration: "none",
                          }}
                          to="/qeydiyyat-register"
                        >
                          {items.title}
                        </Link>
                      ) : items.title === "Giriş" ? (
                        <Link
                          style={{ color: "#303030", textDecoration: "none" }}
                          to="/daxil-ol-login"
                        >
                          {items.title}
                        </Link>
                      ) : (
                        items.title
                      )}
                    </li>
                  </nav>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* SIDEBAR MOBILE CONTENTS ----------------------------------------------------------------------------------- */}
    
    {logged ? (
      <UserSidebar />
    ) : (
      <div className="Sidebar" ref={sidebarRef}>
        <div className="sidebar-top">
          <img src={gokoLogo} alt="GOKO" className="logo-img" />

          <Link to="/" id="logotext">
            <span className="logotext">Nədir?</span>
          </Link>
        </div>

        <div className="sidebar-content">
          {SidebarItems.map((item) => (
            <nav key={item.id}>
              <li>
                {item.id === 1 && <i className="bi bi-house-door-fill" />}
                {item.id === 2 && <i className="bi bi-search-heart-fill" />}
                {item.id === 3 && <i className="bi bi-chat-heart-fill" />}
                {item.id === 4 && <i className="bi bi-gear-fill" />}
                {item.id === 5 && <i className="bi bi-question-circle-fill" />}

                {item.title === "Axtarış" ? (
                  <NavLink
                    style={{ color: "#303030", textDecoration: "none" }}
                    to="/search-axtarish"
                  >
                    {item.title}
                  </NavLink>
                ) : item.title === "Ana Səhifə" ? (
                  <NavLink
                    activeclassname="active"
                    style={{ color: "#303030", textDecoration: "none" }}
                    to="/"
                  >
                    {item.title}
                  </NavLink>
                ) : item.title === "Mesajlar" ? (
                  <NavLink
                    style={{ color: "#303030", textDecoration: "none" }}
                    to="/messages-mesajlar"
                  >
                    {item.title}
                  </NavLink>
                ) : item.title === "Tənzimləmələr" ? (
                  <NavLink
                    to="/settings-tenzimlemeler"
                    style={{ color: "#303030", textDecoration: "none" }}
                  >
                    {item.title}
                  </NavLink>
                ) : item.title === "Dəstək Bölməsi" ? (
                  <NavLink
                    to="/support-destek-bolmesi"
                    style={{ color: "#303030", textDecoration: "none" }}
                  >
                    {item.title}
                  </NavLink>
                ) : (
                  item.title
                )}
              </li>
            </nav>
          ))}
        </div>

        <div className="sidebar-foot">
          {FooterItems.map((items) => (
            <nav key={items.id}>
              <li>
                {items.id === 1 && <i className="bi bi-r-square-fill" />}
                {items.id === 2 && <i className="bi bi-person-square" />}
                {items.title === "Qeydiyyat" ? (
                  <Link
                    style={{ color: "mediumblue", textDecoration: "none" }}
                    to="/qeydiyyat-register"
                  >
                    {items.title}
                  </Link>
                ) : items.title === "Giriş" ? (
                  <Link
                    style={{ color: "#303030", textDecoration: "none" }}
                    to="/daxil-ol-login"
                  >
                    {items.title}
                  </Link>
                ) : (
                  items.title
                )}
              </li>
            </nav>
          ))}
        </div>
      </div>
    )}
    </>
  );
}
