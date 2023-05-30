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
    EDIT_STAFF: `${userUrl}/admin/getProfile`,
    DELETE_STAFF: `${userUrl}/admin/delete`,
    UPDATE_STAFF: `${userUrl}/admin/updateProfile`,
  },
  cms: {
    LIST_PRODUCTS: `${cms}/product-management/list`,
    ADD_PRODUCT: `${cms}/product-management/create`,
  },
};
