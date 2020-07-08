import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";

import styles from "./Login.module.scss";
import { Input } from "../../components/Input";
import { loginValidation } from "../../utils/validations";
import { Button } from "../../components/Button";
import { loginData } from "../../types/authentication";
import { loginAction } from "../../redux/authentication";

export const Login = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm<loginData>({
    resolver: yupResolver(loginValidation),
    mode: "onBlur",
  });

  const onSubmit = (data: loginData) => {
    dispatch(loginAction(data));
  };

  return (
    <div className={styles.login__container}>
      <div className={styles.login}>
        <span className={styles.login__title}>Log In</span>
        <form className={styles.login__form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            label="E-Mail"
            name="email"
            ref={register}
            error={errors.email?.message}
          />
          <Input
            type="password"
            label="Password"
            name="password"
            ref={register}
            error={errors.password?.message}
          />
          <Button>Log In</Button>
        </form>
      </div>
    </div>
  );
};
