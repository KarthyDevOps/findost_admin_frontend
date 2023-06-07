import React, { useState, useEffect, Fragment } from "react";
import { BsArrowLeft } from "react-icons/bs";
import "./style.scss";
import InputBox from "component/common/InputBox/InputBox";
import { useForm } from "react-hook-form";
import FormErrorMessage from "component/common/ErrorMessage";
import NormalButton from "component/common/NormalButton/NormalButton";
import { history, getCompNameByPrivelegeName } from "helpers";
import DropDown from "component/common/DropDown/DropDown";
import SuccessModal from "component/common/DeleteModal/SuccessModal";
import CustomController from "component/common/Controller";
import { addStaff, getStaff, updateStaff } from "service/Auth";
import { Toast } from "service/toast";

const AddStaff = ({ create, view, remove }) => {
  const {
    register,
    handleSubmit,
    errors,
    reset,
    setError,
    control,
    setValue,
    getValues,
  } = useForm({
    mode: "onChange",
  });
  const [edit, setEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const [staffDetails, setStaffDetails] = useState({
    role: "",
    status: "",
    permissions: {},
  });

  const [managementOptions, setManagementOptions] = useState({
    contentManagement: ["VIEW", "EDIT", "ADD", "DELETE"],
    faqManagement: ["VIEW", "EDIT", "ADD", "DELETE"],
    feedbackManagement: ["VIEW", "EDIT", "ADD", "DELETE"],
    knowledgeCenterManagement: ["VIEW", "EDIT", "ADD", "DELETE"],
    mastersManagement: ["VIEW", "EDIT", "ADD", "DELETE"],
    notificationManagement: ["VIEW", "EDIT", "ADD", "DELETE"],
    productManagement: ["VIEW", "EDIT", "ADD", "DELETE"],
    siteSettings: ["VIEW", "EDIT", "ADD", "DELETE"],
    staffManagement: ["VIEW", "EDIT", "ADD", "DELETE"],
    templateManagement: ["VIEW", "EDIT", "ADD", "DELETE"],
  });

  const options = [
    {
      label: "ADMIN",
      value: "Admin",
    },
    {
      label: "SUPER ADMIN",
      value: "Super Admin",
    },
    {
      label: "STAFF",
      value: "Staff",
    },
  ];

  const status = [
    {
      label: "ACTIVE",
      value: "active",
    },
    {
      label: "InACTIVE",
      value: "inActive",
    },
  ];

  const id = localStorage.getItem("editId");

  useEffect(() => {
    if (id) {
      setEdit(true);
      getStaffDetails();
    }
  }, []);

  useEffect(() => {
    setValue(
      "role",
      options.find((option) => option.value === staffDetails.role)
    );
    setValue(
      "status",
      status.find((option) => option.value === staffDetails.status)
    );
    if (staffDetails.permissions) {
      Object.entries(staffDetails.permissions).forEach(
        ([managementOption, values]) => {
          setValue(managementOption, values);
        }
      );
    }
  }, [staffDetails, setValue]);
  console.log("staffDetails :>> ", staffDetails);

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

  const onSubmit = async (data) => {
    console.log("dataform :>> ", data);
    if (!edit) {
      try {
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
            siteSettings: data.siteSettings,
            mastersManagement: data.mastersManagement
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
          const timeout = setTimeout(() => {
            setModal(false);
            reset(staffDetails);
            history.push("/admin/staff-management");
          }, 1000);
          return () => clearTimeout(timeout);
        } else {
          Toast({ type: "error", message: response.data.message });
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
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
            siteSettings: data.siteSettings,
            mastersManagement: data.mastersManagement
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
          const timeout = setTimeout(() => {
            setModal(false);
            reset(staffDetails);
            history.push("/admin/staff-management");
          }, 1000);
          return () => clearTimeout(timeout);
        } else {
          Toast({ type: "error", message: response.data.message });
        }
      } catch (e) {
        console.log(e);
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

    if (isChecked) {
      if (!currentValues.includes(option)) {
        setValue(managementOption, [...currentValues, option]);
      }
    } else {
      setValue(
        managementOption,
        currentValues.filter((value) => value !== option)
      );
    }
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
                name="name"
                defaultValue={staffDetails.name}
                errors={errors}
                register={register({
                  required: true,
                })}
              />
              <FormErrorMessage
                error={errors.name}
                messages={{
                  required: "Name is Required",
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
                  pattern: /\S+@\S+\.\S+/,
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
                errors={errors}
                disabled={edit}
                defaultValue={staffDetails.password}
                register={register({
                  required: edit ? false : true,
                  minLength: 8,
                  maxLength: 16,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?& ]{8,}$/s,
                })}
              />
              <FormErrorMessage
                error={errors.password}
                messages={{
                  required: "Password is Required",
                  minLength: "Password must contain atleast 8 letters",
                  maxLength: "Password should must contain only 16",
                  pattern: "Password must contain a special character",
                }}
              />
            </div>
            <div className="col-md-4 my-3">
              <label>Role</label>
              <CustomController
                name={"role"}
                control={control}
                error={errors.role}
                rules={{ required: true }}
                defaultValue={staffDetails.role}
                value={options.find(
                  (option) => option.value === getValues("role")
                )}
                messages={{ required: "Role is Required" }}
                render={({ onChange, ...field }) => {
                  return (
                    <DropDown
                      {...field}
                      placeholder="Select Role"
                      name="role"
                      options={options}
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
                value={status.find(
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
                      options={status}
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
                  <th></th>
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
          <div className="d-flex align-items-center justify-content-end my-3">
            <div className="col-md-2">
              <NormalButton
                className="authButton1"
                label={"Cancel"}
                onClick={() => history.push("/admin/staff-management")}
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
