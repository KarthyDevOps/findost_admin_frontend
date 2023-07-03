const initialState = {
  staffDetails : {},
  privileges: {
    "dashboard": {
      "create": true,
      "view": true,
      "edit": true,
      "remove": true
    },
    "staffManagement": {
      "create": false,
      "view": false,
      "edit": false,
      "remove": false
    },
    "productManagement": {
      "create": false,
      "view": false,
      "edit": false,
      "remove": false
    },
    "feedbackManagement": {
      "create": false,
      "view": false,
      "edit": false,
      "remove": false
    },
    "notificationManagement": {
      "create": false,
      "view": false,
      "edit": false,
      "remove": false
    },
    "contentManagement": {
      "create": false,
      "view": false,
      "edit": false,
      "remove": false
    },
    "templateManagement": {
      "create": false,
      "view": false,
      "edit": false,
      "remove": false
    },
    "faqManagement": {
      "create": false,
      "view": false,
      "edit": false,
      "remove": false
    },
    "clientFamilyManagement": {
      "create": false,
      "view": false,
      "edit": false,
      "remove": false
    },
    "siteSettingsManagement": {
      "create": false,
      "view": false,
      "edit": false,
      "remove": false
    },
    "knowledgeCenterManagement": {
      "create": false,
      "view": false,
      "edit": false,
      "remove": false
    }
  }
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADMIN_PRIVILEGES":
      return {
        ...state,
        privileges: payload
      };
      case "STAFF_DETAILS":
        return {
          ...state,
          staffDetails: payload
        };
    default:
      return state;
  }
};
