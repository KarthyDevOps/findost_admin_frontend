import { useEffect } from "react";

export const useClickOutSide = (ref, cb) => {
  useEffect(() => {
    handleEventListener("addEventListener");
    return () => {
      handleEventListener("removeEventListener");
    };
  }, []);

  const handleEventListener = (type) => {
    ["touchstart", "mousedown"].forEach((event) => {
      document[type](event, handleClickOutSide);
    });
  };

  const handleClickOutSide = (event) => {
    const { target } = event;
    if (ref.current && !ref.current.contains(target)) {
      cb();
    }
  };
};