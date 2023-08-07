import React from "react";

const Payment = ({ data }) => {
  console.log(
    "data?.paymentDetails?.isCouponApplied.toString() :>> ",
    data?.paymentDetails?.isCouponApplied.toString()
  );
  return (
    <div className="personal-box p-4">
      <h3>Payment Details</h3>
      <div className="d-flex align-items-center mt-4">
        <div className="mx-3">
          <p>Payment Currency</p>
          <span>
            {data?.paymentDetails?.currency
              ? data?.paymentDetails?.currency
              : "-"}
          </span>
        </div>
        <div className="mx-3">
          <p>Coupon Applied</p>
          <span>
            {(data?.paymentDetails?.isCouponApplied ? "Yes" : "No") || "-"}
          </span>
        </div>
        <div className="mx-3">
          <p>Payment Status </p>
          <span>
            {data?.paymentDetails?.paymentStatus
              ? data?.paymentDetails?.paymentStatus
              : "-"}
          </span>
        </div>
        <div className="mx-3">
          <p>Total Charges</p>
          <span>
            {data?.paymentDetails?.segmentTotalCharge
              ? "₹" + data?.paymentDetails?.segmentTotalCharge
              : "-"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Payment;
