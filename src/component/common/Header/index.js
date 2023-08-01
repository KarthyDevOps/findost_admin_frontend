import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// style
import "./header.scss";
// images
import userImg from "assets/images/UserImg.svg";
import bell from "assets/images/bell.svg";
import findostLogo from "assets/images/findostLogo.svg";
// services
import { Dropdown } from "react-bootstrap";
import { AiOutlineLogout } from "react-icons/ai";
import { logout } from "service/utilities";
import { Toast } from "service/toast";
import { decodeJWT } from "service/helpers";
import { history } from "helpers";

const Header = () => {
  const [data, setData] = useState({});
  const location = useLocation();

  const getAdminData = async () => {
    const adminData = decodeJWT(localStorage.getItem("token"));
  };

  useEffect(() => {
    getAdminData();
  }, []);

  // get staff details
  const staffName = useSelector((state) => state?.home?.staffDetails[0]?.name);
  const staffEmail = useSelector(
    (state) => state?.home?.staffDetails[0]?.email
  );

  return (
    <>
      <div className="top-bar col-12 p-0">
        {/* <div className={classes.toolbar}> */}

        {/* </div> */}
        <div className="userHeader d-flex align-items-center justify-content-between gap-3 py-3 px-5">
          <div
            onClick={() => history.push("/admin/dashboard")}
            className="bg-white cursor-pointer"
          >
            <img src={findostLogo} alt="logo"></img>
          </div>

          <div>
            <Dropdown className="custom-dropdown mt-1 d-flex align-items-center gap-3">
              <div className="mr-3">
                {/* <img src={bell} width={45} alt="" /> */}
              </div>
              <Dropdown.Toggle id="dropdown-basic">
                <img src={userImg} width={45} alt="" />
                {/* <span onClick={() => setisdropToggle(!isdropToggle)}>
                {isdropToggle ? "down" : "up"}
              </span> */}
              </Dropdown.Toggle>
              <Dropdown.Menu id="drop">
                <Dropdown.Item>
                  <p className="m-0">
                    {staffName.charAt(0).toUpperCase() + staffName.slice(1)}
                  </p>
                  <small className="m-0">{staffEmail}</small>
                </Dropdown.Item>
                <hr className="m-0" />
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
                  <i>
                    <AiOutlineLogout
                      size={22}
                      color="#DD2025"
                      className="mb-1"
                    />
                  </i>
                  &nbsp;&nbsp; Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {location?.pathname === "/admin/dashboard" && (
            <div className="header_overlay">
              <h6>Hi, {staffName}</h6>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Header;
