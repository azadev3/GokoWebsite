import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import gokoLogo from "/goko-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiTwotoneHome, AiFillMessage, AiTwotoneSetting } from "react-icons/ai";
import { BsSearchHeartFill } from "react-icons/bs";
import { MdSupportAgent } from "react-icons/md";
import { BiLogInCircle } from "react-icons/bi";
import { FaRegRegistered } from "react-icons/fa";
import '../UserSidebar/UserSidebar.scss';
import axios from "axios";
import { ToastContainer, Zoom, toast } from "react-toastify";


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

  ///USER AUTH AFTER CODE'S
  const [logged, setLogged] = useState(false);
  const [isModal, setModal] = useState(false);

 //Information on profile
  const name = localStorage.getItem('name');


  const navigate = useNavigate();
  const logout = () => {
    setModal(!isModal); 
   
  };

  const handleYes = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    setLogged(false);
    navigate('/daxil-ol-login');
  }

  const handleNo = () => {
    setModal(false);
  }
    ///USER AUTH AFTER CODE'S

  const [photo, setPhoto] = useState(false);
  const [changed, setChanged] = useState(false);
  const [uploadPhotoModal, setUploadPhotoModal] = useState(false);
  const fileInputRef = useRef(null);
  //when hover on photo img png
  const handlePhoto = () => {
    setPhoto(true);
  }
  const handlePhotoExit = () => {
    setPhoto(false);
  }
  //Profile photograph changed
  const changePhoto = () => {
    if (window.location.pathname === '/profile'){
      setChanged(true);
    setUploadPhotoModal(!uploadPhotoModal);
    }
  }

  //main PHOTO UPLOAD function;
  const [selectImage, setSelectImage] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const uploadPhoto = () => {
    if (fileInputRef.current){
      fileInputRef.current.click();
    }
  }

  const handleFileChange = (event) => {
    setRemoveImage(true);
          const file = event.target.files[0];
          if (file){
            const reader = new FileReader();
            reader.onload = (e) => {
              const dataImage = e.target.result;
              setSelectImage(dataImage);
              localStorage.setItem('image', dataImage);
            }
            reader.readAsDataURL(file);
          }          
  }


  const removeFromUploadImage = () => {
      setSelectImage(null);
      localStorage.removeItem("image");
  }

  useEffect (() => {
    const storedImage = localStorage.getItem('image');
    if (storedImage) {
      setSelectImage(storedImage);
    }
  }, [])


  //change USER_NAME
  const [username, setUsername] = useState(false);
  const [inputValue, setInputValue] = useState("");


  const changeUsername = () => {
    setUsername(!username);
  }
  const handleSubmitForChangeUsername = (e) => {
    e.preventDefault();
    axios.put("http://localhost:3001/profile", {
      newUsername: inputValue,
    }).then ((response) => {
      if (response.data.message === 'success') {
        toast.success("İstifadəçi adınız yenisi ilə əvəz edildi.", {
          position: toast.POSITION.TOP_CENTER
        })
        setUsername(false);
        localStorage.setItem('name', inputValue);
      }
    })
    .catch ((error) => console.error(error));
  }
  //change USER_NAME


  return (
    <div>
      <ToastContainer
      autoClose={2500}
      draggable={true}
      transition={Zoom}
      />
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

      <div className="Sidebar" ref={sidebarRef}>
        <div className="sidebar-top">
        <button className="learn-more" onClick={logout}>
        <span aria-hidden="true" className="circle">
          <span className="icon arrow" />
          </span>
          <span className="button-text">Çıxış</span>
        </button>
        </div>
      {isModal && (
          <div className="overlay">
            <div className="modal-content">
              <span className="line">DIQQƏT!</span>
              <h3>Hesabınızdan çıxmaq istədiyinizə əminsiniz?</h3>
              <div className="buttons">
              <button onClick={handleYes}>
              <span className="button_top">Hə</span>
              </button>

              <button onClick={handleNo}>
              <span className="button_top">Yox</span>
              </button>

                </div>
            </div>
            </div>
          )}

          <div className="sidebar-my-profile"> 
           <span className="profile"
            onMouseEnter={handlePhoto}
            onMouseLeave={handlePhotoExit}
            onClick={changePhoto}
           >
              {photo && (
                <img style={{backgroundColor: 'whitesmoke', borderRadius: '20%', width: '15%', position: 'absolute'}} 
                     hidden={window.location.pathname !== '/profile'} src="photo.png" alt=";(" />
              )}
            <img src={selectImage ? selectImage : "userProfile.png"} 
            style={{objectFit: 'cover', width: '100%', height: 'auto'}}/>
           </span>
           <br />
           
                {username ? (
                  <>
                  <input id="USER_NAME_INPUT" type="text" 
                  value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                  placeholder="yeni istifadəçi adınızı daxil edin..."
                  />
                  <i className="bi bi-pen" style={{cursor: 'pointer'}} onClick={changeUsername}/>
                  {inputValue && (
                    <button className="changeName" 
                    onClick={handleSubmitForChangeUsername}
                    >Dəyiş</button>
                  )}
                  </>
                ) : (
                  <h6 className="USER_NAME" style={{fontWeight: '1000'}}>
                    {name} 
                    <i className="bi bi-pen" style={{cursor: 'pointer'}} onClick={changeUsername}/></h6>
                )}


           <Link id='seeProfileLink' to='/profile'>
           <button hidden={window.location.pathname === '/profile'} id="seeProfile">
              Detallara bax <i className="bi bi-person-lines-fill" />
            </button>
            </Link>
          </div>

{/* MODAL OF PHOTO UPLOADING */}
                {uploadPhotoModal && (
              <div className="modal-of-photo-upload">
              <div className="modal-content">
              <i id="closed" className="bi bi-x-square" onClick={changePhoto} />
              <div className="profileUser">
              <img
              id="userProfile"
              src={selectImage ? selectImage : "userProfile.png"}
              alt="profil"
              />             
             </div>
                <button className="upload" onClick={uploadPhoto}>
                  <span>{selectImage ? <span>Şəkili dəyiş..</span> : <span>Şəkil yüklə...</span>}</span>
                  <input type="file" ref={fileInputRef} style={{display: 'none'}} onChange={handleFileChange}/>
                </button>
                  {removeImage &&
                  (<button id="removeBtn"
                  onClick={removeFromUploadImage}>Sil</button>)}
                {selectImage && (
                <button onClick={changePhoto} id="okBtn">Bu qalsın</button>
                )}
              </div>
            </div>
      )}
{/* MODAL OF PHOTO UPLOADING */}


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
                    to=""
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

        
      </div>
    </div>
  );
}
