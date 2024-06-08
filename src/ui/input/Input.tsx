import classNames from "classnames";
import styles from "./input.module.css";

import React from "react";
import { Row, Space } from "../grid/Grid";

type InputProps = {
  type: string;
  defaultValue?: string | number;
  value?: string | number;
  name: string;
  placeHolder?: string;
  className?: string;
};

export default function Input(props: InputProps) {
  const { type, defaultValue, value, name, placeHolder, className } = props;

  const classes = classNames(styles.input, className);

  return (
    <input
      className={classes}
      type={type}
      defaultValue={defaultValue}
      value={value}
      name={name}
      placeholder={placeHolder}
    />
  );
}

type RangeInputProps = {
  defaultValue?: string | number;
  value?: string | number;
  name: string;
  placeHolder?: string;
};

export function RangeInput(props: RangeInputProps) {
  const { defaultValue, value, name, placeHolder } = props;

  return (
    <div className={styles["range-input"]}>
      <Row spaceBetween>
        <div className={styles["range-input__label"]}>{name}</div>
        <div className={styles["range-input__value"]}>{value}</div>
      </Row>
      <Space vertical size={8} />
      <Input type="range" {...props} className={styles["range-input__input"]} />
    </div>
  );
}
