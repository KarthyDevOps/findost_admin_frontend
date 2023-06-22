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
  userIds = [],
  isMulti,
  isLoading = false,
}) => {
  const searchRef = useRef();
  let [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState(propsOptions || []);

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
    document.getElementById(id).value = isMulti ? "" : name;
    if (!isMulti) setLabel(name);
    else onSearch("");
    setIsOpen(false);
  };

  useEffect(() => {
    if (propsOptions) {
      let temp = propsOptions;
      if (userIds?.length > 0) {
        temp = temp.filter((opt) => !userIds.includes(opt.value));
      }
      setOptions(temp);
    }
  }, [propsOptions, userIds]);

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
          ) : (
            <ul>
              {options?.length > 0 ? (
                options.map((category, index) => {
                  return (
                    <>
                    <li key={index} onClick={() => handleCustomer(category.name)}>
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
