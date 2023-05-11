import React, { useState, useEffect } from "react";

import CheckBox from "./CheckBox";
import Icon from "../Icons";

const CheckBoxes = props => {
  const initialState = props?.options?.map(option => {
    if (props.multiselect && props?.value?.includes(option.value))
      return { ...option, status: true };
    else if (props.value === option.value) {
      return { ...option, status: true };
    }
    return option;
  });
  const [checkBoxstatus, setCheckBoxStatus] = useState(initialState || []);

  useEffect(() => {
    setCheckBoxStatus(initialState);
  }, [props?.options?.[0]?.status, props.value]);

  function onClickHandler(value) {
    const data = checkBoxstatus.map(checkbox => {
      if (value === checkbox.value && (!checkbox.status || props.multiselect)) {
        return { ...checkbox, status: !checkbox.status };
      } else if (value !== checkbox.value) {
        if (props.multiselect) return checkbox;
        return { ...checkbox, status: false };
      } else {
        return checkbox;
      }
    });
    setCheckBoxStatus(data);

    if (props.multiselect) {
      const checkbox = data
        .filter(checkbox => checkbox.status == true)
        ?.map(checkbox =>
          ![undefined, null].includes(checkbox.value) ? checkbox.value : null
        );
      props.onSetValues({
        type: "set",
        name: props.name,
        value: checkbox?.length > 0 ? checkbox : null,
        parent: props?.parent,
        subparent: props?.subparent,
        ailment: props?.ailment,
        isChanged: true,
      });
    } else {
      const checkbox = data.find(checkbox => checkbox.value == value);
      if (checkbox)
        props.onSetValues({
          type: "set",
          name: props.name,
          value: checkbox?.value,
          parent: props?.parent,
          ailment: props?.ailment,
          isChanged: true,
        });
    }
    props?.onFocus && props.onFocus();
  }

  return (
    <>
      {checkBoxstatus.length > 0 &&
        checkBoxstatus.map(checkbox => {
          return (
            <>
              <CheckBox
                key={checkbox?.value}
                {...checkbox}
                onClick={onClickHandler.bind(null, checkbox.value)}
                isStroke={!!checkbox.isStroke}
              >
                {checkbox?.icon ? (
                  <Icon icon={checkbox.icon} />
                ) : (
                  <span>{checkbox.label}</span>
                )}
              </CheckBox>
            </>
          );
        })}
    </>
  );
};

export default CheckBoxes;
