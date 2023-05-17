import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import "./header.scss";
import { logout } from "service/utilities";
import { Toast } from "service/toast";
import { decodeJWT } from "service/helpers";
import userImg from "assets/images/UserImg.svg";
import bell from "assets/images/bell.svg";
import findostLogo from "assets/images/findostLogo.svg";

const Header = () => {
  const [data, setData] = useState({});
  const location = useLocation();
  console.log("location :>> ", location?.pathname);

  useEffect(() => {
    getAdminData();
  }, []);

  const getAdminData = async () => {
    const adminData = decodeJWT(localStorage.getItem("token"));
  };

  return (
    <>
      <div className="top-bar col-12 p-0">
        {/* <div className={classes.toolbar}> */}

        {/* </div> */}
        <div className="userHeader d-flex align-items-center justify-content-between gap-3 py-3 px-5">
          <div className="bg-white">
            <img src={findostLogo} alt="logo"></img>
          </div>

          <div>
            <Dropdown className="custom-dropdown mt-1 d-flex align-items-center gap-3">
              <div className="mr-3">
                <img src={bell} width={45} alt="" />
              </div>
              <Dropdown.Toggle id="dropdown-basic">
                <img src={userImg} width={45} alt="" />
                {/* <span onClick={() => setisdropToggle(!isdropToggle)}>
                {isdropToggle ? "down" : "up"}
              </span> */}
              </Dropdown.Toggle>
              <Dropdown.Menu id="drop">
                <Dropdown.Item
                  href="#"
                  onClick={() => {
                    logout();
                    Toast({
                      type: "success",
                      message: "Logged Out successfully ",
                    });
                  }}
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {location?.pathname === "/admin/dashboard" && (
            <div className="header_overlay">
              <h6>Hi, Username</h6>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Header;
