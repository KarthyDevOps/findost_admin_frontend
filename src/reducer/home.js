const initialState = {
  userDetail: "",
  staffAndRoles: {
    roles: true,
    staffs: false,
  },
  importMedicine: {
    newOrder: true,
    underProcess: false,
    completed: false,
    cancelled: false,
  },
  email: "",
  forgotToken: "",
  drawer: false,
  sessionExpire: false,
  userInfo: {},
  selectedPrescription: [],
  uploadPrescription: [],
  docDetails: {
    doctorName: "",
    patientName: "",
    purchaseValidity: "",
  },
  selectedDoctorType: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ADMIN_PRIVILEGES':
      return {
        ...state,
        privileges: payload
      }
    default:
      return state;
  }
};
