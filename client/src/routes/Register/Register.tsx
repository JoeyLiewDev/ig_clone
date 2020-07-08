import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";

import styles from "./Register.module.scss";
import { Input } from "../../components/Input";
import { registerValidation } from "../../utils/validations";
import { Button } from "../../components/Button";

type FormData = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

export const Register = () => {
  const { register, handleSubmit, errors } = useForm<FormData>({
    resolver: yupResolver(registerValidation),
    mode: "onBlur",
  });

  const onSubmit = (data: FormData) => {};

  return (
    <div className={styles.register__container}>
      <div className={styles.register}>
        <span className={styles.register__title}>Sign Up</span>
        <form
          className={styles.register__form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="text"
            label="Name"
            name="name"
            ref={register}
            error={errors.name?.message}
          />
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
          <Input
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            ref={register}
            error={errors.confirmPassword?.message}
          />
          <Button>Register</Button>
        </form>
      </div>
    </div>
  );
};
