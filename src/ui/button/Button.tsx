import React from "react";
import styles from "./button.module.css";
import classNames from "classnames";
import LoadingSpinner, { LOADING_SPINNER_SIZE } from "../loading-spinner/LoadingSpinner";

export enum BUTTON_STYLE {
  PRIMARY = "primary",
  SECONDARY = "primary",
  RESET = "reset",
}

type Props = {
  children: React.ReactNode;
  type?: BUTTON_STYLE;
  onClick: () => void;
  isLoading?: boolean;
};

export default function Button(props: Props) {
  const { children, type = BUTTON_STYLE.PRIMARY, onClick,isLoading, ...buttonProps } = props;

  const classes = classNames(styles.button, styles[`button--style-${type}`]);
  return (
    <button onClick={onClick} className={classes} {...buttonProps}>
      {isLoading ? <LoadingSpinner size={LOADING_SPINNER_SIZE.SM}/>:children}
    </button>
  );
}
