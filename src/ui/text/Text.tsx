import React from "react";
import styles from "./text.module.css";
import classNames from "classnames";

export enum TEXT_BOLDNESS {
  NORMAL = "normal",
  SEMI_BOLD = "semi-bold",
  BOLD = "bold",
}

type Props = {
  children: React.ReactNode;
  boldness?: TEXT_BOLDNESS;
  cssStyle?: any;
};

export default function Text(props: Props) {
  const {
    children,
    boldness = TEXT_BOLDNESS.NORMAL,
    cssStyle,
    ...rest
  } = props;

  const classes = classNames(styles.text, styles[`text--boldness-${boldness}`]);

  return (
    <p className={classes} style={cssStyle} {...rest}>
      {children}
    </p>
  );
}
