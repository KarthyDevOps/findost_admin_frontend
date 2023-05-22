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
      {
        component: "ResetPassword",
        path: "/resetpassword",
        componentPath: "pages/Auth/ResetPassword",
        name: "ResetPassword",
        auth: false,
        exact: true,
      },
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
        path: "/staff-management/add-staff",
        componentPath: "pages/Dashboard/StaffManagement/AddStaffManagement",
        name: "AddStaffManagement",
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

      // {
      //   component: "NotificationManagement",
      //   path: "/notification-management",
      //   componentPath:
      //     "pages/Dashboard/NotificationManagement/NotificationManagement",
      //   name: "NotificationManagement",
      //   auth: false,
      //   exact: true,
      // },
      {
        component: "AddProduct",
        path: "/add-product",
        componentPath: "pages/Dashboard/ProductManagement/AddProduct",
        name: "AddProduct",
        auth: false,
        exact: true,
      },
      // {
      //   component: "CreateNotification",
      //   path: "/create-notification",
      //   componentPath:
      //     "pages/Dashboard/NotificationManagement/CreateNotification",
      //   name: "CreateNotification",
      //   auth: false,
      //   exact: true,
      // },
      {
        component: "FeedbackManagement",
        path: "/feedback-management",
        componentPath: "pages/Dashboard/FeedbackManagement/FeedbackManagement",
        name: "FeedbackManagement",
        auth: false,
        exact: true,
      },
      {
        component: "AddFeedback",
        path: "/add-feedback",
        componentPath: "pages/Dashboard/FeedbackManagement/AddFeedback",
        name: "AddFeedback",
        auth: false,
        exact: true,
      },
      {
        component: "AnswerFeedback",
        path: "/answer-feedback",
        componentPath: "pages/Dashboard/FeedbackManagement/AnswerFeedback",
        name: "AnswerFeedback",
        auth: false,
        exact: true,
      },
     
      {
        component: "CreateNotification",
        path: "/create-notification",
        componentPath:
          "pages/Dashboard/NotificationManagement/CreateNotification",
        name: "CreateNotification",
        auth: false,
        exact: true,
      },
      {
        path: "/send-notification",
        componentPath:
          "pages/Dashboard/NotificationManagement/SendNotification",
        name: "SendNotification",
        auth: false,
        exact: true,
      },
      {
        component: "ContentManagement",
        path: "/content-Management",
        componentPath: "pages/Dashboard/ContentManagement/ContentManagement",
        name: "ContentManagement",
        auth: false,
        exact: true,
      },
      {
        component: "EditContentManagement",
        path: "/editcontent-Management",
        componentPath: "pages/Dashboard/ContentManagement/EditContentManagement",
        name: "EditContentManagement",
        auth: false,
        exact: true,
      },
      {
        component: "FaqManagement",
        path: "/faq-management",
        componentPath: "pages/Dashboard/FaqManagement/FaqManagement",
        name: "FaqManagement",
        auth: false,
        exact: true,
      },
      {
        component: "AddFaq",
        path: "/add-faq",
        componentPath: "pages/Dashboard/FaqManagement/AddFaq",
        name: "AddFaq",
        auth: false,
        exact: true,
      },
      {
        component: "KnowledgeCenter",
        path: "/knowledge-center",
        componentPath:
          "pages/Dashboard/KnowledgeCenter/KnowledgeCenter",
        name: "KnowledgeCenter",
        auth: false,
        exact: true,
      },
      {
        component: "ContentManagement",
        path: "/content-Management",
        componentPath: "pages/Dashboard/ContentManagement/ContentManagement",
        name: "ContentManagement",
        auth: false,
        exact: true,
      },
      {
        component: "EditContentManagement",
        path: "/editcontent-Management",
        componentPath: "pages/Dashboard/ContentManagement/EditContentManagement",
        name: "EditContentManagement",
        auth: false,
        exact: true,
      },
      {
        component: "TemplateManagement",
        path: "/template-management",
        componentPath: "pages/Dashboard/TemplateManagement/TemplateManagement",
        name: "TemplateManagement",
        auth: false,
        exact: true,
      },
      {
        component: "AddTemplateManagement",
        path: "/add-template",
        componentPath: "pages/Dashboard/TemplateManagement/AddTemplateManagement",
        name: "AddTemplateManagement",
        auth: false,
        exact: true,
      },
      {
        component: "SiteSetting",
        path: "/site-settings",
        componentPath: "pages/Dashboard/SiteSetting/SiteSetting",
        name: "SiteSetting",
        auth: false,
        exact: true,
      },
      {
        component: "AddKnowledge",
        path: "/add-knowledge",
        componentPath:
          "pages/Dashboard/KnowledgeCenter/AddKnowledge",
        name: "AddKnowledge",
        auth: false,
        exact: true,
      },
      {
        component: "ClientsFamily",
        path: "/clients-family",
        componentPath:
          "pages/Dashboard/ClientsFamilyPage/ClientsFamilyPage",
        name: "ClientsFamily",
        auth: false,
        exact: true,
      },
      {
        component: "EditClientsFamily",
        path: "/edit-client",
        componentPath:
          "pages/Dashboard/ClientsFamilyPage/EditClientsFamily",
        name: "EditClientsFamily",
        auth: false,
        exact: true,
      },
    ],
  },
];
export default routers;
