import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import "./header.scss";
import { logout } from "service/utilities";
import { Toast } from "service/toast";
import { decodeJWT } from "service/helpers";

const Header = () => {

  const [data, setData] = useState({});

  useEffect(() => {
    getAdminData();
  }, []);

  const getAdminData = async () => {
    const adminData = decodeJWT(localStorage.getItem('token'));
  }

  return (
    <>
      <div className="top-bar">
        <div className="userHeader py-4">
          {/* <img src={bell} /> */}
          {/* <Avatar /> */}
          {/* <p>{data?.staffName ?? 'Admin'}</p> */}
          <Dropdown className="custom-dropdown mt-1">
            <Dropdown.Toggle id="dropdown-basic">
              <img src={"DownCaret"} width={12} />
              {/* <span onClick={() => setisdropToggle(!isdropToggle)}>
                {isdropToggle ? "down" : "up"}
              </span> */}
            </Dropdown.Toggle>
            <Dropdown.Menu id="drop">
              <Dropdown.Item href="#" onClick={() => {
                logout();
                Toast({ type: "success", message: "Logged Out successfully " });
              }}>
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
