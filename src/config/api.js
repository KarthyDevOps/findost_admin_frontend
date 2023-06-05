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
    GET_STAFF: `${userUrl}/admin/list`,
    ADD_STAFF: `${userUrl}/admin/addProfile`,
    EDIT_STAFF: `${userUrl}/admin/getProfile`,
    DELETE_STAFF: `${userUrl}/admin/delete`,
    UPDATE_STAFF: `${userUrl}/admin/updateProfile`,
  },

  cms: {
    LIST_PRODUCTS: `${cms}/product-management/list`,
    LIST_CONTENT: `${cms}/content-management/list`,
    ADD_PRODUCT: `${cms}/product-management/create`,
    DELETE_CONTENT: `${cms}/content-management/delete`,
    EDIT_CONTENT: `${cms}/content-management/get`,
    UPDATE_CONTENT: `${cms}/content-management/update`,
    LIST_TEMPLATE: `${cms}/template-management/list`,
    ADD_TEMPLATE: `${cms}/template-management/create`,
    EDIT_TEMPLATE: `${cms}/template-management/get`,
    UPDATE_TEMPLATE: `${cms}/template-management/update`,
    DELETE_TEMPLATE: `${cms}/template-management/delete`,
    LIST_FAQ: `${cms}/faq-management/list`,
    ADD_FAQ: `${cms}/faq-management/create`,
    EDIT_FAQ: `${cms}/faq-management/get`,
    UPDATE_FAQ: `${cms}/faq-management/update`,
    DELETE_FAQ: `${cms}/faq-management/delete`,
    DELETE_PRODUCT: `${cms}/product-management/delete`,
    EDIT_PRODUCT: `${cms}/product-management/get`,
    UPDATE_PRODUCT: `${cms}/product-management/update`,
  },
  communication: {
    NOTIFICATION_TEMPLATE_LIST: `${communicationUrl}/notificationTemplate-management/list`,
    NOTIFICATION_TEMPLATE_CREATE: `${communicationUrl}/notificationTemplate-management/create`,
    NOTIFICATION_TEMPLATE_GET: `${communicationUrl}/notificationTemplate-management/get`,
    NOTIFICATION_TEMPLATE_DELETE: `${communicationUrl}/notificationTemplate-management/delete`,
    NOTIFICATION_TEMPLATE_UPDATE: `${communicationUrl}/notificationTemplate-management/update`,
  },
};
