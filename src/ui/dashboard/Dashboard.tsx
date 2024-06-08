import styles from "./dashboard.module.css";

import React from "react";

type DashBoardLeftPanelProps = {
  children: React.ReactNode;
};

export function DashBoardLeftPanel(props: DashBoardLeftPanelProps) {
  const { children } = props;
  return <div className={styles["dashboard__left-panel"]}>{children}</div>;
}

type DashBoardRightPanelProps = {
  children: React.ReactNode;
};

export function DashBoardRightPanel(props: DashBoardRightPanelProps) {
  const { children } = props;
  return <div className={styles["dashboard__right-panel"]}>{children}</div>;
}

type Props = { children: React.ReactNode };

export default function Dashboard(props: Props) {
  const { children } = props;
  return <div className={styles["dashboard"]}>{children}</div>;
}
