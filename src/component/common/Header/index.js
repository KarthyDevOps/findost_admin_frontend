import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import "./header.scss";
import { logout } from "service/utilities";
import { Toast } from "service/toast";
import { decodeJWT } from "service/helpers";
import userImg from "assets/images/UserImg.svg";
import bell from "assets/images/bell.svg";

const Header = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    getAdminData();
  }, []);

  const getAdminData = async () => {
    const adminData = decodeJWT(localStorage.getItem("token"));
  };

  return (
    <>
      <div className="top-bar">
        <div className="userHeader py-4 px-5">
          <h6>Hi, Username</h6>
          <Dropdown className="custom-dropdown mt-1 d-flex align-items-center gap-3" >
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
      </div>
    </>
  );
};
export default Header;
