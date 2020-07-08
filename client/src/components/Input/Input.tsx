import React, { forwardRef } from "react";

import styles from "./Input.module.scss";

interface Props {
  label: string;
  name: string;
  type: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, name, type, error }, ref) => {
    return (
      <div className={styles.input__container}>
        <input
          id={label}
          className={`${styles.input} ${
            error ? styles.input__error_border : ""
          }`}
          type={type}
          name={name}
          ref={ref}
          placeholder=" "
        />
        <label htmlFor={label} className={styles.input__label}>
          {label}
        </label>
        {error ? (
          <span className={styles.input__error_message}>{error}</span>
        ) : null}
      </div>
    );
  }
);
