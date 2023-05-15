// import React, { useState, useEffect } from "react";
// import TableComp from "component/common/Table/TableComp";
// import axios from "axios";

// const StaffManagementComp = () => {
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "https://jsonplaceholder.typicode.com/posts"
//         );
//         setData(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, []);
//   return (
//     <div className="px-2">
//       <TableComp data={data} itemsPerPage={10} />
//     </div>
//   );
// };

// export default StaffManagementComp;
