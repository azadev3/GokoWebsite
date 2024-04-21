import React, { useEffect, useState } from "react";
import "./Support.scss";
import ClipLoader from "react-spinners/ClipLoader";

export default function Support() {
  const [selectedOption, setSelectedOption] = useState("");
  const handleChangeSelect = (e) => {
    setSelectedOption(e.target.value);
  };

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
        <div className="support-container">
          <form id="form">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Adınız:</label>
              <input type="text" className="form-control" />
              <small className="form-text text-muted">
                Bu sayta daxil olarkən qoyduğunuz ad olmaya da bilər.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Email yaxud Gmail:</label>
              <input type="email" className="form-control" />
            </div>
            <div className="form-group form-check">
              <select
                required
                value={selectedOption}
                onChange={handleChangeSelect}
              >
                <option>Sualınıza uyğun variantı seçin</option>
                <option>GOKO'dan heç nə anlamadım!</option>
                <option>Sizinlə görüşmək istəyirəm</option>
                <option>Profilim haradadır?</option>
                <option>Mesajım niyə getmir?</option>
                <option>Qeydiyyatdan keçə bilmədim!</option>
                <option>Daxil ola bilmirəm!</option>
                <option>Şəkil yükləyə bilmirəm!</option>
                <option>Hesabım oğurlanıb!</option>
                <option>Başqa bir şey...</option>
              </select>
            </div>
            <div className="form-msg-label">
              {selectedOption === "Başqa bir şey..." && (
                <textarea placeholder="Başqa probleminiz varsa burada qeyd edin..." required rows="5" cols="45"></textarea>
              )}
            </div>
            <div className="button">
              <button id="checkBtn" type="submit" name="submit">
                Göndər
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
