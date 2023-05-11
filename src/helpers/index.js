import { createStore, applyMiddleware } from "redux";
import { reducers } from "../reducer";
import thunk from "redux-thunk";
import routers from "routes/routes";
import { Toast } from "service/toast";
import moment from "moment";

import CryptoJS from "crypto-js";

export const store = createStore(
  reducers,
  applyMiddleware(thunk.withExtraArgument({ Toast }))
);
export const history = require("history").createBrowserHistory({});

let routerCache = {},
  timer;

export const pageNavigationByName = (locationDetails) => {
  let { name: locationName, params = "", ...rest } = locationDetails;

  let pathname = "";

  let locationProps = rest || {};

  if (routerCache.hasOwnProperty(locationName)) {
    pathname = routerCache[locationName];
  } else {
    for (let i = 0; i < routers.length; i++) {
      let { name = "", childrens = [], path: parentPath } = routers[i];

      if (name === locationName) {
        pathname = parentPath;
        routerCache[locationName] = parentPath;
        break;
      } else {
        for (let j = 0; j < childrens.length; j++) {
          let { name = "", path = "" } = childrens[j];

          if (name === locationName) {
            let fullPath = `${parentPath}${path}`;
            pathname = fullPath;
            routerCache[locationName] = fullPath;
            break;
          }
        }
      }

      if (pathname) break;
    }
  }

  if (params) {
    pathname = Object.keys(params).reduce((acc, keyName) => {
      return acc.replace(`:${keyName}`, params[keyName]);
    }, pathname);
  }

  history.push({ pathname, ...locationProps });
};

export const getMonth = (month) => {
  switch (month) {
    case "Jan":
      return 0;
    case "Feb":
      return 1;
    case "Mar":
      return 2;
    case "Apr":
      return 3;
    case "May":
      return 4;
    case "Jun":
      return 5;
    case "Jul":
      return 6;
    case "Aug":
      return 7;
    case "Sep":
      return 8;
    case "Oct":
      return 9;
    case "Nov":
      return 10;
    case "Dec":
      return 11;
    default:
      return 1;
  }
};

export const dateDiff = (orderStartDate, orderEndDate = false) => {
  let finalValue;

  let currentDate = moment([
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
  ]);

  let startDate = moment([
    String(orderStartDate).split(",")[0].split(" ")[2],
    getMonth(String(orderStartDate).split(",")[0].split(" ")[1]),
    String(orderStartDate).split("th")[0],
  ]);

  let endDate = moment([
    String(orderEndDate).split(",")[0].split(" ")[2],
    getMonth(String(orderEndDate).split(",")[0].split(" ")[1]),
    String(orderEndDate).split("th")[0],
  ]);

  if (orderEndDate) {
    finalValue = endDate.diff(startDate, "days");
  } else {
    finalValue = currentDate.diff(startDate, "days");
  }

  return finalValue > 1 ? `${finalValue} days` : `${finalValue} day`;
};

export const isGeneralImage = (data) => {
  let urls = [];
  data.items.map((list) => {
    list.imgUrls.map((url) => {
      urls.push(url);
    });
  });
  let isGeneral = urls.some((list) => {
    return String(list).includes("General+New");
  });
  return isGeneral ? "Yes" : "No";
};

export const timeConvert = (time) => {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(""); // return adjusted time or original string
};

export const debounce = (func, setLoading, timeout = 500) =>
  (...args) => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      typeof setLoading === "function" && setLoading(true);
      await func(...args);
      typeof setLoading === "function" && setLoading(false);
    }, [timeout]);
  };

export const debounceFunction = (fn, delay) => {
  let timeoutID;
  return (...args) => {
    if (timeoutID) clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export const downloadFile = ({ url }) => {
  if (!url) return;

  const aTag = document.createElement("a");
  aTag.href = url;
  aTag.click();
};

export function capitalizeLetter(string) {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getFirstLetter = (value) => {
  if (!value) return;
  if (Array.isArray(value)) {
    const filteredValue = value.filter(Boolean);
    let letter = "",
      lastIndex = value?.length - 1;

    if (filteredValue?.length <= 0) return;
    if (filteredValue[0]) letter += filteredValue[0]?.charAt(0)?.toUpperCase();
    if (lastIndex && filteredValue[lastIndex])
      letter += filteredValue[lastIndex]?.charAt(0)?.toUpperCase();

    return letter;
  }
  return value?.charAt(0).toUpperCase();
};

export const Encrypt = (plainText) => {
  if (!plainText) {
    return plainText;
  }
  try {
    var ciphertext = CryptoJS.AES.encrypt(
      plainText,
      "39ib92v7db292bbwqddhvsi73tw048dbi3h8hf4b9cib49"
    ).toString();

    return ciphertext;
  } catch (e) {
    console.log("Error in encryption", e);
    return plainText;
  }
};

export const navLink = [
  {
    to: "/admin/dashboard",
    label: "Dashboard",
    iconName: "",
    inactiveIcon: "",
    privilegesName: "dashboard",
  },
  {
    to: "/admin/patient-management",
    label: "Patient Management",
    iconName: "",
    inactiveIcon: "",
    privilegesName: "patientManagement",
  },
];