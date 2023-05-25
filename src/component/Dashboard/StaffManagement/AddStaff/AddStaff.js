import React, { useState, useEffect, Fragment } from "react";
import { BsArrowLeft } from "react-icons/bs";
import "./style.scss";
import InputBox from "component/common/InputBox/InputBox";
import { useForm } from "react-hook-form";
import FormErrorMessage from "component/common/ErrorMessage";
import ReactSelect from "react-select";
import NormalButton from "component/common/NormalButton/NormalButton";
import { history, generateInitialCheckedItems } from "helpers";
import DropDown from "component/common/DropDown/DropDown";
import SuccessModal from "component/common/DeleteModal/SuccessModal";
import CustomController from "component/common/Controller";

const AddStaff = () => {
  const { register, handleSubmit, errors, reset, setError, control } = useForm({
    mode: "onChange",
  });
  const [edit, setEdit] = useState(false);
  const [modal, setModal] = useState(false);

  const [managementCheckedItems, setManagementCheckedItems] = useState(
    generateInitialCheckedItems()
  );

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
    console.log("managementCheckedItems :>> ", managementCheckedItems);
    console.log("data :>> ", data);

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
                  required: true,
                })}

                //   value={searchStaff}
                // onChange={(e) => {
                //   setsearch(e.target.value);
                //   setactivePage(1);
                // }}
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
              <FormErrorMessage
                error={errors.email}
                messages={{
                  required: "Email is Required",
                  pattern : "Invalid Email Id"
                }}
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
              <FormErrorMessage
                error={errors.password}
                messages={{
                  required: "Password is Required",
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
                messages={{ required: "Role is Required" }}
                render={({ onChange, ...field }) => {
                  return (
                    <DropDown
                      {...field}
                      placeholder="Select Role"
                      name="role"
                      value={options.value}
                      options={options}
                      onChange={(option) => onChange(option.value)}
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
                messages={{ required: "Status is Required" }}
                render={({ onChange, ...field }) => {
                  return (
                    <DropDown
                      {...field}
                      placeholder="Select Status"
                      name="status"
                      value={options.value}
                      errors={errors.status}
                      options={options}
                      onChange={(option) => onChange(option.value)}
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

                <tr className="">
                  <td className="row_box">Feedback Management</td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="feedback_all"
                      name="feedbackManagement.feedbackAll"
                      checked={Object.values(
                        managementCheckedItems.feedback
                      ).every(Boolean)}
                      onChange={handleManagementAllChange("feedback")}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="feedback_view"
                      name="feedbackManagement.feedbackView"
                      checked={managementCheckedItems.feedback.feedbackView}
                      onChange={handleManagementChange(
                        "feedback",
                        "feedbackView"
                      )}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="feedback_edit"
                      name="feedbackManagement.feedbackEdit"
                      checked={managementCheckedItems.feedback.feedbackEdit}
                      onChange={handleManagementChange(
                        "feedback",
                        "feedbackEdit"
                      )}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="feedback_add"
                      name="feedbackManagement.feedbackAdd"
                      checked={managementCheckedItems.feedback.feedbackAdd}
                      onChange={handleManagementChange(
                        "feedback",
                        "feedbackAdd"
                      )}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="feedback_delete"
                      name="feedbackManagement.feedbackDelete"
                      checked={managementCheckedItems.feedback.feedbackDelete}
                      onChange={handleManagementChange(
                        "feedback",
                        "feedbackDelete"
                      )}
                    />
                  </td>
                </tr>
                <tr className="">
                  <td className="row_box">Notification Management</td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="notification_all"
                      name="notificationManagement.notificationAll"
                      checked={Object.values(
                        managementCheckedItems.notification
                      ).every(Boolean)}
                      onChange={handleManagementAllChange("notification")}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="notification_view"
                      name="notificationManagement.notificationView"
                      checked={
                        managementCheckedItems.notification.notificationView
                      }
                      onChange={handleManagementChange(
                        "notification",
                        "notificationView"
                      )}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="notification_edit"
                      name="notificationManagement.notificationEdit"
                      checked={
                        managementCheckedItems.notification.notificationEdit
                      }
                      onChange={handleManagementChange(
                        "notification",
                        "notificationEdit"
                      )}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="notification_add"
                      name="notificationManagement.notificationAdd"
                      checked={
                        managementCheckedItems.notification.notificationAdd
                      }
                      onChange={handleManagementChange(
                        "notification",
                        "notificationAdd"
                      )}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="notification_delete"
                      name="notificationManagement.notificationDelete"
                      checked={
                        managementCheckedItems.notification.notificationDelete
                      }
                      onChange={handleManagementChange(
                        "notification",
                        "notificationDelete"
                      )}
                    />
                  </td>
                </tr>
                <tr className="">
                  <td className="row_box">Content Management</td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="content_all"
                      name="contentManagement.contentAll"
                      checked={Object.values(
                        managementCheckedItems.content
                      ).every(Boolean)}
                      onChange={handleManagementAllChange("content")}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="content_view"
                      name="contentManagement.contentView"
                      checked={managementCheckedItems.content.contentView}
                      onChange={handleManagementChange(
                        "content",
                        "contentView"
                      )}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="content_edit"
                      name="contentManagement.contentEdit"
                      checked={managementCheckedItems.content.contentEdit}
                      onChange={handleManagementChange(
                        "content",
                        "contentEdit"
                      )}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="content_add"
                      name="contentManagement.contentAdd"
                      checked={managementCheckedItems.content.contentAdd}
                      onChange={handleManagementChange("content", "contentAdd")}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="content_delete"
                      name="contentManagement.contentDelete"
                      checked={managementCheckedItems.content.contentDelete}
                      onChange={handleManagementChange(
                        "content",
                        "contentDelete"
                      )}
                    />
                  </td>
                </tr>
                <tr className="">
                  <td className="row_box">Template Management</td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="template_all"
                      name="templateManagement.templateAll"
                      checked={Object.values(
                        managementCheckedItems.template
                      ).every(Boolean)}
                      onChange={handleManagementAllChange("template")}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="template_view"
                      name="templateManagement.templateView"
                      checked={managementCheckedItems.template.templateView}
                      onChange={handleManagementChange(
                        "template",
                        "templateView"
                      )}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="template_edit"
                      name="templateManagement.templateEdit"
                      checked={managementCheckedItems.template.templateEdit}
                      onChange={handleManagementChange(
                        "template",
                        "templateEdit"
                      )}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="template_add"
                      name="templateManagement.templateAdd"
                      checked={managementCheckedItems.template.templateAdd}
                      onChange={handleManagementChange(
                        "template",
                        "templateAdd"
                      )}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="template_delete"
                      name="templateManagement.templateDelete"
                      checked={managementCheckedItems.template.templateDelete}
                      onChange={handleManagementChange(
                        "template",
                        "templateDelete"
                      )}
                    />
                  </td>
                </tr>
                <tr className="">
                  <td className="row_box">FAQ / Support Management</td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="faq_all"
                      name="faqManagement.faqAll"
                      checked={Object.values(managementCheckedItems.faq).every(
                        Boolean
                      )}
                      onChange={handleManagementAllChange("faq")}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="faq_view"
                      name="faqManagement.faqView"
                      checked={managementCheckedItems.faq.faqView}
                      onChange={handleManagementChange("faq", "faqView")}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="faq_edit"
                      name="faqManagement.faqEdit"
                      checked={managementCheckedItems.faq.faqEdit}
                      onChange={handleManagementChange("faq", "faqEdit")}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="faq_add"
                      name="faqManagement.faqAdd"
                      checked={managementCheckedItems.faq.faqAdd}
                      onChange={handleManagementChange("faq", "faqAdd")}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="faq_delete"
                      name="faqManagement.faqDelete"
                      checked={managementCheckedItems.faq.faqDelete}
                      onChange={handleManagementChange("faq", "faqDelete")}
                    />
                  </td>
                </tr>
                <tr className="">
                  <td className="row_box">Masters Management</td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="master_all"
                      name="masterManagement.masterAll"
                      checked={Object.values(
                        managementCheckedItems.master
                      ).every(Boolean)}
                      onChange={handleManagementAllChange("master")}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="master_view"
                      name="masterManagement.masterView"
                      checked={managementCheckedItems.master.masterView}
                      onChange={handleManagementChange("master", "masterView")}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="master_edit"
                      name="masterManagement.masterEdit"
                      checked={managementCheckedItems.master.masterEdit}
                      onChange={handleManagementChange("master", "masterEdit")}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="master_add"
                      name="masterManagement.masterAdd"
                      checked={managementCheckedItems.master.masterAdd}
                      onChange={handleManagementChange("master", "masterAdd")}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="master_delete"
                      name="masterManagement.masterDelete"
                      checked={managementCheckedItems.master.masterDelete}
                      onChange={handleManagementChange(
                        "master",
                        "masterDelete"
                      )}
                    />
                  </td>
                </tr>
                <tr className="">
                  <td className="row_box">Site Settings</td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="site_all"
                      name="siteManagement.siteAll"
                      checked={Object.values(managementCheckedItems.site).every(
                        Boolean
                      )}
                      onChange={handleManagementAllChange("site")}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="site_view"
                      name="siteManagement.siteView"
                      checked={managementCheckedItems.site.siteView}
                      onChange={handleManagementChange("site", "siteView")}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="site_edit"
                      name="siteManagement.siteEdit"
                      checked={managementCheckedItems.site.siteEdit}
                      onChange={handleManagementChange("site", "siteEdit")}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="site_add"
                      name="siteManagement.siteAdd"
                      checked={managementCheckedItems.site.siteAdd}
                      onChange={handleManagementChange("site", "siteAdd")}
                    />
                  </td>
                  <td className="">
                    <input
                      type="checkbox"
                      id="site_delete"
                      name="siteManagement.siteDelete"
                      checked={managementCheckedItems.site.siteDelete}
                      onChange={handleManagementChange("site", "siteDelete")}
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
