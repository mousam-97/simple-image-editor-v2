import classNames from "classnames";
import * as icons from "./svg-icons";
import styles from "./icon.module.css";

export enum ICON_SIZE {
  SM = "sm",
  MD = "md",
  LG = "lg",
}

type Props = { name: string; size: ICON_SIZE };

export default function Icon(props: Props) {
  const { name, size } = props;

  const classes = classNames(styles.icon, styles[`icon--size-${size}`]);


  return <div className={classes}>{icons[name]}</div>;
}
