import React from "react";

const Nomination = ({ data }) => {
  return (
    <div className="personal-box p-4">
      <h3>Nomination Details</h3>
      <div className="d-flex align-items-center justify-content-between mt-4">
        <div className="">
          <p>Name of the Nominee</p>
          <span>
            {data?.nomineeDetails?.nomineeName
              ? data?.nomineeDetails?.nomineeName
              : "-"}
          </span>
        </div>
        <div className="">
          <p>PAN of the Nominee</p>
          <span>
            {data?.nomineeDetails?.nomineePan
              ? data?.nomineeDetails?.nomineePan
              : "-"}
          </span>
        </div>
        <div className="">
          <p>Mobile of the Nominee </p>
          <span>
            {data?.nomineeDetails?.nomineeMobile
              ? data?.nomineeDetails?.nomineeMobile
              : "-"}
          </span>
        </div>
        <div className="">
          <p>Date of Birth of Nominee</p>
          <span>
            {data?.nomineeDetails?.nomineeDOB
              ? data?.nomineeDetails?.nomineeDOB
              : "-"}
          </span>
        </div>
        <div className="">
          <p>Relationship with Nominee</p>
          <span>
            {data?.nomineeDetails?.nomineeRelationship
              ? data?.nomineeDetails?.nomineeRelationship
              : "-"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Nomination;
