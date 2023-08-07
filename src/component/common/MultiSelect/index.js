import React, { useEffect, useMemo, useRef, useState } from "react";
// styles
import styles from "./MultiSelect.module.scss";
// internal Components
import { SearchInput } from "component/common/SearchInput/index";
import { NewLoader } from "component/common/Loader/NewLoader";
import { useClickOutSide } from "hooks";
// helpers
import { debounce } from "helpers/index";

const MultiSelect = ({
  options: propsOptions,
  subOptions: subPropsOptions,
  placeholder = "Search",
  btnLabel = "",
  plusSymbol = true,
  dropDownSymbol = "Search",
  toggle,
  onSearch = () => {
    return null;
  },
  onChange = () => {
    return null;
  },
  setValue = () => {
    return null;
  },
  id = null,
  setLabel = () => {
    return null;
  },
  defaultValue,
  catId = "",
  subCatId = "",
  userIds = [],
  isMulti,
  isLoading = false,
}) => {
  const searchRef = useRef();
  let [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState(propsOptions || []);
  const [subOptions, setSubOptions] = useState(subPropsOptions || []);

  useClickOutSide(searchRef, () => setIsOpen(false));

  const handleChange = ({ target: { value } }) => {
    let str = String(value)
      .trim()
      .toLowerCase();
    onSearch(value);
    str.length === 0 && !isMulti && setValue("");
  };

  const handleCustomer = (name) => {
    onChange(name);
    if (typeof name !== "undefined") {
      document.getElementById(id).value = isMulti ? "" : name;
      if (!isMulti) setLabel(name);
      else onSearch("");
    } else {
      document.getElementById(id).value = "";
    }
    setIsOpen(false);
  };

  const handleCustomerSub = (name) => {
    onChange(name);
    if (typeof name !== "undefined") {
      document.getElementById(id).value = isMulti ? "" : name;
      if (!isMulti) setLabel(name);
      else onSearch("");
    } else {
      document.getElementById(id).value = "";
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (propsOptions) {
      let temp = propsOptions;
      if (catId?.length > 0) {
        temp = temp?.find((opt) => catId === opt._id);
        handleCustomer(temp?.name);
      } else {
        handleCustomer("");
      }
      setOptions(propsOptions);
    }
  }, [propsOptions]);

  useEffect(() => {
    if (subPropsOptions) {
      let sample = subPropsOptions;
      if (subCatId?.length > 0) {
        sample = sample?.find((opt) => subCatId === opt._id);
        handleCustomerSub(sample?.name);
      } else {
        handleCustomerSub("");
      }
      setSubOptions(subPropsOptions);
    }
  }, [subPropsOptions]);

  return (
    <div className={styles.search_container} ref={searchRef}>
      <SearchInput
        id={id}
        placeholder={placeholder}
        onChange={debounce(handleChange, 300)}
        onFocus={() => setIsOpen(true)}
        dropDownSymbol={dropDownSymbol}
        defaultValue={defaultValue}
      />
      {isOpen && (
        <div className={styles.search_box}>
          {isLoading ? (
            <div className="d-flex justify-content-center w-100">
              <NewLoader size="sm" />
            </div>
          ) : propsOptions ? (
            <ul>
              {options?.length > 0 ? (
                options.map((category, index) => {
                  return (
                    <>
                      <li
                        key={index}
                        onClick={() => handleCustomer(category.name)}
                      >
                        {category.name}
                      </li>
                    </>
                  );
                })
              ) : (
                <div className="no-record py-1">
                  <span>No Records Found</span>
                </div>
              )}
            </ul>
          ) : (
            <ul>
              {subOptions?.length > 0 ? (
                subOptions.map((category, index) => {
                  return (
                    <>
                      <li
                        key={index}
                        onClick={() => handleCustomerSub(category.name)}
                      >
                        {category.name}
                      </li>
                    </>
                  );
                })
              ) : (
                <div className="no-record py-1">
                  <span>No Records Found</span>
                </div>
              )}
            </ul>
          )}
          {plusSymbol && (
            <div className={styles.btn_customer} onClick={toggle}>
              <i style={{ marginLeft: "8px" }} className="fas fa-plus"></i>
              <u>{btnLabel}</u>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
