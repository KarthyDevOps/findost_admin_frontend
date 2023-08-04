import React from "react";

const Documents = ({ data, mp4, download, Suffix, pdf, jpg }) => {
  return (
    <div className="personal-box p-4">
      <div className="row">
        <div className="col-4">
          <h1>Professional Document</h1>
          <div className="d-flex flex-noWrap col-12 document-card p-3">
            <div className="col-2 p-0">
              <img src={jpg} alt="" />
            </div>
            <div className="col-7 p-0">
              <p>IPV recording with proof</p>
              <span>File size is 1 MB</span>
            </div>
            <div className="col-1 mr-2">
              <img src={download} alt="" />
            </div>
            <div className="col-2">
              <img src={Suffix} alt="" />
            </div>
          </div>
          <h1 className="mt-3">Education Qualification Document</h1>
          <div className="d-flex flex-noWrap col-12 document-card p-3">
            <div className="col-2 p-0">
              <img src={pdf} alt="" />
            </div>
            <div className="col-7 p-0">
              <p>IPV recording with proof</p>
              <span>File size is 1 MB</span>
            </div>
            <div className="col-1 mr-2">
              <img src={download} alt="" />
            </div>
            <div className="col-2">
              <img src={Suffix} alt="" />
            </div>
          </div>
          <br/>
          <span>* The name in the educational document is different the one in PAN</span>
          <br/>
          <h1 className="mt-3">Proof of name change</h1>
          <div className="d-flex flex-noWrap col-12 document-card p-3">
            <div className="col-2 p-0">
              <img src={pdf} alt="" />
            </div>
            <div className="col-7 p-0">
              <p>IPV recording with proof</p>
              <span>File size is 1 MB</span>
            </div>
            <div className="col-1 mr-2">
              <img src={download} alt="" />
            </div>
            <div className="col-2">
              <img src={Suffix} alt="" />
            </div>
          </div>
        </div>
        <div className="col-1"></div>
        <div className="col-4">
        <h1 className="mt-3">Proof of name change</h1>
          <div className="d-flex flex-noWrap col-12 document-card p-3">
            <div className="col-2 p-0">
              <img src={pdf} alt="" />
            </div>
            <div className="col-7 p-0">
              <p>IPV recording with proof</p>
              <span>File size is 1 MB</span>
            </div>
            <div className="col-1 mr-2">
              <img src={download} alt="" />
            </div>
            <div className="col-2">
              <img src={Suffix} alt="" />
            </div>
          </div>
          <h1 className="mt-3">Proof of name change</h1>
          <div className="d-flex flex-noWrap col-12 document-card p-3">
            <div className="col-2 p-0">
              <img src={pdf} alt="" />
            </div>
            <div className="col-7 p-0">
              <p>IPV recording with proof</p>
              <span>File size is 1 MB</span>
            </div>
            <div className="col-1 mr-2">
              <img src={download} alt="" />
            </div>
            <div className="col-2">
              <img src={Suffix} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
