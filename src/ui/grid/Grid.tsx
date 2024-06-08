import classNames from "classnames";
import styles from "./grid.module.css";

type RowProps = {
  children: React.ReactNode;
  spaceBetween?: boolean;
  columnDirection?: boolean;
  center?: boolean;
  vCenter?: boolean;
  fullHeight?: boolean;
  wrap?: boolean;
  spaceAround?: boolean;
  cssStyle?: React.CSSProperties;
};

export function Row(props: RowProps) {
  const {
    children,
    spaceBetween,
    columnDirection,
    center,
    vCenter,
    fullHeight,
    cssStyle,
    wrap,
    spaceAround,
  } = props;

  const classes = classNames(styles.row, {
    [styles["row--space-between"]]: spaceBetween,
    [styles["row--column-direction"]]: columnDirection,
    [styles["row--center"]]: center,
    [styles["row--vertical-center"]]: vCenter,
    [styles["row--full-height"]]: fullHeight,
    [styles["row--wrap"]]: wrap,
    [styles["row--space-around"]]: spaceAround,
  });

  return (
    <div className={classes} style={cssStyle}>
      {children}
    </div>
  );
}

type SpaceProps = {
  children?: React.ReactNode;
  size?: 4 | 8 | 16 | 26 | 40;
  vertical?: boolean;
};

export function Space(props: SpaceProps) {
  const { children, size = 4, vertical } = props;

  if (children) {
    <div className={styles[`space__around--size-${size}`]}>{children}</div>;
  }

  const classes = classNames(styles.space, {
    [styles[`space--size-${size}`]]: !vertical,
    [styles[`space__vertical--size-${size}`]]: vertical,
  });

  return <div className={classes}>{children}</div>;
}
