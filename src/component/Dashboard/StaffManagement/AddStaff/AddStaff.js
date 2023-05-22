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
import SuccessModal from "component/common/DeleteModal/SuccessModal";

const AddStaff = () => {
  const { register, handleSubmit, errors, reset, setError } = useForm({
    mode: "onChange",
  });
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [edit, setEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const [managementCheckedItems, setManagementCheckedItems] = useState({
    staff: {
      staffView: false,
      staffEdit: false,
      staffAdd: false,
      staffDelete: false,
    },
    product: {
      productView: false,
      productEdit: false,
      productAdd: false,
      productDelete: false,
    },
  });

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

  const onSubmit = (data) => {
    console.log("data :>> ", managementCheckedItems);
    setModal(true);

    const timeout = setTimeout(() => {
      setModal(false);
    }, 1000);

    return () => clearTimeout(timeout);
  };

  const handleManagementAllChange = (section) => (event) => {
    const isChecked = event.target.checked;
    setManagementCheckedItems((prevState) => ({
      ...prevState,
      [section]: Object.keys(prevState[section]).reduce((acc, key) => {
        acc[key] = isChecked;
        return acc;
      }, {}),
    }));
  };

  const handleManagementChange = (section, key) => (event) => {
    const isChecked = event.target.checked;
    setManagementCheckedItems((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [key]: isChecked,
      },
    }));
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
                  required: false,
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
                  required: false,
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
                  required: false,
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
                placeholder="Select Role"
                register={register({
                  required: false,
                })}
                name="role"
                errors={errors}
                options={options}
                onChange={(e) => setRole(e)}
              />
            </div>
            <div className="col-md-4 my-3">
              <label>Status</label>
              <DropDown
                register={register({ required: false })}
                name="status"
                errors={errors}
                options={options}
                placeholder="Select Status"
                onChange={(e) => setStatus(e)}
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
                  <td className="">
                    <input
                      type="checkbox"
                      id="staff_all"
                      name="staffManagement.staffAll"
                      checked={Object.values(
                        managementCheckedItems.staff
                      ).every(Boolean)}
                      onChange={handleManagementAllChange("staff")}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="staff_view"
                      name="staffManagement.staffView"
                      checked={managementCheckedItems.staff.staffView}
                      onChange={handleManagementChange("staff", "staffView")}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="staff_edit"
                      name="staffManagement.staffEdit"
                      checked={managementCheckedItems.staff.staffEdit}
                      onChange={handleManagementChange("staff", "staffEdit")}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="staff_add"
                      name="staffManagement.staffAdd"
                      checked={managementCheckedItems.staff.staffAdd}
                      onChange={handleManagementChange("staff", "staffAdd")}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="staff_delete"
                      name="staffManagement.staffDelete"
                      checked={managementCheckedItems.staff.staffDelete}
                      onChange={handleManagementChange("staff", "staffDelete")}
                    />
                  </td>
                </tr>

                <tr className="">
                  <td className="row_box">Product Management</td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="product_all"
                      name="productManagement.productAll"
                      checked={Object.values(
                        managementCheckedItems.product
                      ).every(Boolean)}
                      onChange={handleManagementAllChange("product")}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="product_view"
                      name="productManagement.productView"
                      checked={managementCheckedItems.product.productView}
                      onChange={handleManagementChange(
                        "product",
                        "productView"
                      )}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="product_edit"
                      name="productManagement.productEdit"
                      checked={managementCheckedItems.product.productEdit}
                      onChange={handleManagementChange(
                        "product",
                        "productEdit"
                      )}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="product_add"
                      name="productManagement.productAdd"
                      checked={managementCheckedItems.product.productAdd}
                      onChange={handleManagementChange("product", "productAdd")}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="product_delete"
                      name="productManagement.productDelete"
                      checked={managementCheckedItems.product.productDelete}
                      onChange={handleManagementChange(
                        "product",
                        "productDelete"
                      )}
                    />
                  </td>
                </tr>

                {/* <tr className="">
                  <td className="row_box">Feedback Management</td>
                  <td className="">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="">
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
                  <td className="">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="">
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
                  <td className="">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="">
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
                  <td className="">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="">
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
                  <td className="">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="">
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
                  <td className="">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="">
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
                  <td className="">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      className="mt-2"
                      //   onClick={(e) => handleSelectAll(e)}
                      //   checked={

                      //   }
                    />
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
          <div className="d-flex align-items-center justify-content-end my-3">
            <div className="col-md-2">
              <NormalButton
                className="authButton1"
                label={"Cancel"}
                onClick={() => history.goBack()}
              />
            </div>
            <div className="col-md-2">
              <NormalButton
                className="loginButton"
                label={edit ? "Update" : "Add Staff"}
                onClick={handleSubmit(onSubmit)}
                type="submit"
              />
            </div>
          </div>
        </form>
        <div>
          <SuccessModal
            modalOpen={modal}
            onCancel={() => setModal(false)}
            successMsg={
              edit
                ? "New Staff Updated Successfully"
                : "Staff Details Added Successfully"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AddStaff;
