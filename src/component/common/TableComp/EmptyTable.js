import React from "react";
// styles
import "./style.scss";

const EmptyTable = (props) => {
  const { EditAction, DeleteAction, ReadAction, includedKeys } = props;
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {DeleteAction && (
              <th className="checkBox_place">
                <input
                  type="checkbox"
                  //   onChange={handleSelectAll}
                  //   checked={selectedRows.length === data.length}
                  className="check_box cursor-pointer"
                />
              </th>
            )}
            {includedKeys.map((key) => {
              return (
                <>
                  <th
                    className=""
                    key={key}
                    style={{ ...(key?.width ? { width: key?.width } : {}) }}
                  >
                    {key.label}
                  </th>
                </>
              );
            })}

            {(DeleteAction || ReadAction || EditAction) && (
              <th className="action_place"> Actions</th>
            )}
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default EmptyTable;
