const routers = [
  {
    path: "/",
    redirect: "/auth",
  },
  {
    component: "AuthLayout",
    path: "/auth",
    auth: false,
    name: "Auth",
    exact: false,
    redirect: "/auth/login",
    childrens: [
      {
        component: "Login",
        path: "/login",
        componentPath: "pages/Auth/Login",
        name: "Login",
        auth: false,
        exact: true,
      },
      {
        component: "ForgetPassword",
        path: "/forget",
        componentPath: "pages/Auth/ForgetPassword",
        name: "ForgetPassword",
        auth: false,
        exact: true,
      },
      // {
      //   component: "Login",
      //   path: "/login",
      //   componentPath: "pages/Auth/Login",
      //   name: "Login",
      //   auth: false,
      //   exact: true,
      // },
    ],
  },
  {
    component: "MainLayout",
    path: "/admin",
    auth: false,
    name: "Dashboard",
    exact: false,
    redirect: "/admin/dashboard",
    childrens: [
      // DASHBOARD
      {
        component: "Dashboard",
        path: "/dashboard",
        componentPath: "pages/Dashboard/InitDashboard/Dashboard",
        name: "Dashboard",
        auth: false,
        exact: true,
      },
      {
        component: "StaffManagement",
        path: "/staff-management",
        componentPath: "pages/Dashboard/StaffManagement/StaffManagement",
        name: "StaffManagement",
        auth: false,
        exact: true,
      },
      {
        component: "ProductManagement",
        path: "/product-management",
        componentPath: "pages/Dashboard/ProductManagement/ProductManagement",
        name: "ProductManagement",
        auth: false,
        exact: true,
      },
      {
        component: "AddProduct",
        path: "/add-product",
        componentPath: "pages/Dashboard/ProductManagement/AddProduct",
        name: "AddProduct",
        auth: false,
        exact: true,
      },
    ],
  },
];
export default routers;
