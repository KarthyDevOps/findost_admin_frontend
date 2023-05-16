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
        component: "AddStaffManagement",
        path: "/add-staff",
        componentPath: "pages/Dashboard/StaffManagement/AddStaffManagement",
        name: "AddStaffManagement",
        auth: false,
        exact: true,
      },
      {
        component: "NotificationManagement",
        path: "/notification-management",
        componentPath: "pages/Dashboard/NotificationManagement/NotificationManagement",
        name: "NotificationManagement",
        auth: false,
        exact: true,
      },
      {
        component: "CreateNotification",
        path: "/create-notification",
        componentPath: "pages/Dashboard/NotificationManagement/CreateNotification",
        name: "CreateNotification",
        auth: false,
        exact: true,
      },
      {
        component: "SendNotification",
        path: "/send-notification",
        componentPath: "pages/Dashboard/NotificationManagement/SendNotification",
        name: "SendNotification",
        auth: false,
        exact: true,
      },
    ],
  },
];
export default routers;
