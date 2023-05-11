import React, { useEffect, useState } from "react";
import "./styles.scss";
import { BsArrowLeft } from "react-icons/bs";
import { history } from "helpers";
import InputBox from "component/common/InputBox/InputBox";
import FormErrorMessage from "component/common/ErrorMessage";
import { Controller, useForm } from "react-hook-form";
import CustomController from "component/common/Controller";
import NormalMultiSelect from "component/common/NormalMultiSelect";
import DatePicker from "react-date-picker";
import NormalButton from "component/common/NormalButton/NormalButton";
import {
  editRegisterUser,
  GetStateAndPincodeByApi,
} from "service/PatientManagement";
import moment from "moment";
import { Toast } from "service/toast";
import { useParams } from "react-router-dom";
import Select from "component/common/NormalMultiSelect/Select";
import {
  spaceValidation,
  onlyNumbers,
  maxLengthValidation,
  minLengthValidation,
} from "helpers/validation";

import CreatableSelect from "react-select/creatable";
import { Input } from "antd";

const GenderOption = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Others", value: "Others" },
];

const bloodGroupData = [
  { label: "A+", value: "A+" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B-", value: "B-" },
  { label: "O+", value: "O+" },
  { label: "O-", value: "O-" },
  { label: "AB+", value: "AB+" },
  { label: "AB-", value: "AB-" },
  { label: "RH+", value: "RH+" },
];
const patientTypeOption = [
  { label: "Corporate", value: "CORPORATE" },
  { label: "Retail", value: "RETAIL" },
];
const UserRegisterComponent = ({ privileges }) => {
  const {
    register,
    handleSubmit,
    errors,
    control,
    reset,
    getValues,
    setValue,
    clearErrors
  } = useForm({
    mode: "onChange",
  });

  const { id } = useParams();
  const [gender, setGender] = useState("");
  const [bloodGroup, setbloodGroup] = useState("");
  const [maritalStatus, setmaritalStatus] = useState("");
  const [age, setAge] = useState("");
  const [DOB, setDOB] = useState("");
  const [corporateName, setcorporateName] = useState("");
  const [patientType, setPatientType] = useState("");
  const [corporateNameOption, setcorporateNameOption] = useState([]);
  const [occupation, setOccupation] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [referralCodeOption, setReferralCodeOption] = useState([]);
  const [load, setLoad] = useState(false);
  const calculate_age = (dob) => {
    if (!dob) return;
    setDOB(dob);
    setAge("");
    const birthDate = new Date(dob);
    const difference = Date.now() - birthDate.getTime();
    const age = new Date(difference);
    setAge(Math.abs(age.getUTCFullYear() - 1970));
    setValue("age", Math.abs(age.getUTCFullYear() - 1970));
    clearErrors('age');
  };

  useEffect(() => {
    reset({
      country: "India",
    });

  }, []);
  useEffect(() => {
    // setValue("patientType", "RETAIL");
    // setPatientType("RETAIL");
    if (privileges?.roleName == "HealthBuddy") {
      let data = {
        label: "FKHB_CUSTOMER",
        value: "FKHB_CUSTOMER",
      };
      setReferralCodeOption([data]);
      reset({
        referralCode: data.value,
        patientType: "RETAIL",
      });
      setPatientType("RETAIL");
      setReferralCode({
        label: data.value,
        value: data.value,
      });
    }
    setLoad(false);
  }, [load]);

  const onSubmit = async (inputs) => {
    if (
      String(inputs.patientType).toUpperCase() === "CORPORATE" &&
      !corporateName
    ) {
      Toast({ type: "error", message: "Please select corporate" });
    } else if (
      String(inputs.patientType).toUpperCase() === "CORPORATE" &&
      !referralCode
    ) {
      Toast({ type: "error", message: "Please select refferal code" });
    } else if (
      String(inputs.patientType).toUpperCase() === "RETAIL" &&
      !referralCode
    ) {
      Toast({ type: "error", message: "Please select refferal code" });
    } else {
      try {
        let body = {
          firstName: inputs.firstName,
          gender: inputs.gender,
          bloodGroup: inputs.bloodGroup,
          age: age,
          mobileNumber: inputs.mobileNumber,
          emailId: inputs.emailId,
          maritalStatus:
            inputs?.maritalStatus && inputs?.maritalStatus !== null
              ? inputs?.maritalStatus
              : "",
          corporateName: corporateName ? corporateName.value : "",
          patientType: inputs.patientType,
          referralCode: referralCode ? referralCode.value : "",
          occupation: inputs.occupation,
          addressDetails: inputs.addressDetail,
          addressLine2: inputs.addressLine2,
          state: inputs.state,
          city: inputs.city,
          pincode: inputs.pincode,
          district: inputs.district,
          country: inputs.country,
        };

        if (privileges?.roleName !== "HealthBuddy")
          body.dob = moment(inputs.dob).format("yyyy-MM-DD");
        if (id) {
          body._id = id;
          let response = await editRegisterUser(body);
          if (response.status == 200) {
            Toast({ type: "success", message: "Successfully updated" });
            history.goBack();
            resetAction();
          }
        }
      } catch (err) {}
    }
  };
  const resetAction = () => {
    reset({
      firstName: "",
      gender: "",
      bloodGroup: "",
      age: "",
      dob: "",
      mobileNumber: "",
      addressDetail: "",
      emailId: "",
      maritalStatus: "",
      corporateName: [],
      patientType: "",
      referralCode: "",
    });

    setGender("");
    setbloodGroup("");
    setDOB("");
    setmaritalStatus("");
    setcorporateName("");
    setPatientType("");
    setReferralCode("");
  };

  const handlePincode = async (e) => {
    try {
      let pin = e?.target?.value;
      if (pin?.length == 6) {
        let {
          data: { data },
          status = {},
        } = await GetStateAndPincodeByApi({
          pincode: pin,
        });
        if (status == 200) {
          reset(data);
          reset({
            state: data?.state,
            district: data?.district,
          });
        }
      }
    } catch (err) {}
  };

  const handleCorporateCreate = (inputValue) => {
    setReferralCodeOption([]);
    setReferralCode("");
    const newValue = { value: inputValue.toLowerCase(), label: inputValue };
    setcorporateNameOption([...corporateNameOption, newValue]);
    setcorporateName(newValue);
    reset({
      corporateName: newValue,
    });

    let data = [
      {
        value: inputValue.toLowerCase(),
        label: inputValue,
      },
    ];
    setReferralCodeOption(data);
  };

  const handleReferralCreate = (inputValue) => {
    const newValue = { value: inputValue, label: inputValue };
    setReferralCodeOption([...referralCodeOption, newValue]);
    setReferralCode(newValue);
  };
  const handleAgeChange = (age) => {
    if (age) {
      let today = new Date();
      let finalyear = today.getFullYear() - Number(age);
      let finalDate = moment(`01/01/${finalyear}`, "MM/DD/YYYY");
      setDOB(finalDate ? new Date(finalDate) : "");
      reset({ dob: finalDate ? new Date(finalDate) : "" });
    } else {
      setDOB("");
    }
  };

  return (
    <div>
      <div className="container">
        <div className="d-flex">
          <div className="col-2">
            <span
              className="backSpan cursor-pointer mb-4"
              onClick={() => history.goBack()}
            >
              <BsArrowLeft className="mr-3" /> Back
            </span>
          </div>
        </div>
        <div className="UserRegisterCard">
          <h3> {id ? "Edit" : ""} User Register</h3>
          <hr />
          <div className="row mt-2">
            <div className="col-10">
              <div className="row">
                <div className="col-4 mt-4">
                  <label>Name*</label>
                  <div>
                    <InputBox
                      type={"text"}
                      name={"firstName"}
                      register={register({
                        required: true,
                        pattern: /^[a-zA-Z ]*$/,
                        // minLength: 25,
                        maxLength: 25,
                      })}
                    />
                    <FormErrorMessage
                      error={errors.firstName}
                      messages={{
                        required: "Name is required",
                        pattern: "Name should contain only Alphabet's",
                        maxLength: "Name should contain between 25 letters",
                        spaceValidation: "Input is Blank",
                      }}
                    />
                  </div>
                </div>
                <div className="col-4 mt-4">
                  <label>Gender*</label>
                  <CustomController
                    name={"gender"}
                    control={control}
                    error={errors?.gender}
                    rules={{ required: true }}
                    defaultValue={gender}
                    messages={{ required: "*Gender is Required" }}
                    render={({ onChange, ...field }) => {
                      return (
                        <NormalMultiSelect
                          {...field}
                          placeholder={"Select"}
                          name="gender"
                          value={gender}
                          options={GenderOption}
                          handleChange={(e) => {
                            setGender(e.target.value);
                            onChange(e.target.value);
                          }}
                        />
                      );
                    }}
                  />
                </div>
                {privileges?.roleName !== "HealthBuddy" && (
                  <div className="col-4 mt-4">
                    <label>Blood Group</label>
                    <div>
                      <CustomController
                        name={"bloodGroup"}
                        control={control}
                        error={errors?.bloodGroup}
                        rules={{ required: false }}
                        defaultValue={bloodGroup}
                        messages={{ required: "*Required" }}
                        render={({ onChange, ...fields }) => {
                          return (
                            <NormalMultiSelect
                              {...fields}
                              placeholder={"Select"}
                              name="bloodGroup"
                              value={bloodGroup}
                              options={bloodGroupData}
                              handleChange={(e) => {
                                setbloodGroup(e.target.value);
                                onChange(e.target.value);
                              }}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="col-4 mt-4">
                  <label>Age*</label>
                  <div>
                  <InputBox
                      type={"number"}
                      className="inputBoxStyle"
                      name={"age"}
                      value={age}
                      register={register({
                        required: true,
                        pattern: /^[0-9]*$/,
                        // minLength: 25,
                        min: 1,
                        maxLength: 3,
                      })}
                      onChange={(e) => {
                        setAge(e?.target.value);
                        handleAgeChange(e?.target?.value);
                      }}
                      maxLength={`3`}
                    />
                    {/* <Input
                      type={"number"}
                      name={"age"}
                      
                      register={register({
                        required: false,
                        minLength: 10,
                        maxLength: 10,
                        pattern: /^[0-9\b]+$/,
                      })}
                    /> */}
                    <FormErrorMessage
                      error={errors.age}
                      messages={{
                        required: "*Required",
                        min: "Age is not valid",
                        maxLength:
                        "Age should not be more than 3 digit",
                      }}
                    />
                  </div>
                </div>
                {privileges?.roleName !== "HealthBuddy" && (
                  <div className="col-4 mt-4">
                    <label>DOB*</label>
                    <CustomController
                      name={"dob"}
                      control={control}
                      error={errors?.dob}
                      rules={{
                        required:
                          privileges?.roleName == "HealthBuddy" ? false : true,
                      }}
                      defaultValue={bloodGroup}
                      messages={{ required: "*Required" }}
                      render={({ onChange, ...fields }) => {
                        return (
                          <DatePicker
                            {...fields}
                            maxDate={new Date()}
                            onChange={(data) => {
                              calculate_age(new Date(data));
                              onChange(data);
                            }}
                            className="dobDatePicker"
                            clearIcon={null}
                            // placeholder={"MM/DD/YYYY"}
                            monthPlaceholder={"MM"}
                            yearPlaceholder={"YYYY"}
                            dayPlaceholder={"DD"}
                            value={DOB}
                            name={"DOB"}
                            // register={register({
                            //   required: true,
                            // })}
                          />
                        );
                      }}
                    />
                    {/* <FormErrorMessage
                    error={errors.DOB}
                    messages={{
                      required: "*Required",
                    }}
                  /> */}
                  </div>
                )}

                <div className="col-4 mt-4">
                  <label>Mobile Number*</label>
                  <div>
                    <InputBox
                      type={"number"}
                      name={"mobileNumber"}
                      //   value={reason}
                      //   onChange={(e) => setReason(e.target.value)}
                      register={register({
                        required: true,
                        minLength: 10,
                        maxLength: 10,
                        pattern: /^[0-9\b]+$/,
                      })}
                    />
                    <FormErrorMessage
                      error={errors.mobileNumber}
                      messages={{
                        required: "Phone Number is required",
                        minLength:
                          "Phone number should contain at least 10 numbers",
                        maxLength:
                          "Phone number should not be more than 10 number",
                        pattern:
                          "Phone Number field should not contain Alphabet",
                      }}
                    />
                  </div>
                </div>
                <div className="col-4 mt-4">
                  <label>Marital Status</label>
                  <div>
                    <CustomController
                      name={"maritalStatus"}
                      control={control}
                      error={errors?.maritalStatus}
                      rules={{ required: false }}
                      defaultValue={maritalStatus}
                      messages={{ required: "*Required" }}
                      render={({ onChange, ...fields }) => {
                        return (
                          <NormalMultiSelect
                            {...fields}
                            placeholder={"Select"}
                            name="maritalStatus"
                            value={maritalStatus}
                            options={[
                              { label: "Single", value: "Single" },
                              { label: "Married", value: "Married" },
                            ]}
                            handleChange={(e) => {
                              setmaritalStatus(e.target.value);
                              onChange(e.target.value);
                            }}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="col-4 mt-4">
                  <label>Patient Type*</label>
                  <div>
                    <CustomController
                      name={"patientType"}
                      control={control}
                      error={errors?.patientType}
                      rules={{ required: true }}
                      // defaultValue={patientType}
                      messages={{ required: "*Required" }}
                      render={({ onChange, ...fields }) => {
                        return (
                          <NormalMultiSelect
                            {...fields}
                            disabled={privileges?.roleName == "HealthBuddy"}
                            grayed={privileges?.roleName == "HealthBuddy"}
                            placeholder={"Select"}
                            name="patientType"
                            value={patientType}
                            options={patientTypeOption}
                            handleChange={(e) => {
                              setPatientType(e.target.value);
                              onChange(e.target.value);
                              if (e.target.value === "RETAIL") {
                                let data = {
                                  label: "MC001",
                                  value: "MC001",
                                };
                                setReferralCodeOption([data]);
                                reset({
                                  referralCode: data.value,
                                });
                                setReferralCode({
                                  label: data.value,
                                  value: data.value,
                                });
                              } else {
                                setReferralCodeOption([]);
                                setReferralCode("");
                                reset({
                                  referralCode: "",
                                });
                              }
                              setcorporateName("");
                            }}
                          />
                        );
                      }}
                    />
                  </div>
                </div>
                {patientType === "CORPORATE" && (
                  <div className="col-4 mt-4">
                    <label>Corporate Name*</label>
                    <div>
                      <CreatableSelect
                        name={"corporateName"}
                        className="select-form-control w-100"
                        isClearable
                        value={corporateName}
                        defaultValue={corporateName}
                        options={corporateNameOption}
                        onChange={(e) => {
                          if (!e) {
                            const newValue = "";
                            setcorporateName("");
                            reset({
                              corporateName: newValue,
                            });
                            setReferralCode("");
                            reset({
                              referralCode: "",
                            });
                            setReferralCodeOption([]);
                          } else {
                            const newValue = {
                              value: e?.value,
                              label: e?.label,
                            };
                            setcorporateName(newValue);
                            // setselectMemberData(member?._id);
                            reset({
                              corporateName: newValue,
                            });
                            setReferralCode("");
                            reset({
                              referralCode: "",
                            });
                          }
                        }}
                        onCreateOption={handleCorporateCreate}
                      />
                    </div>
                  </div>
                )}
                <div className="col-4 mt-4">
                  <label>Referral Code*</label>
                  <div>
                    <CreatableSelect
                      name={"referralCode"}
                      className="select-form-control w-100 margin-update"
                      isClearable
                      value={referralCode}
                      defaultValue={referralCode}
                      options={referralCodeOption}
                      isDisabled={
                        String(patientType).toUpperCase() == "RETAIL"
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        if (!e) {
                          const newValue = "";
                          setReferralCode("");
                          reset({
                            referralCode: newValue,
                          });
                        } else {
                          const newValue = {
                            value: e?.value,
                            label: e?.label,
                          };
                          setReferralCode(newValue);
                          reset({
                            referralCode: newValue,
                          });
                        }
                      }}
                      onCreateOption={handleReferralCreate}
                    />

                    {/* <CustomController
                      name={"referralCode"}
                      control={control}
                      error={errors?.referralCode}
                      defaultValue={referralCode}
                      messages={{ required: "Referral code is required" }}
                      rules={{ required: true }}
                      render={({ onChange, ...fields }) => {
                        return (
                          <Select
                            value={referralCode}
                            name={"referralCode"}
                            options={referralCodeOption}
                            isSearchable={true}
                            placeholder={"select"}
                            getOptionLabel={options => options.label}
                            getOptionValue={options => options.value}
                            handleChange={e => {
                              setReferralCode(e);
                              onChange(e);
                              reset({ referralCode: e.value });
                            }}
                          />
                        );
                      }}
                    /> */}
                  </div>
                  {/* )} */}
                </div>
                {privileges?.roleName !== "HealthBuddy" && (
                  <div className="col-4 mt-4">
                    <label>Occupation</label>
                    <div>
                      <InputBox
                        type={"text"}
                        name={"occupation"}
                        register={register({
                          required: false,
                        })}
                      />
                      <FormErrorMessage
                        error={errors.occupation}
                        messages={{
                          required: "*Required",
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="col-4 mt-4">
                  <label>Address Line 1</label>
                  <div>
                    <InputBox
                      type={"text"}
                      placeholder="Enter Address Line 1"
                      name={"addressDetail"}
                      register={register({
                        required: false,
                        maxLength: 60,
                        validate: {
                          spaceValidation,
                        },
                      })}
                    />
                    <FormErrorMessage
                      error={errors.addressDetail}
                      messages={{
                        required: "*Required",
                        spaceValidation: "Input is Blank",
                        maxLength:
                          "Address Line should not contain more than 60 letters",
                      }}
                    />
                  </div>
                </div>

                <div className="col-4 mt-4">
                  <div>
                    <label className="label pb-1 d-block">Address Line 2</label>
                    <InputBox
                      type={"text"}
                      name={"addressLine2"}
                      placeholder="Enter Address Line 2"
                      register={register({
                        required: false,
                        maxLength: 60,
                        validate: {
                          spaceValidation,
                        },
                      })}
                    />

                    <FormErrorMessage
                      error={errors?.addressLine2}
                      messages={{
                        required: "Address is required",
                        spaceValidation: "Input is Blank",
                        maxLength:
                          "Address Line should not contain more than 60 letters",
                      }}
                    />
                  </div>
                </div>
                <div className="col-4 mt-4">
                  <div>
                    <label className="label pb-1 d-block">City*</label>
                    <InputBox
                      type={"text"}
                      name={"city"}
                      placeholder="Enter city"
                      register={register({
                        required: true,
                        maxLength: 20,
                        validate: {
                          spaceValidation,
                        },
                      })}
                    />

                    <FormErrorMessage
                      error={errors?.city}
                      messages={{
                        required: "City is required",
                        spaceValidation: "Input is Blank",
                        maxLength:
                          "City should not contain more than 20 letters",
                      }}
                    />
                  </div>
                </div>
                <div className="col-4 mt-4">
                  <div>
                    <label className="label pb-1 d-block">Pincode*</label>
                    <InputBox
                      type={"number"}
                      name={"pincode"}
                      errors={errors}
                      maxLength={6}
                      placeholder="Enter pincode"
                      onChange={(e) => handlePincode(e)}
                      register={register({
                        required: true,
                        spaceValidation,
                        onlyNumbers,
                        maxLength: 6,
                        minLength: 6,
                      })}
                    />

                    <FormErrorMessage
                      error={errors?.pincode}
                      messages={{
                        required: "Pincode is required",
                        spaceValidation: "Input is Blank",
                        onlyNumbers: "please enter number",
                        maxLength:
                          "Pincode should not contain more than 6 digits",
                        minLength:
                          "Pincode should not contain less than 6 digits",
                      }}
                    />
                  </div>
                </div>

                <div className="col-4 mt-4">
                  <div>
                    <label className="label pb-1 d-block">State</label>
                    <InputBox
                      type={"text"}
                      name={"state"}
                      placeholder="Enter state"
                      register={register({
                        required: false,
                        maxLength: 60,
                        validate: {
                          spaceValidation,
                        },
                      })}
                    />
                    <FormErrorMessage
                      error={errors?.state}
                      messages={{
                        required: "state is required",
                        spaceValidation: "Input is Blank",
                        maxLength:
                          "state should not contain more than 60 letters",
                      }}
                    />
                  </div>
                </div>

                <div className="col-4 mt-4">
                  <div>
                    <label className="label pb-1 d-block">District</label>
                    <InputBox
                      type={"text"}
                      name={"district"}
                      placeholder="Enter district"
                      register={register({
                        required: false,
                        maxLength: 60,
                        validate: {
                          spaceValidation,
                        },
                      })}
                    />

                    <FormErrorMessage
                      error={errors?.district}
                      messages={{
                        required: "district is required",
                        spaceValidation: "Input is Blank",
                        maxLength:
                          "district should not contain more than 60 letters",
                      }}
                    />
                  </div>
                </div>
                {privileges?.roleName !== "HealthBuddy" && (
                  <>
                    {" "}
                    <div className="col-4 mt-4">
                      <div>
                        <label className="label pb-1 d-block">Country</label>
                        <InputBox
                          type={"text"}
                          name={"country"}
                          placeholder="Enter state"
                          register={register({
                            required: false,
                            maxLength: 60,
                            validate: {
                              spaceValidation,
                            },
                          })}
                        />
                        <FormErrorMessage
                          error={errors?.state}
                          messages={{
                            required: "country is required",
                            spaceValidation: "Input is Blank",
                            maxLength:
                              "country should not contain more than 60 letters",
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-4 mt-4">
                      <label>Email ID</label>
                      <div>
                        <InputBox
                          type={"text"}
                          name={"emailId"}
                          //   value={reason}
                          //   onChange={(e) => setReason(e.target.value)}
                          register={register({
                            required: false,
                            pattern: /\S+@\S+\.\S+/,
                          })}
                        />
                        <FormErrorMessage
                          error={errors.emailId}
                          messages={{
                            required: "*Required",
                            pattern: "Invalid Email ID",
                          }}
                        />
                      </div>{" "}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="d-flex justify-content-end mt-4">
            <div className="">
              <NormalButton
                label={"Cancel"}
                profileCreatBack
                onClick={() => history.goBack()}
              />
            </div>
            <div className="">
              <NormalButton
                label={"Save"}
                profileCreatNext
                onClick={handleSubmit(onSubmit)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegisterComponent;
