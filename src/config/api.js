// DEVELOPMENT

export const baseURL = "http://doodlebluelive.com";
export const userUrl = `${baseURL}:2277/user/api/v1`;
export const communicationUrl = `${baseURL}:2275/communication/v1`;
export const cms = `${baseURL}:2274/cms/v1`;
export const CalendarUrl = `${baseURL}:2275/communication/v1/admin`;
export const lead = `${baseURL}:2276/finance/v1`

//PRE PRODUCTION

export const endpoints = {
  auth: {
    LOGIN_USER: `${userUrl}/admin/login`,
    FORGET_PASSWORD: `${userUrl}/admin/forgotPassword`,
    RESET_PASSWORD: `${userUrl}/admin/resetPassword`,
    GET_STAFF_LIST: `${userUrl}/admin/list`,
    ADD_STAFF: `${userUrl}/admin/addProfile`,
    GET_STAFF: `${userUrl}/admin/getProfile`,
    DELETE_STAFF: `${userUrl}/admin/delete`,
    UPDATE_STAFF: `${userUrl}/admin/updateProfile`,
    LIST_CLIENT: `${userUrl}/clientFamily/list`,
    ADD_CLIENT: `${userUrl}/clientFamily/addProfile`,
    DELETE_CLIENT: `${userUrl}/clientFamily/delete`,
    GET_CLIENT: `${userUrl}/admin/clientFamily/getProfile`,
    UPDATE_CLIENT: `${userUrl}/admin/clientFamily/updateProfile`,
    IMAGE_UPLOAD: `${userUrl}/upload/image`,
    IMAGE_DOWNLOAD: `${userUrl}/image/getBlob`,
    ADD_SEGMENT: `${userUrl}/segment/addSegment`,
    LIST_SEGMENT: `${userUrl}/segment/list`,
    GET_SEGMENT: `${userUrl}/segment/getSegment`,
    UPDATE_SEGMENT: `${userUrl}/segment/updateSegment`,
    DELETE_SEGMENT: `${userUrl}/segment/deleteSegment`,
    GET_REGISTER_FEE: `${userUrl}/registerSetting/get`,
    UPDATE_REGISTER_FEE: `${userUrl}/registerSetting/update`,
    NOTIFICATION_USER_LIST: `${userUrl}/authorizedPerson/list`,
    GET_USER: `${userUrl}/authorizedPerson/getProfileById`,
    APPROVE_USER: `${userUrl}/authorizedPerson/updateProfile`,
    LOGIN_COUNT : `${userUrl}/admin/loginCount`,
    LOGIN_ACTIVITY_REPORT_WEEK : `${userUrl}/admin/loginActivityReport?type=WEEK`,
    LOGIN_ACTIVITY_REPORT_MONTH : `${userUrl}/admin/loginActivityReport?type=MONTH`,
  },

  cms: {
    LIST_PRODUCTS: `${cms}/product-management/list`,
    ADD_PRODUCT: `${cms}/product-management/create`,

    ADD_PRODUCT_DETAILS: `${cms}/productCms/create`,
    UPDATE_PRODUCT_DETAILS: `${cms}/productCms/update`,
    GET_PRODUCT_DETAILS: `${cms}/productCms/get`,
    LIST_PRODUCT_DETAILS: `${cms}/productCms/list`,
    DELETE_PRODUCT_DETAILS: `${cms}/productCms/delete`,

    DELETE_CONTENT: `${cms}/content-management/delete`,
    LIST_CONTENT: `${cms}/content-management/list`,
    GET_CONTENT: `${cms}/content-management/get`,
    UPDATE_CONTENT: `${cms}/content-management/update`,
    ADD_CONTENT: `${cms}/content-management/create`,
    LIST_TEMPLATE: `${cms}/template-management/list`,
    ADD_TEMPLATE: `${cms}/template-management/create`,
    GET_TEMPLATE: `${cms}/template-management/get`,
    UPDATE_TEMPLATE: `${cms}/template-management/update`,
    DELETE_TEMPLATE: `${cms}/template-management/delete`,
    LIST_FAQ: `${cms}/faq-management/list`,
    ADD_FAQ: `${cms}/faq-management/create`,
    GET_FAQ: `${cms}/faq-management/get`,
    UPDATE_FAQ: `${cms}/faq-management/update`,
    DELETE_FAQ: `${cms}/faq-management/delete`,
    DELETE_PRODUCT: `${cms}/product-management/delete`,
    GET_PRODUCT: `${cms}/product-management/get`,
    UPDATE_PRODUCT: `${cms}/product-management/update`,
    GET_SITE_SETTING: `${cms}/siteSettings-management/get`,
    UPDATE_SITE_SETTING: `${cms}/siteSettings-management/update`,
    LIST_KNOWLEDGE: `${cms}/knowledgeCenter-management/list`,
    ADD_KNOWLEDGE: `${cms}/knowledgeCenter-management/create`,
    GET_KNOWLEDGE: `${cms}/knowledgeCenter-management/get`,
    UPDATE_KNOWLEDGE: `${cms}/knowledgeCenter-management/update`,
    DELETE_KNOWLEDGE: `${cms}/knowledgeCenter-management/delete`,
    LIST_FEEDBACK: `${cms}/feedback-management/list`,
    ADD_FEEDBACK: `${cms}/feedback-management/create`,
    GET_FEEDBACK: `${cms}/feedback-management/get`,
    DELETE_FEEDBACK: `${cms}/feedback-management/delete`,
    UPDATE_FEEDBACK: `${cms}/feedback-management/update`,
    LIST_CATEGORY: `${cms}/category-management/list`,
    CREATE_CATEGORY: `${cms}/category-management/create`,
    LIST_SUB_CATEGORY: `${cms}/sub-category-management/list`,
    CREATE_SUB_CATEGORY: `${cms}/sub-category-management/create`,
  },
  communication: {
    NOTIFICATION_TEMPLATE_LIST: `${communicationUrl}/notificationTemplate-management/list`,
    NOTIFICATION_TEMPLATE_CREATE: `${communicationUrl}/notificationTemplate-management/create`,
    NOTIFICATION_TEMPLATE_GET: `${communicationUrl}/notificationTemplate-management/get`,
    NOTIFICATION_TEMPLATE_DELETE: `${communicationUrl}/notificationTemplate-management/delete`,
    NOTIFICATION_TEMPLATE_UPDATE: `${communicationUrl}/notificationTemplate-management/update`,
    NOTIFICATION_HISTORY_LIST: `${communicationUrl}/notification-management/list`,
    NOTIFICATION_HISTORY_CREATE: `${communicationUrl}/notification-management/create`,
    NOTIFICATION_HISTORY_GET: `${communicationUrl}/notification-management/get`,
    NOTIFICATION_HISTORY_DELETE: `${communicationUrl}/notification-management/delete`,
    NOTIFICATION_HISTORY_UPDATE: `${communicationUrl}/notification-management/update`,
  },
  calendar: {
    CALENDAR_EVENT_CREATE: `${CalendarUrl}/schedule/create`,
    CALENDAR_EVENT_LIST: `${CalendarUrl}/schedule/list`,
    CALENDAR_EVENT_GET: `${CalendarUrl}/schedule/get`,
    CALENDAR_EVENT_DELETE: `${CalendarUrl}/schedule/delete`,
    CALENDAR_EVENT_UPDATE: `${CalendarUrl}/schedule/update`,
    NOTIFICATION_GET_LIST: `${CalendarUrl}-notification-management/list`,
    NOTIFICATION_UPDATE_LIST: `${CalendarUrl}-notification-management/update`,


  },
  lead:
  {
    LEAD_GET: `${lead}/leads/list`,
    DASHBOARD_DETAILS : `${lead}/korp/dashboardApStatusCount`,
  }
};
