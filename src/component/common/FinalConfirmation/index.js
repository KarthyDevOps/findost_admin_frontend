// import React, { useState } from "react";

// import { Dialog } from "@material-ui/core/";
// import InputBox from "component/common/InputBox/InputBox";
// import NormalButton from "../NormalButton/NormalButton";
// import { Toast } from "service/toast";
// import { CancelAppointment } from "service/Auth";
// import FormErrorMessage from "../ErrorMessage";
// import { useForm } from "react-hook-form";

// const FinalConfirmation = ({
//   classes,
//   open,
//   handleClose,
//   AppointmentId,
//   fetchData,
// }) => {
//   const [cancelreason, setCancelreason] = useState();

//   const { register, handleSubmit, errors, control, reset } = useForm({
//     mode: "onChange",
//   });

//   const handleCancelConfirm = async (inputs) => {
//     if (!AppointmentId) return;
//     const body = {
//       cancelreason: inputs.cancelreason
//     }
//     const { data: { status } = {} } = await CancelAppointment({
//       id: AppointmentId,
//       body,
//     });
//     if (status === 200) {
//       Toast({ type: "success", message: "Appointment cancelled" });
//       await fetchData();
//       handleClose();      
//     }
//   };

//   return (
//     <div>
//       <Dialog
//         classes={{ paper: classes.dialogPaper }}
//         fullWidth={false}
//         maxWidth={"s"}
//         open={open}
//         // onClose={handleClose}
//         aria-labelledby="form-dialog-title"
//       >
//         <div className="modalBody">
//           <div className="modalHeader d-flex justify-content-between px-4 py-3 cursor-pointer">
//             <div className="col-sm-6">
//               <label>Confirmation</label>
//             </div>
//             <div className="col-sm-6">
//               <div
//                 className="d-flex justify-content-end cursor-pointer"
//                 onClick={handleClose}
//               >
//                 <img src={"closeCross"} />
//               </div>
//             </div>
//           </div>

//           <div className="px-4 mt-2 mb-2">
//             <div className="d-flex px-3 mt-3 mb-3 fs-16 fw-500">
//               Reason for cancellation*
//             </div>
//             <div className="d-flex px-3">
//               <InputBox
//                 type={"text"}
//                 name={"cancelreason"}
//                 register={register({
//                   required: true,
//                 })}
//               />
//             </div>
//             <div className="col-12">
//               <FormErrorMessage
//                 error={errors.cancelreason}
//                 messages={{
//                   required: "Reason is required",
//                 }}
//               />
//             </div>
//           </div>

//           <div className="px-4 mt-3 mb-4">
//             <div className="d-flex px-3 mt-3 mb-3 fs-18 fw-500 text-secondary">
//               Are you sure want to cancel the appointment?
//             </div>
//             <div className="d-flex">
//               <div className="col-sm-6">
//                 <div className="d-flex justify-content-center">
//                   <NormalButton
//                     btnSecondary
//                     label={"Yes"}
//                     onClick={handleSubmit(handleCancelConfirm)}
//                     className={`w-50 p-1`}
//                   />
//                 </div>
//               </div>

//               <div className="col-sm-6">
//                 <div className="d-flex justify-content-center">
//                   <NormalButton
//                     btnSecondary
//                     label={"No"}
//                     onClick={() => handleClose()}
//                     className={`w-50 p-1`}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default FinalConfirmation;
