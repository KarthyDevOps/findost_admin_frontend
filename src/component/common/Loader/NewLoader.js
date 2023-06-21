// import React from "react";

// import styles from "./NewLoader.module.scss";

// export const NewLoader = ({ size = "" }) => {
//   return (
//     <div
//       className={${styles.loader} ${size !== "" ? styles[size] : ""}}
//     ></div>
//   );
// };

import React from "react";
import styles from "./NewLoader.module.scss";

export const NewLoader = ({ size = "" }) => {
  return (
    <div className={`${styles.loader} ${size !== "" ? styles[size] : ""}`}></div>
  );
};
