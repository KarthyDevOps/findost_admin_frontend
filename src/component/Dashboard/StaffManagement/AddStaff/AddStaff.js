import React, { useState, useEffect, Fragment } from "react";
import { BsArrowLeft } from "react-icons/bs";
import "./style.scss";
import InputBox from "component/common/InputBox/InputBox";
import { useForm } from "react-hook-form";
import FormErrorMessage from "component/common/ErrorMessage";
import ReactSelect from "react-select";
import NormalButton from "component/common/NormalButton/NormalButton";
import { history } from "helpers";
import DropDown from "component/common/DropDown/DropDown";

const AddStaff = () => {
  const { register, handleSubmit, errors, reset, setError } = useForm({
    mode: "onChange",
  });
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [edit, setEdit] = useState(false);

  const options = [
    {
      label: "ONE",
      value: "one",
    },
    {
      label: "TWO",
      value: "two",
    },
    {
      label: "THREE",
      value: "three",
    },
    
  ];

  const onSubmit = (inputs) => {
    console.log("inputs :>> ", inputs);
  };
  return (
    <div className="AddStaff px-5">
      <div className="add-staff d-flex my-3 align-items-center ">
        <i className="pr-3">
          <BsArrowLeft
            size={28}
            onClick={() => history.goBack()}
            style={{ cursor: "pointer" }}
          />
        </i>
        <p className="m-0">{edit ? "Edit Staff" : "Add Staff"}</p>
      </div>
      <div className="Add-Form p-5">
        <p>Staff Details</p>
        <form>
          <div className="row">
            <div className="col-md-4">
              <label>Name</label>
              <InputBox
                className="add_staff"
                type={"text"}
                placeholder="Enter Name"
                //   errors={errors}
                name="name"
                errors={errors}
                register={register({
                  required: true,
                })}

                //   value={searchStaff}
                // onChange={(e) => {
                //   setsearch(e.target.value);
                //   setactivePage(1);
                // }}
              />
            </div>
            <div className="col-md-4">
              <label>Email Id</label>
              <InputBox
                className="add_staff"
                type={"text"}
                placeholder="Enter Email Id"
                //   errors={errors}
                name="email"
                errors={errors}
                register={register({
                  required: true,
                  pattern: /\S+@\S+\.\S+/,
                })}

                //   value={searchStaff}
                // onChange={(e) => {
                //   setsearch(e.target.value);
                //   setactivePage(1);
                // }}
              />
            </div>
            <div className="col-md-4">
              <label>Password</label>
              <InputBox
                className="add_staff"
                type={"text"}
                placeholder="Enter Password"
                //   errors={errors}
                name="password"
                errors={errors}
                register={register({
                  required: true,
                })}

                //   value={searchStaff}
                // onChange={(e) => {
                //   setsearch(e.target.value);
                //   setactivePage(1);
                // }}
              />
            </div>
            <div className="col-md-4 my-3">
              <label>Role</label>
              <DropDown
                // value={value}
                placeholder="Select Role"
                register={register({
                  required: true,
                })}
                name="role"
                errors={errors}
                // onChange={(e) => {}}
                options={options}
              />
            </div>
            <div className="col-md-4 my-3">
              <label>Status</label>
              <DropDown
                // value={value}
                placeholder="Select Status"
                register={register({
                  required: true,
                })}
                name="status"
                errors={errors}
                // onChange={(e) => {}}
                options={options}
              />
            </div>
          </div>

          <p className="m-0 py-3">Staff Permissions</p>
          <div className="col-12 col-md-12 p-0 m-0">
            <table style={{ width: "100%" }}>
              <thead className="Row_Class">
                <tr className="">
                  <th></th>
                  <th>All Access</th>
                  <th>View Access</th>
                  <th>Edit Access</th>
                  <th>Add Access</th>
                  <th>Delete Access</th>
                </tr>
              </thead>
              <tbody>
                <tr className="">
                  <td className="row_box">Staff Management</td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                </tr>
                <tr className="">
                  <td className="row_box">Product Management</td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                </tr>
                <tr className="">
                  <td className="row_box">Feedback Management</td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                </tr>
                <tr className="">
                  <td className="row_box">Notification Management</td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                </tr>
                <tr className="">
                  <td className="row_box">Content Management</td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                </tr>
                <tr className="">
                  <td className="row_box">Template Management</td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                </tr>
                <tr className="">
                  <td className="row_box">FAQ / Support Management</td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                </tr>
                <tr className="">
                  <td className="row_box">Masters Management</td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                </tr>
                <tr className="">
                  <td className="row_box">Site Settings</td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="checkBox_place">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="d-flex align-items-center justify-content-end my-3">
            <div className="col-md-2">
              <NormalButton
                className="authButton1"
                label={"Cancel"}
                //   onClick={DeletBulk}
              />
            </div>
            <div className="col-md-2">
              <NormalButton
                className="loginButton"
                label={edit ? "Update" : "Add Staff"}
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaff;
