import React, { useState, useEffect } from "react";
import { getSiteSetting, updateSiteSetting } from "service/Cms";
import { Toast } from "service/toast";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { history } from "helpers";

const DisclaimerPage = () => {
  const { register, handleSubmit, errors, control, reset, setError } = useForm({
    mode: "onChange",
  });
  const [data, setData] = useState("");

  const getSiteDetails = async () => {
    try {
      let response = await getSiteSetting();
      if (response.status === 200) {
        const data = response?.data.data;
        if (data && data?.copyrightsText) {
          const strippedDescription = data?.copyrightsText.replace(
            /<\/?[^>]+(>|$)/g,
            ""
          );
          setData(strippedDescription);
        }
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  useEffect(() => {
    getSiteDetails();
  }, []);

  return (
    <div>
      <div className="mx-5 my-5">
        <p className="fs-25 fw-bold">Disclaimer</p>
        <p>{data}</p>
      </div>
    </div>
  );
};

export default DisclaimerPage;
