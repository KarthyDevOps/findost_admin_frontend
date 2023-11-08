import React, { useState, useEffect } from "react";
// styles
import "./AddStaff.scss";
// internal components
import InputBox from "component/common/InputBox/InputBox";
import FormErrorMessage from "component/common/ErrorMessage";
import NormalButton from "component/common/NormalButton/NormalButton";
import DropDown from "component/common/DropDown/DropDown";
import SuccessModal from "component/common/DeleteModal/SuccessModal";
import CustomController from "component/common/Controller";
// services
import { BsArrowLeft } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { Toast } from "service/toast";
import { addStaff, getStaff, updateStaff } from "service/Auth";
// helpers
import {
  history,
  getCompNameByPrivelegeName,
  statusOptions,
  managementOptions,
} from "helpers";

const AddStaff = ({ create, view, remove }) => {
  const {
    register,
    handleSubmit,
    errors,
    reset,
    control,
    setValue,
    getValues,
  } = useForm({
    mode: "onChange",
  });
  const [edit, setEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [staffDetails, setStaffDetails] = useState({
    role: "",
    status: "",
    permissions: {},
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const id = localStorage.getItem("editId");

  const getStaffDetails = async () => {
    try {
      const params = {
        id: id,
      };
      let response = await getStaff(params);
      if (response.status === 200) {
        const data = response?.data.data[0];
        setValue("name", data.name);
        setValue("email", data.email);
        setStaffDetails({
          role: data.role,
          status: data.isActive ? "active" : "inActive",
          permissions: data.permissions,
        });
      } else {
        Toast({ type: "error", message: response.data.message });
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };
  const roleOptions = [
    {
      label: "Admin",
      value: "ADMIN",
    },
    {
      label: "Staff",
      value: "STAFF",
    },
    {
      label: "Sub Admin",
      value: "SUB ADMIN",
    },
  ];

  const onSubmit = async (data) => {
    if (!edit) {
      try {
        setLoading(true);
        let body = {
          name: data.name,
          email: data.email,
          password: data.password,
          role: staffDetails.role,
          permissions: {
            staffManagement: data.staffManagement,
            productManagement: data.productManagement,
            feedbackManagement: data.feedbackManagement,
            notificationManagement: data.notificationManagement,
            contentManagement: data.contentManagement,
            templateManagement: data.templateManagement,
            faqManagement: data.faqManagement,
            knowledgeCenterManagement: data.knowledgeCenterManagement,
            siteSettingsManagement: data.siteSettingsManagement,
            clientFamilyManagement: data.clientFamilyManagement,
            feeManagement: data.feeManagement,
            scheduleManagement: data.scheduleManagement,
            leadManagement: data.leadManagement,
            apManagement: data.apManagement,
            ipoManagement : data.ipoManagement
          },
        };
        if (staffDetails.status === "active") {
          body.isActive = true;
        } else {
          body.isActive = false;
        }
        let response = await addStaff(body);
        if (response.status === 200) {
          setModal(true);
          setTimeout(() => {
            setModal(false);
            reset(staffDetails);
            history.push("/admin/staff-management");
          }, 2000);
          setLoading(false);
        } else {
          setLoading(false);

          Toast({ type: "error", message: response.data.message });
        }
      } catch (e) {
        console.log(e);
        setFormSubmitted(false);
      }
    } else {
      try {
        setLoading(true);

        let body = {
          name: data.name,
          email: data.email,
          password: data.password,
          role: staffDetails.role,
          permissions: {
            staffManagement: data.staffManagement,
            productManagement: data.productManagement,
            feedbackManagement: data.feedbackManagement,
            notificationManagement: data.notificationManagement,
            contentManagement: data.contentManagement,
            templateManagement: data.templateManagement,
            faqManagement: data.faqManagement,
            knowledgeCenterManagement: data.knowledgeCenterManagement,
            siteSettingsManagement: data.siteSettingsManagement,
            clientFamilyManagement: data.clientFamilyManagement,
            feeManagement: data.feeManagement,
            scheduleManagement: data.scheduleManagement,
            leadManagement: data.leadManagement,
            apManagement: data.apManagement,
            ipoManagement : data.ipoManagement
          },
        };
        if (staffDetails.status === "active") {
          body.isActive = true;
        } else {
          body.isActive = false;
        }
        let response = await updateStaff(body, id);
        if (response.status === 200) {
          setModal(true);
          setTimeout(() => {
            setModal(false);
            reset(staffDetails);
            history.push("/admin/staff-management");
          }, 2000);
          setLoading(false);
        } else {
          setLoading(false);

          Toast({ type: "error", message: response.data.message });
        }
      } catch (e) {
        console.log(e);
        setFormSubmitted(false);
      }
    }
  };
  const handleCheckAll = (event, managementOption) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setValue(managementOption, [
        "ALL",
        ...managementOptions[managementOption],
      ]);
    } else {
      setValue(managementOption, []);
    }
  };

  const handleCheckOption = (managementOption, option, event) => {
    const isChecked = event.target.checked;
    const currentValues = control.getValues(managementOption);
    const allSelected = currentValues.includes("ALL");

    if (isChecked) {
      let updatedValues = [...currentValues, option];
      if (
        (option === "EDIT" || option === "ADD" || option === "DELETE") &&
        !currentValues.includes("VIEW")
      ) {
        updatedValues = [...updatedValues, "VIEW"];
      }
      if (allSelected) {
        updatedValues = updatedValues.filter((value) => value !== "ALL");
      } else if (
        updatedValues.includes("VIEW") &&
        updatedValues.includes("EDIT") &&
        updatedValues.includes("ADD") &&
        updatedValues.includes("DELETE")
      ) {
        updatedValues = ["ALL", ...updatedValues];
      }
      setValue(managementOption, updatedValues);
    } else {
      let updatedValues = currentValues.filter((value) => value !== option);
      if (allSelected) {
        updatedValues = updatedValues.filter((value) => value !== "ALL");
      }
      setValue(managementOption, updatedValues);
    }
  };

  useEffect(() => {
    if (id) {
      setEdit(true);
      getStaffDetails();
    }
  }, []);

  useEffect(() => {
    setValue(
      "role",
      roleOptions.find((option) => option.value === staffDetails.role)
    );
    setValue(
      "status",
      statusOptions.find((option) => option.value === staffDetails.status)
    );
    if (staffDetails.permissions) {
      Object.entries(staffDetails.permissions).forEach(
        ([managementOption, values]) => {
          setValue(managementOption, values);
        }
      );
    }
  }, [staffDetails, setValue]);

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
                name="name"
                defaultValue={staffDetails.name}
                errors={errors}
                register={register({
                  required: true,
                  pattern: /^(?!\s*$).+/,
                })}
              />
              <FormErrorMessage
                error={errors.name}
                messages={{
                  required: "Name is Required",
                  pattern: "Please Enter a Valid Name",
                }}
              />
            </div>
            <div className="col-md-4">
              <label>Email Id</label>
              <InputBox
                className="add_staff"
                type={"text"}
                placeholder="Enter Email Id"
                name="email"
                defaultValue={staffDetails.email}
                errors={errors}
                register={register({
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
              />
              <FormErrorMessage
                error={errors.email}
                messages={{
                  required: "Email is Required",
                  pattern: "Invalid Email Id",
                }}
              />
            </div>
            <div className="col-md-4">
              <label>Password</label>
              <InputBox
                className="add_staff"
                type={"text"}
                placeholder="Enter Password"
                name="password"
                errors={formSubmitted ? errors : {}}
                // disabled={edit}
                defaultValue={staffDetails.password}
                register={register({
                  required: edit ? false : true,
                  minLength: {
                    value: 8,
                  },
                  maxLength: {
                    value: 16,
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])/,
                  },
                  validate: {
                    lowercase: (value) =>
                      edit ? null : /^(?=.*[a-z])/.test(value),
                    containsDigit: (value) =>
                      edit ? null : /^(?=.*[0-9])/.test(value),
                    containsSpecial: (value) =>
                      edit ? null : /^(?=.*[!@#$%^&*])/.test(value),
                  },
                })}
              />
              {formSubmitted && (
                <FormErrorMessage
                  error={errors.password}
                  messages={{
                    required: "Password is Required",
                    minLength: "Password must contain at least 8 letters",
                    maxLength: "Password should contain at most 16 characters",
                    pattern:
                      "Password must contain at least one uppercase letter",
                    lowercase:
                      "Password must contain at least one lowercase letter",
                    containsDigit: "Password must contain at least one Numeric",
                    containsSpecial:
                      "Password must contain at least one special character",
                  }}
                />
              )}
            </div>
            <div className="col-md-4 my-3">
              <label>Role</label>
              <CustomController
                name={"role"}
                control={control}
                error={errors.role}
                rules={{ required: true }}
                defaultValue={staffDetails.role}
                value={roleOptions.find(
                  (option) => option.value === getValues("role")
                )}
                messages={{ required: "Role is Required" }}
                render={({ onChange, ...field }) => {
                  return (
                    <DropDown
                      {...field}
                      placeholder="Select Role"
                      name="role"
                      options={roleOptions}
                      onChange={(option) => {
                        setStaffDetails((prevState) => ({
                          ...prevState,
                          role: option.value,
                        }));
                        onChange(option.value);
                      }}
                    />
                  );
                }}
              />
            </div>
            <div className="col-md-4 my-3">
              <label>Status</label>
              <CustomController
                name={"status"}
                control={control}
                error={errors.status}
                rules={{ required: true }}
                defaultValue={staffDetails.status}
                value={statusOptions.find(
                  (option) => option.value === getValues("status")
                )}
                messages={{ required: "Status is Required" }}
                render={({ onChange, ...field }) => {
                  return (
                    <DropDown
                      {...field}
                      placeholder="Select Status"
                      name="status"
                      errors={errors.status}
                      options={statusOptions}
                      onChange={(option) => {
                        setStaffDetails((prevState) => ({
                          ...prevState,
                          status: option.value,
                        }));
                        onChange(option.value);
                      }}
                    />
                  );
                }}
              />
            </div>
          </div>
          <p className="m-0 py-3">Staff Permissions</p>
          <div className="col-12 col-md-12 p-0 m-0">
            <table style={{ width: "100%" }}>
              <thead className="Row_Class">
                <tr className="">
                  <th style={{ width: "22%" }}></th>
                  <th>All Access</th>
                  <th>View Access</th>
                  <th>Edit Access</th>
                  <th>Add Access</th>
                  <th>Delete Access</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(managementOptions).map(
                  ([managementOption, options]) => (
                    <tr key={managementOption} className="">
                      <td className="row_box">
                        {getCompNameByPrivelegeName(managementOption)}
                      </td>
                      <td className="">
                        <input
                          type="checkbox"
                          onChange={(e) => handleCheckAll(e, managementOption)}
                          name={managementOption}
                          value="ALL"
                          ref={control.register}
                        />
                      </td>
                      {options.map((option) => (
                        <td className="">
                          <input
                            type="checkbox"
                            onChange={(e) =>
                              handleCheckOption(managementOption, option, e)
                            }
                            name={managementOption}
                            value={option}
                            ref={control.register}
                          />
                        </td>
                      ))}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          <div className="d-flex align-items-center justify-content-end my-4">
            <div className="col-md-2">
              <NormalButton
                className="authButton1"
                label={"Cancel"}
                onClick={() => history.push("/admin/staff-management")}
              />
            </div>
            <div onClick={() => setFormSubmitted(true)} className="col-md-2">
              <NormalButton
                className="loginButton"
                label={edit ? "Update" : "Add Staff"}
                onClick={handleSubmit(onSubmit)}
                type="submit"
                isLoading={loading}
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
                ? "Staff Details Updated Successfully"
                : "New Staff Added Successfully"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AddStaff;
