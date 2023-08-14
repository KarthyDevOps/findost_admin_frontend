import React, { useState, useEffect, Fragment } from "react";
import { useForm } from "react-hook-form";
import { BsArrowLeft } from "react-icons/bs";
// styles
import "./style.scss";
//internal components
import CustomController from "component/common/Controller";
import FormErrorMessage from "component/common/ErrorMessage";
import InputBox from "component/common/InputBox/InputBox";
import DropDown from "component/common/DropDown/DropDown";
import NormalButton from "component/common/NormalButton/NormalButton";
import CommonDatePicker from "component/common/CommonDatePicker/CommonDatePicker";
import SuccessModal from "component/common/DeleteModal/SuccessModal";
//service
import { getClient, updateClient } from "service/Auth";
import { Toast } from "service/toast";
//helper
import { history } from "helpers";

const EditClientsFamilyComp = ({ edit, view }) => {
  const {
    register,
    handleSubmit,
    errors,
    setValue,
    reset,
    control,
    getValues,
  } = useForm({
    mode: "onChange",
  });

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ClientDetails, setClientDetails] = useState({ relationShip: "" });
  const RelationshipOption =
    [
      { label: "Paternal Grand Father", value: "PATERNAL_GRAND_FATHER" },
      { label: "Paternal Grand Mother", value: "PATERNAL_GRAND_MOTHER" },
      { label: "Maternal Grand Father", value: "MATERNAL_GRAND_FATHER" },
      { label: "Maternal Grand Mother", value: "MATERNAL_GRAND_MOTHER" },
      { label: "Father", value: "FATHER" },
      { label: "Mother", value: "MOTHER" },
      { label: "Husband", value: "HUSBAND" },
      { label: "Wife", value: "WIFE" },
      { label: "Brother", value: "BROTHER" },
      { label: "Sister", value: "SISTER" },
      { label: "Son", value: "SON" },
      { label: "Daughter", value: "DAUGHTER" },
    ]

  const id = localStorage.getItem("clientId");

  useEffect(() => {
    setValue(
      "relationShip",
      RelationshipOption.find((option) => option.value === ClientDetails.relationShip)
    );
  }, [ClientDetails, setValue]);

  const getClientDetails = async () => {
    try {
      if (!view) return history.goBack();
      const params = { id };
      let response = await getClient(params);
      if (response.status === 200) {
        const data = response?.data?.data?.data;
        reset({
          clientName: data?.clientName,
          email: data?.familyMember?.email,
          relativeName: data?.familyMember?.relativeName,
          dateOfBirth: new Date(data?.familyMember?.dateOfBirth),
          mobileNumber: data?.familyMember?.mobileNumber,
        });
        setClientDetails({
          relationShip: data?.familyMember?.relationShip,
        });
      } else {
        Toast({ type: "error", message: response.data.message });
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  useEffect(() => {
    if (id) {
      getClientDetails();
    }
  }, []);



  const onSubmit = async (data) => {
    setModal(true);
    try {


      setLoading(true);
      let body = {
        familyMember: {

          relativeName: data?.relativeName,
          dateOfBirth: data?.dateOfBirth,
          clientName: data?.clientName,
          relationShip: ClientDetails.relationShip,
          email: data?.email,
          mobileNumber: data?.mobileNumber,

        }
      };
      let response = await updateClient(body, id);
      if (response.status === 200) {
        setModal(true);
        setTimeout(() => {
          setModal(false);
          reset(ClientDetails);
          history.push("/admin/clients-family");
        }, 2000);
        setLoading(false);
      } else {
        Toast({ type: "error", message: response.data.message });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="px-5 py-3">
      <div className="edit_client d-flex my-3 align-items-center ">
        <i className="pr-3">
          <BsArrowLeft
            size={28}
            onClick={() => history.goBack()}
            style={{ cursor: "pointer" }}
          />
        </i>
        <h6 className="m-0">{"Edit Client's Family"}</h6>
      </div>
      <form>
        <div className="client_box p-5">
          <div className="row ">
            <div className="col-md-4">
              <label>Client Name</label>
              <InputBox
                className="add_staff"
                type={"text"}
                placeholder="Enter Client Name"
                name="clientName"
                errors={errors}
                register={register({
                  required: true,
                  pattern: /^(?!\s*$).+/,
                })}
                disabled
              />
              <FormErrorMessage

                error={errors.clientName}
                messages={{
                  required: "Client Name is Required",
                  pattern: "Client Name Invalid",
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
                  pattern: "Invalid Email",
                }}
              />
            </div>
            <div className="col-md-4">
              <label>Date of Birth</label>
              <div className="date_of_birth">
                <CustomController
                  name={"dateOfBirth"}
                  control={control}
                  error={errors.dateOfBirth}
                  defaultValue={getValues("dateOfBirth" || "")}
                  rules={{ required: true }}
                  messages={{
                    required: "DOB is Required",
                  }}
                  render={({ onChange, ...field }) => {
                    return (
                      <CommonDatePicker
                        clientDatePicker
                        id="dateOfBirth"
                        name="dateOfBirth"
                        {...field}
                        onChange={(date) => {
                          onChange(date);
                        }}
                        placeholder="DOB"
                      />
                    );
                  }}
                />
              </div>
            </div>
            <div className="col-md-4 my-3">
              <label>Relative Name</label>
              <InputBox
                className="add_staff"
                type={"text"}
                placeholder="Enter Relative Name"
                name="relativeName"
                errors={errors}
                register={register({
                  required: true,
                  pattern: /^[^\s]+$/,
                })}
              />
              <FormErrorMessage
                error={errors.relativeName}
                messages={{
                  required: "Relative Name is Required",
                  pattern: "No space between name",
                }}
              />
            </div>
            <div className="col-md-4 my-3">
              <label>Relationship</label>
              <CustomController
                name={"relationShip"}
                control={control}
                error={errors.relationShip}
                value={RelationshipOption.find(
                  (option) => option.value === getValues("relationShip")
                )}
                rules={{ required: true }}
                messages={{ required: "Select RelationShip is Required" }}
                render={({ onChange, ...field }) => {
                  return (
                    <DropDown
                      {...field}
                      name="relationShip"
                      error={errors.relationShip}
                      placeholder="Select RelationShip"
                      options={RelationshipOption}
                      onChange={(option) => {
                        setClientDetails((prevState) => ({
                          ...prevState,
                          relationShip: option.value,
                        }));
                        onChange(option.value);
                      }}
                    />
                  );
                }}
              />
            </div>
            <div className="col-md-4 my-3">
              <label>MobileNumber</label>
              <InputBox
                className="add_staff"
                type={"number"}
                placeholder="Enter MobileNumber"
                name="mobileNumber"
                errors={errors}
                register={register({
                  required: true,
                  pattern: /^(?:\+1[-. ]?)?\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/
                  ,
                })}
              />
              <FormErrorMessage
                error={errors.mobileNumber}
                messages={{
                  required: "MobileNumber is Required",
                  pattern: "Invalid MobileNumber",
                }}
              />
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-end my-5">
            <div className="col-md-2">
              <NormalButton
                className="authButton1"
                label={"Cancel"}
                onClick={() => history.push("/admin/clients-family")}
              />
            </div>
            {edit && (
              <div className="col-md-2">
                <NormalButton
                  className="loginButton"
                  label={"Update"}
                  onClick={handleSubmit(onSubmit)}
                  isLoading={loading}
                />
              </div>
            )}
          </div>
        </div>
      </form>
      <div>
        <SuccessModal
          modalOpen={modal}
          onCancel={() => setModal(false)}
          successMsg={"Client Family Update Successfully"}
        />
      </div>
    </div>
  );
};

export default EditClientsFamilyComp;
