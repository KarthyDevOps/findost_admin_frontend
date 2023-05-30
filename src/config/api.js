// DEVELOPMENT

export const baseURL = "http://doodlebluelive.com";
export const userUrl = `${baseURL}:2277/user/api/v1`;
export const communicationUrl = `${baseURL}:2275/communication/v1`;
export const cms = `${baseURL}:2274/cms/v1`;

//PRE PRODUCTION

export const endpoints = {
  auth: {
    LOGIN_USER: `${userUrl}/admin/login`,
    GET_sTAFF: `${userUrl}/admin/list`,
    ADD_STAFF: `${userUrl}/admin/addProfile`,
  },

  cms: {
    LIST_PRODUCTS: `${cms}/product-management/list`,
    LIST_CONTENT: `${cms}/content-management/list`,
  },
};
