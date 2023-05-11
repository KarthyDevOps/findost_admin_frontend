import React, { useState, useRef, useEffect } from "react";
import chevron_down from "assets/icons/chevron-down.svg";
import styles from "./Collapse.module.scss";

const Collapse = ({ collapseData }) => {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("accordion__icon");
  const content = useRef(null);

  const toggleAccordion = (i) => {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
    setRotateState(
      setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
    );
  };

  return (
    <div className={styles.accordion__section}>
      <>
        <button
          className={`${styles.accordion} ${setActive}`}
          onClick={toggleAccordion}
        >
          <div className="row">
          
            <div className="col-md-11 col-8 col-lg-11 pt-1 text-left">
              <span
                id="faq-links"
                className={styles.accordion__title}
                dangerouslySetInnerHTML={{
                  __html: collapseData.question,
                  // "Lorem Ipsum is simply dummy text of the printing and typesetting industry ?",
                }}
              ></span>
              <div
                ref={content}
                style={{ maxHeight: `${setHeight}` }}
                className={styles.accordion__content}
              >
                <div
                  className={styles.accordion__text}
                  dangerouslySetInnerHTML={{
                    __html: collapseData.answer,
                  }}
                />
              </div>
            </div>
            <div className="col-lg-1 col-1 text-center">
              <div className={styles.circleBox}>
                <img
                  src={chevron_down}
                  className={
                    setActive === "active"
                      ? styles.accordion__icon_rotate
                      : styles.accordion__icon
                  }
                />
              </div>
            </div>
          </div>
        </button>
      </>
    </div>
  );
};

export default Collapse;
