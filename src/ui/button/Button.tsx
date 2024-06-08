import React from "react";
import styles from "./button.module.css";
import classNames from "classnames";

export enum BUTTON_STYLE {
  PRIMARY = "primary",
  SECONDARY = "primary",
}

type Props = {
  children: React.ReactNode;
  type?: BUTTON_STYLE;
  onClick: () => void;
};

export default function Button(props: Props) {
  const { children, type = BUTTON_STYLE.PRIMARY, onClick, ...rest } = props;

  const classes = classNames(styles.button, styles[`button--style-${type}`]);
  return (
    <button onClick={onClick} className={classes} {...rest}>
      {children}
    </button>
  );
}
