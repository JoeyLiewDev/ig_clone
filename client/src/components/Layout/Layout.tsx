import React from "react";
import { ReactNode } from "react";

import styles from "./Layout.module.scss";
import { Header } from "../Header";
import { Footer } from "../Footer";

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};
