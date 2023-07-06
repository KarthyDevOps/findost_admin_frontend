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
import {
  addCalendarEvent,
  updateCalendarEvent,
  getCalendarEvent,
} from "service/Calendar";
import { Toast } from "service/toast";
import { Space, TimePicker } from "antd";
import { uploadImage } from "service/Auth";
import moment from "moment";
//helper
import { history } from "helpers";

const AddCalendarComp = ({ calendarAccess }) => {
  const { register, handleSubmit, errors, reset, control } = useForm({
    mode: "onChange",
  });
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [image, setImage] = useState("");
  const [editEvent, setEditEvent] = useState(false);
  const [date, setDate] = useState("");
  const id = localStorage.getItem("editId");
  let today = new Date();

  const getEventDetails = async () => {
    try {
      let params = {
        id: id,
      };
      let response = await getCalendarEvent(params);
      if (response.status === 200) {
        const data = response?.data?.data;
        reset({
          eventName: data?.summary,
          meetLink: data?.description,
        });
        setDate(new Date(data?.date));
        setImage(data?.imageUrlS3);
        setImageUrl(data?.imageUrl);
        setStartTime(data?.startTime);
        setEndTime(data?.endTime);
      } else {
        Toast({ type: "error", message: response.data.message });
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  const onSubmit = async (data) => {
    if (!editEvent) {
      try {
        setLoading(true);
        let body = {
          summary: data.eventName,
          date: date,
          startTime: startTime,
          endTime: endTime,
          imageUrl: imageUrl,
          description: data.meetLink,
        };
        let response = await addCalendarEvent(body);
        if (response.status === 200) {
          setModal(true);
          setTimeout(() => {
            setModal(false);
            history.push("/admin/calendar-management");
          }, 2000);
          setLoading(false);
        } else {
          Toast({ type: "error", message: response.data.message });
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        setLoading(true);
        let body = {
          summary: data.eventName,
          date: date,
          startTime: startTime,
          endTime: endTime,
          imageUrl: imageUrl,
          description: data.meetLink,
        };
        let response = await updateCalendarEvent(body, id);
        if (response.status === 200) {
          setModal(true);
          setTimeout(() => {
            setModal(false);
            history.push("/admin/calendar-management");
          }, 2000);
          setLoading(false);
        } else {
          Toast({ type: "error", message: response.data.message });
        }
      } catch (e) {
        console.log(e);
      }
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

  const currentStartTime =
    startTime.length > 7 ? startTime.slice(0, 2) : startTime.slice(0, 1);

  const currentMinuteTime =
    startTime.length > 7 ? startTime.slice(3, 5) : startTime.slice(2, 4);

  const disabledHours = () => {
    const currentHour = today.getHours() % 12 || 12;
    const disabledHourRange = Array.from({ length: currentHour }, (_, i) => i);
    return disabledHourRange;
  };

  const disabledEndHours = () => {
    const currentHour = currentStartTime;
    const disabledHourRange = Array.from({ length: currentHour }, (_, i) => i);
    return disabledHourRange;
  };

  const disabledMinute = () => {
    const currentMinute = today.getMinutes();
    const disabledMinuteRange = Array.from(
      { length: currentMinute },
      (_, i) => i
    );
    return disabledMinuteRange;
  };

  const disabledEndMinute = () => {
    const currentMinute = currentMinuteTime;
    const disabledMinuteRange = Array.from(
      { length: currentMinute },
      (_, i) => i
    );
    return disabledMinuteRange;
  };

  useEffect(() => {
    if (id) {
      setEditEvent(true);
      getEventDetails();
    }
  }, []);

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
            <div className="col-md-4 p-0">
              <label>Event Date</label>
              <div className="date_of_birth">
                <CustomController
                  name={"date"}
                  control={control}
                  error={errors.date}
                  defaultValue={date}
                  rules={{ required: date ? false : true }}
                  messages={{
                    required: "Date is Required",
                  }}
                  render={({ onChange, value, ...field }) => {
                    return (
                      <CommonDatePicker
                        clientDatePicker
                        name="date"
                        {...field}
                        id="date"
                        value={date}
                        onChange={(date) => {
                          onChange(date);
                          setDate(date);
                        }}
                        placeholder="Select Date"
                        minDate={new Date()}
                      />
                    );
                  }}
                />
              </div>
            </div>
            <div className="col-md-4">
              <label>Start Time</label>
              <div className="time-zone">
                <CustomController
                  name="startTime"
                  control={control}
                  error={errors.startTime}
                  defaultValue={
                    startTime ? moment(startTime, "hh:mm a") : startTime
                  }
                  rules={{ required: startTime ? false : true }}
                  messages={{ required: "Start Time is Required" }}
                  render={({ onChange, value, ...field }) => {
                    return (
                      <Space wrap>
                        <TimePicker
                          {...field}
                          value={
                            startTime ? moment(startTime, "hh:mm a") : startTime
                          }
                          use12Hours
                          name="startTime"
                          format="h:mm a"
                          onChange={(time, timeString) => {
                            onChange(moment(timeString));
                            setStartTime(timeString);
                          }}
                          placeholder="Start Time"
                          // disabledHours={disabledHours}
                          // disabledMinutes={disabledMinute}
                        />
                      </Space>
                    );
                  }}
                />
              </div>
            </div>
            <div className="col-md-4 my-3">
              <label>End Time</label>
              <div className="time-zone">
                <CustomController
                  name="endTime"
                  control={control}
                  error={errors.endTime}
                  defaultValue={endTime ? moment(endTime, "hh:mm a") : endTime}
                  rules={{ required: endTime ? false : true }}
                  messages={{ required: "End Time is Required" }}
                  render={({ onChange, value, ...field }) => {
                    return (
                      <Space wrap>
                        <TimePicker
                          {...field}
                          value={endTime ? moment(endTime, "hh:mm a") : endTime}
                          use12Hours
                          name="endTime"
                          format="h:mm a"
                          onChange={(time, timeString) => {
                            onChange(timeString);
                            setEndTime(timeString);
                          }}
                          placeholder="End Time"
                          disabledHours={disabledEndHours}
                          disabledMinutes={disabledEndMinute}
                        />
                      </Space>
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
                placeholder="Enter Meet Link"
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
                  required: "Meet Link is Required",
                  pattern: "Invalid Meet Link",
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
