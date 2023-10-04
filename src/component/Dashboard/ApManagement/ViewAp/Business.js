import React from "react";

const Business = ({ data }) => {
  return (
    <div className="personal-box p-4">
      <div className="row">
        <div className="col-6">
          <h3>Internet Connection</h3>
          <div className="d-flex align-items-center justify-content-between mt-4">
            <div className="">
              <p>Internet Type</p>
              <span>
                {data?.business?.internetType
                  ? data?.business?.internetType
                  : "-"}
              </span>
            </div>
            <div className="">
              <p>Internet Quality</p>
              <span>
                {data?.business?.internetQuality
                  ? data?.business?.internetQuality
                  : "-"}
              </span>
            </div>
            <div className="">
              <p>Internet Usage/Week</p>
              <span>
                {data?.business?.internetUsage
                  ? data?.business?.internetUsage
                  : "-"}
              </span>
            </div>
          </div>
          <h3 className="my-3">Business Forecast</h3>
          <h1>
            {data?.business?.businessForecast?.cumulative_three_months
              ? "Cumulative - 3 months"
              : "-"}
          </h1>
          <div className="d-flex align-items-center mt-4">
            <div className="">
              <p>Delivery</p>
              <span>
                {data?.business?.businessForecast?.cumulative_three_months
                  ?.delivery
                  ? data?.business?.businessForecast?.cumulative_three_months
                      ?.delivery
                  : "-"}
              </span>
            </div>
            <div className="mx-3">
              <p>Trading </p>
              <span>
                {data?.business?.businessForecast?.cumulative_three_months
                  ?.trading
                  ? data?.business?.businessForecast?.cumulative_three_months
                      ?.trading
                  : "-"}
              </span>
            </div>
            <div className="mx-3">
              <p>Derivatives</p>
              <span>
                {data?.business?.businessForecast?.cumulative_three_months
                  ?.derivatives
                  ? data?.business?.businessForecast?.cumulative_three_months
                      ?.derivatives
                  : "-"}
              </span>
            </div>
          </div>
          <h1>
            {data?.business?.businessForecast?.cumulative_six_months
              ? "Cumulative - 6 months"
              : "-"}
          </h1>
          <div className="d-flex align-items-center mt-4">
            <div className="">
              <p>Delivery</p>
              <span>
                {data?.business?.businessForecast?.cumulative_six_months
                  ?.delivery
                  ? data?.business?.businessForecast?.cumulative_six_months
                      ?.delivery
                  : "-"}
              </span>
            </div>
            <div className="mx-3">
              <p>Trading </p>
              <span>
                {data?.business?.businessForecast?.cumulative_six_months
                  ?.trading
                  ? data?.business?.businessForecast?.cumulative_six_months
                      ?.trading
                  : "-"}
              </span>
            </div>
            <div className="mx-3">
              <p>Derivatives</p>
              <span>
                {data?.business?.businessForecast?.cumulative_six_months
                  ?.derivatives
                  ? data?.business?.businessForecast?.cumulative_six_months
                      ?.derivatives
                  : "-"}
              </span>
            </div>
          </div>
          <h1>
            {data?.business?.businessForecast?.cumulative_one_year
              ? "Cumulative - 1 Year"
              : "-"}
          </h1>
          <div className="d-flex align-items-center mt-4">
            <div className="">
              <p>Delivery</p>
              <span>
                {data?.business?.businessForecast?.cumulative_one_year?.delivery
                  ? data?.business?.businessForecast?.cumulative_one_year
                      ?.delivery
                  : "-"}
              </span>
            </div>
            <div className="mx-3">
              <p>Trading </p>
              <span>
                {data?.business?.businessForecast?.cumulative_one_year?.trading
                  ? data?.business?.businessForecast?.cumulative_one_year
                      ?.trading
                  : "-"}
              </span>
            </div>
            <div className="mx-3">
              <p>Derivatives</p>
              <span>
                {data?.business?.businessForecast?.cumulative_one_year
                  ?.derivatives
                  ? data?.business?.businessForecast?.cumulative_one_year
                      ?.derivatives
                  : "-"}
              </span>
            </div>
          </div>
          <h3 className="my-3">Segment Selection</h3>
          {data?.business?.segmentSelection.length > 0 ? (
            <div className="d-flex align-items-center">
              <div>
                {data?.business?.segmentSelection.map((x) => {
                  return <p>{x?.segmentName}</p>;
                })}

                <p>Total</p>
              </div>
              <div className="mx-5 px-5">
                {data?.business?.segmentSelection?.map((x) => {
                  return <h4 className="mb-3">₹ {x?.segmentCharge}</h4>;
                })}

                <h4 className="mb-3">
                  ₹ {data?.paymentDetails?.segmentTotalCharge}
                </h4>
              </div>
            </div>
          ) : (
            "-"
          )}
        </div>
        <div className="col-6">
          <h3 className="">Business Reference</h3>
          <div className="d-flex align-items-center justify-content-between mt-4">
            <div className="">
              <p>Full Name</p>
              <span>
                {data?.business?.businessRefference[0]?.fullName
                  ? data?.business?.businessRefference[0]?.fullName
                  : "-"}
              </span>
            </div>
            <div className="">
              <p>Mobile Number</p>
              <span>
                {data?.business?.businessRefference[0]?.mobileNumber
                  ? data?.business?.businessRefference[0]?.mobileNumber
                  : "-"}
              </span>
            </div>
            <div className="">
              <p>Email ID</p>
              <span>
                {data?.business?.businessRefference[0]?.email
                  ? data?.business?.businessRefference[0]?.email
                  : "-"}
              </span>
            </div>
          </div>
          <p className="my-3">Address</p>
          <span>
            {data?.business?.businessRefference[0]?.address
              ? data?.business?.businessRefference[0]?.address
              : "-"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Business;
