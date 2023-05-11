// DEVELOPMENT

export const baseURL = "http://doodlebluelive.com";
export const authURL = `${baseURL}:2055/api/v1`;
export const adminURL = `${baseURL}:2056/api/v1`;
export const documentUrl = `${baseURL}:2057/api/v1`;
export const contentUrl = `${baseURL}:2078/api/v1`;
export const miscellaneousURL = `${baseURL}:2090`;

//PRE PRODUCTION
export const razorPayKey = "rzp_test_UmmHfd3otJYTU9";

export const endpoints = {
  dashboard: {
    GET_ALL_COUNT: `${miscellaneousURL}/count`,
    GET_ALL_DUTY: `${adminURL}/slots/doctorsOnDuty/`,
  },
  patientManagement: {
    GET_ALL_PATIENTS: `${authURL}/user/admin/patientManagement/search`,
    GET_PATIENT_DETAILS: `${authURL}/user/admin/patientProfile`,
    GET_PATIENT_APPOINTMENT_DETAILS: `${adminURL}/appointment/admin/appointment`,
    CHANGE_PATIENT_ACTIVITY: `${authURL}/user/admin/changeActiveStatus`,
    GET_PATIENT_REPORTS: `${documentUrl}/document/admin/documents`,
    GET_FAMILY_MEMBER_DETAILS: `${authURL}/user/admin/getFamilyMember`,
    GET_MEDICAL_HISTORY: `${authURL}/user/admin/getMedicalHistory`,
    GET_CORPORATE_LIST: `${authURL}/admin/corporate/list`,
    BULK_UPLOAD_CSV: `${authURL}/user/admin/upload`,
    BULK_UPLOAD_LOGS: `${authURL}/user/admin/upload/logs`,
    RESEND_PRESCRIPTION: `${documentUrl}/prescription/prescription/resend`,
    DOWNLOAD_CSV: `${authURL}/user/admin/download/patient`,
    REGISTER_NEW_USER: `${authURL}/user/register/patient`,
    GET_DIAGONSIS_REPORT_ORDER: `${documentUrl}/diagonostic/myOrder/diagonosticList`,
    GET_SINGLE_REPORT_ORDER: `${documentUrl}/diagonostic/order`,
    BULK_UPLOAD_DIAGONSIS_REPORT: `${documentUrl}/diagonostic/updatediagonostic`,
    BULK_REPORT_UPOAD: `${documentUrl}/document/document/bulk`,
    GET_SELECTED_REGISTER_USER: `${authURL}/user/userProfile`,
    EDIT_REGISTER_USER: `${authURL}/user/editProfile`,
    GET_FAMILY_RELATIONS: `${authURL}/user/family/relations`,
    UPLOAD_IMAGE: `${documentUrl}/prescription/upload`,
    ADD_FAMILY_MEMBER: `${authURL}/user/addFamilyMember`,
    GET_SUBCRIPTION_PLAN: `${authURL}/admin/subscription`,
    PURCHASE_SUBCRIPTION: `${authURL}/user/subscription/purchase`,
    GET_COUPON_APPLY_STATUS: `${authURL}/user/subscription/purchase/summary`,
    GET_FAMILY_DATA_BASED_ON_MOBILE_NUMBER: `${authURL}/user/patient/byMobile`,
    GET_REFERRAL_LIST: `${authURL}/user/admin/referralList`,
    GET_BY_PINCODE: `${authURL}/user/searchPincode`,
    GET_FAMILY_MEMBERS: `${authURL}/user/getFamilyMember`,
    GET_FAMILY_MEMBERS_BY_COND: `${authURL}/user/getFamilyMemberByCond`,
  }
};
