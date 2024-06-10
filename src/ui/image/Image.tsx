import React from "react";
import styles from "./image.module.css";

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  cssStyles?: any;
  onClick?: () => void;
};

export default function Image(props: Props) {
  const { src, alt, width, height, cssStyles, ...rest } = props;
  return (
    <img
      className={styles.image}
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={cssStyles}
      {...rest}
    />
  );
}
