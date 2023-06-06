// DEVELOPMENT

export const baseURL = "http://doodlebluelive.com";
export const userUrl = `${baseURL}:2277/user/api/v1`;
export const communicationUrl = `${baseURL}:2275/communication/v1`;
export const cms = `${baseURL}:2274/cms/v1`;

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
    LIST_CLIENT: `${userUrl}/admin/clientFamily/list`,
    ADD_CLIENT: `${userUrl}/admin/clientFamily/addProfile`,
    DELETE_CLIENT: `${userUrl}/admin/clientFamily/delete`,
    GET_CLIENT: `${userUrl}/admin/clientFamily/getProfile`,
    UPDATE_CLIENT: `${userUrl}/admin/clientFamily/updateProfile`,
  },

  cms: {
    LIST_PRODUCTS: `${cms}/product-management/list`,
    LIST_CONTENT: `${cms}/content-management/list`,
    ADD_PRODUCT: `${cms}/product-management/create`,
    DELETE_CONTENT: `${cms}/content-management/delete`,
    GET_CONTENT: `${cms}/content-management/get`,
    UPDATE_CONTENT: `${cms}/content-management/update`,
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
};
