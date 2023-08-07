import React from "react";

const Address = ({ data }) => {
  return (
    <div className="personal-box p-4">
      <div className="row">
        <div className="col-6">
          <h3>Residential Address</h3>
          {data?.address ? (
            <>
              <h4>
                {data?.address?.residentialFlatNo} {", "}
                {data?.address?.residentialArea}
              </h4>
              <h4>{data?.address?.residentialLandMark}</h4>
              <h4>
                {data?.address?.residentialCity}
                {" - "}
                {data?.address?.residentialPinCode}
              </h4>
              <h4>{data?.address?.residentialState}</h4>
              <h4>{data?.address?.residentialCountry}</h4>
            </>
          ) : (
            "-"
          )}
        </div>
        <div className="col-6">
          <h3>Office Address</h3>
          {data?.address ? (
            <>
              <h4>
                {data?.address?.officeFlatNo} {", "}
                {data?.address?.officeArea}
              </h4>
              <h4>{data?.address?.officeLandMark}</h4>
              <h4>
                {data?.address?.officeCity}
                {" - "}
                {data?.address?.officePinCode}
              </h4>
              <h4>{data?.address?.officeState}</h4>
              <h4>{data?.address?.officeCountry}</h4>
            </>
          ) : (
            "-"
          )}
        </div>
      </div>
    </div>
  );
};

export default Address;
