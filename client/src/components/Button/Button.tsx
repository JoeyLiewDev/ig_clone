import React, { ReactNode } from "react";

import styles from "./Button.module.scss";

interface Props {
  onClick?: () => void;
  children: ReactNode;
}

export const Button = ({ onClick, children }: Props) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};
