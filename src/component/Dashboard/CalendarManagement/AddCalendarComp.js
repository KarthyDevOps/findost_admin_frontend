import React, { useState, useEffect, Fragment } from "react";
// styles
import "./style.scss";
// images
import cloudIcon from "assets/images/uploadcloud.svg";
//internal components
import CustomController from "component/common/Controller";
import FormErrorMessage from "component/common/ErrorMessage";
import InputBox from "component/common/InputBox/InputBox";
import NormalButton from "component/common/NormalButton/NormalButton";
import CommonDatePicker from "component/common/CommonDatePicker/CommonDatePicker";
import SuccessModal from "component/common/DeleteModal/SuccessModal";
//service
import { useForm } from "react-hook-form";
import Dropzone from "react-dropzone";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { getClient, updateClient } from "service/Auth";
import { Toast } from "service/toast";
import { uploadImage } from "service/Auth";
//helper
import { history } from "helpers";

const AddCalendarComp = ({ edit, view }) => {
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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState("");
  const [editEvent, setEditEvent] = useState(false);
  const newStartDate = new Date(startDate);
  const newEndDate = new Date(endDate);
  const id = localStorage.getItem("editId");

  const getEventDetails = async () => {
    // try {
    //   let response = await getClient(params);
    //   if (response.status === 200) {
    //     const data = response?.data?.data?.data;
    //     reset({
    //       clientName: data?.clientName,
    //       email: data?.email,
    //       relativeName: data?.relativeName,
    //       dateOfBirth: new Date(data?.dateOfBirth),
    //     });
    //     setClientDetails({
    //       relationShip: data.relationShip,
    //     });
    //   } else {
    //     Toast({ type: "error", message: response.data.message });
    //   }
    // } catch (e) {
    //   console.log("e :>> ", e);
    // }
  };

  const onSubmit = async (data) => {
    console.log("data :>> ", data);
    try {
      setLoading(true);
      let body = {};
      //   let response = await updateClient(body, id);
      //   if (response.status === 200) {
      //     setModal(true);
      //     const timeout = setTimeout(() => {
      //       setModal(false);
      //       reset(ClientDetails);
      //       history.push("/admin/clients-family");
      //     }, 1000);
      //     setLoading(false);
      //     return () => clearTimeout(timeout);
      //   } else {
      //     Toast({ type: "error", message: response.data.message });
      //   }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDrop = async (droppedimage) => {
    let body = new FormData();
    for (let index = 0; index < droppedimage.length; index++) {
      const file = droppedimage[index];
      body.append("data", file);
      let response = await uploadImage(body);
      if (response.status == 200) {
        setImageUrl(response?.data?.data?.data?.key);
        setImage(response?.data?.data?.data?.s3URL);
      }
    }
  };

  const deleteImage = (e) => {
    e.stopPropagation();
    setImage(null);
  };

  //   useEffect(() => {
  //     if (id) {
  //       getEventDetails();
  //     }
  //   }, []);

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
        <h6 className="m-0">{editEvent ? "Edit Event" : "Add Event"}</h6>
      </div>
      <form>
        <div className="client_box p-5">
          <div className="row ">
            <div className="col-md-4">
              <label>Event Name</label>
              <InputBox
                className="add_staff"
                type={"text"}
                placeholder="Enter Event Name"
                name="eventName"
                errors={errors}
                register={register({
                  required: true,
                  pattern: /^(?!\s*$).+/,
                })}
              />
              <FormErrorMessage
                error={errors.eventName}
                messages={{
                  required: "Event Name is Required",
                  pattern: "Event Name Invalid",
                }}
              />
            </div>
            <div className="col-md-4">
              <label>Start Date</label>
              <div className="date_of_birth start-date-container">
                <CustomController
                  name={"startDate"}
                  control={control}
                  error={errors.startDate}
                  defaultValue={startDate}
                  rules={{ required: true }}
                  messages={{
                    required: "Start Date is Required",
                  }}
                  render={({ onChange, ...field }) => {
                    return (
                      <CommonDatePicker
                        clientDatePicker
                        name="startDate"
                        {...field}
                        id="startDate"
                        value={startDate}
                        onChange={(date) => {
                          onChange(date);
                          setStartDate(date);
                        }}
                        placeholder="Start Date"
                        minDate={new Date()}
                        maxDate={newEndDate.setDate(newEndDate.getDate() - 1)}
                        // className="start-date-picker"
                      />
                    );
                  }}
                />
              </div>
            </div>
            <div className="col-md-4">
              <label>End Date</label>
              <div className="date_of_birth">
                <CustomController
                  name={"endDate"}
                  control={control}
                  error={errors.endDate}
                  defaultValue={endDate}
                  rules={{ required: true }}
                  messages={{
                    required: "End Date is Required",
                  }}
                  render={({ onChange, ...field }) => {
                    return (
                      <CommonDatePicker
                        clientDatePicker
                        {...field}
                        id="endDate"
                        name="endDate"
                        value={endDate}
                        onChange={(date) => {
                          onChange(date);
                          setEndDate(date);
                        }}
                        placeholder="End Date"
                        minDate={newStartDate.setDate(
                          newStartDate.getDate() + 1
                        )}
                      />
                    );
                  }}
                />
              </div>
            </div>
            <div className="col-4 my-3">
              <label>Meet Link</label>
              <InputBox
                className="add_staff"
                type={"text"}
                placeholder="Enter Meet LinK"
                name="meetLink"
                errors={errors}
                register={register({
                  required: true,
                  pattern: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                })}
              />
              <FormErrorMessage
                error={errors.meetLink}
                messages={{
                  required: "Meet LinK is Required",
                  pattern: "Invalid Meet LinK",
                }}
              />
            </div>
            <div className="col-4 mt-4">
              <label className="Product_description">Event Image</label>
              <Dropzone
                onDrop={handleDrop}
                accept=".png, .jpeg, .jpg, "
                maxSize={3072000}
                errors={errors}
                {...register("imageField", {
                  required: image ? false : true,
                })}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps({ className: "dropzone" })}>
                    <div className=" border border-secondary-subtle   ">
                      <input {...getInputProps()} multiple={false} />
                      {image ? (
                        <>
                          <img
                            src={image}
                            alt="SiteFavLogo"
                            className="preview_image"
                          ></img>
                        </>
                      ) : (
                        <>
                          <span className="cloud_icon">
                            <img src={cloudIcon} alt="icon"></img>
                          </span>
                          <p className="drag_text">
                            Drag your files here to start uploading or
                          </p>
                          <div className=" drag_btn ">
                            <NormalButton
                              onClick={(e) => e.preventDefault()}
                              addProductbtn
                              label="Browse"
                            />
                          </div>
                        </>
                      )}
                      {image && (
                        <span
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            cursor: "pointer",
                            zIndex: 1000,
                          }}
                          onClick={deleteImage}
                        >
                          <AiOutlineCloseCircle
                            size={24}
                            style={{ color: "red" }}
                          />
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </Dropzone>
              {!image && (
                <FormErrorMessage
                  error={errors.imageField}
                  messages={{
                    required: "Event Image is Required",
                  }}
                />
              )}
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-end mt-5 pt-5">
            <div className="col-md-2">
              <NormalButton
                className="authButton1"
                label={"Cancel"}
                onClick={() => history.push("/admin/calendar-management")}
              />
            </div>
            {/* {edit && ( */}
            <div className="col-md-2 p-0">
              <NormalButton
                className="loginButton"
                label={editEvent ? "Update Event" : "Add Event"}
                onClick={handleSubmit(onSubmit)}
                isLoading={loading}
              />
            </div>
            {/* )} */}
          </div>
        </div>
      </form>
      <div>
        <SuccessModal
          modalOpen={modal}
          onCancel={() => setModal(false)}
          successMsg={
            editEvent
              ? "Calendar Event Updated Successfully"
              : "Calendar Event Created Successfully"
          }
        />
      </div>
    </div>
  );
};

export default AddCalendarComp;
