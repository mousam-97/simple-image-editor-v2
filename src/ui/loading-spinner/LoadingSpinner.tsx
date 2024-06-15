import classNames from "classnames";
import styles from "./loading-spinner.module.css";

export enum LOADING_SPINNER_SIZE {
  SM = "sm",
  MD = "md",
  LG = "lg",
}

type Props = { size?: LOADING_SPINNER_SIZE };

export default function LoadingSpinner(props: Props) {
  const { size = LOADING_SPINNER_SIZE.MD } = props;

  const classes = classNames(
    styles["loading-spinner"],
    styles[`loading-spinner--size-${size}`]
  );
  return <div className={classes} />;
}
