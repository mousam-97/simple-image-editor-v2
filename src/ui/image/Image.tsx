import React from "react";
import styles from "./image.module.css";

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  cssStyles?: any;
};

export default function Image(props: Props) {
  const { src, alt, width, height, cssStyles } = props;
  return (
    <img className={styles.image} src={src} alt={alt} width={width} height={height} style={cssStyles} />
  );
}
