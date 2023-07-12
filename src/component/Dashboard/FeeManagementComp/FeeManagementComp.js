import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
//styles
import "./style.scss";
//internal components
import InputBox from "component/common/InputBox/InputBox";
import NormalButton from "component/common/NormalButton/NormalButton";
//service
import { Toast } from "service/toast";
import { BsArrowLeft } from "react-icons/bs";
//helpers
import { history, debounceFunction } from "helpers";
import SegmentSelection from "./SegmentSelection";
import FormErrorMessage from "component/common/ErrorMessage";
import { getRegisterFee, updateRegisterFee } from "service/Auth";

const FeeManagementComp = ({ feeAccess }) => {
  const { register, handleSubmit, errors, reset } = useForm({
    mode: "onChange",
  });
  const [activeTab, setActiveTab] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  var url = new URL(document.URL);
  const params = url.searchParams;
  const tabValue = +params.get("tab") ?? 0;

  const handleTab = (tab) => {
    setActiveTab(tab);
    history.push(`fee-management?tab=${tab}`);
  };

  // const id = localStorage.getItem("editId");
  const id = "649d0321c8d6b9e6f3ae6f4d";

  const getFeeDetails = async () => {
    try {
      const params = {
        id: "649d0321c8d6b9e6f3ae6f4d",
      };
      let response = await getRegisterFee(params);
      if (response.status === 200) {
        const data = response?.data.data;
        if (data.length > 0) {
        } else {
        }
        reset({
          applicationFee: data?.applicationFee,
          depositFee: data?.securityDeposit,
        });
      } else {
        Toast({ type: "error", message: response.data.message });
      }
    } catch (e) {
      console.log("e :>> ", e);
    }
  };

  useEffect(() => {
    getFeeDetails();
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let body = {
        applicationFee: data.applicationFee,
        securityDeposit: data.depositFee,
      };
      let response = await updateRegisterFee(body, id);
      if (response.status === 200) {
        setModal(true);
        Toast({ type: "success", message: "updated successfully" });
        setTimeout(() => {
          setModal(false);
          reset();
          history.push("/admin/fee-management?tab=1");
          getFeeDetails();
        }, 2000);
        setLoading(false);
      } else {
        setLoading(false);
        Toast({ type: "error", message: response.data.message });
        getFeeDetails();
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    handleTab(tabValue);
  }, []);

  return (
    <div className="faq_head px-5 py-3">
      <h6>Fee Management</h6>
      <div className="Tab_design p-0">
        <div
          className={
            activeTab === 0 ? "Tab_design_active" : "Tab_design_inActive"
          }
          onClick={() => {
            handleTab(0);
            setCurrentPage(1);
          }}
        >
          Segment Selection
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <div
          className={
            activeTab === 1 ? "Tab_design_active" : "Tab_design_inActive"
          }
          onClick={() => {
            handleTab(1);
          }}
        >
          Manage Fee
        </div>
      </div>
      {activeTab === 0 ? (
        <>
          <SegmentSelection
            currentPage={currentPage}
            pageCount={pageCount}
            setPageCount={setPageCount}
            feeAccess={feeAccess}
          />
        </>
      ) : (
        feeAccess?.create && (
          <>
            <div className="add_faq py-3">
              <form>
                <div className="Add_faq p-5 my-3">
                  <div className="row">
                    <div className="col-6">
                      <label>Application Fee</label>
                      <InputBox
                        className="add_staff"
                        type={"text"}
                        placeholder="Enter Application Fee"
                        name="applicationFee"
                        errors={errors}
                        register={register({
                          required: true,
                          pattern: /^\d+(\.\d+)?$/,
                        })}
                      />
                      <FormErrorMessage
                        error={errors.applicationFee}
                        messages={{
                          required: "Application Fee is Required",
                          pattern: "Application Fee is Invalid",
                        }}
                      />
                    </div>
                    <div className="col-6">
                      <label>Security Deposit</label>
                      <InputBox
                        className="add_staff"
                        type={"text"}
                        placeholder="Enter Security Deposit"
                        name="depositFee"
                        errors={errors}
                        register={register({
                          required: true,
                          pattern: /^\d+(\.\d+)?$/,
                        })}
                      />
                      <FormErrorMessage
                        error={errors.depositFee}
                        messages={{
                          required: "Security Deposit is Required",
                          pattern: "Security Deposit is Invalid",
                        }}
                      />
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-end mt-2 p-0 pt-5">
                    <div className="col-md-2">
                      <NormalButton
                        className="authButton1"
                        label={"Cancel"}
                        onClick={() => history.push("/admin/fee-management")}
                      />
                    </div>
                    {feeAccess?.create && (
                      <div className="col-md-2 pl-3 p-0">
                        <NormalButton
                          className="loginButton"
                          onClick={handleSubmit(onSubmit)}
                          label={"Submit"}
                          isLoading={loading}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default FeeManagementComp;
