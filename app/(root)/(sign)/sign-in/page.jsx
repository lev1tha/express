"use client";
import { useState } from "react";
import SignInStyle from "./signIn.module.css";
import Sign from "../sign.module.css";
import Link from "next/link";
import { $api } from "../../../../axios/api";
import { useRouter, setToken } from "next/navigation";

export default function SignIn() {
  const [phone, setPhone] = useState("+996");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ phone: "", password: "" });
  const route = useRouter();

  const onNumberChange = (e) => {
    let value = e.target.value;

    if (!value.startsWith("+996")) {
      value = "+996" + value.replace(/^\+996/, "");
    }

    setPhone(value);
    setErrors((prev) => ({ ...prev, phone: "" }));
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prev) => ({ ...prev, password: "" }));
  };

  const onSubmit = async () => {
    const validationErrors = {};

    if (!phone || phone === "+996") {
      validationErrors.phone = "Введите номер телефона.";
    }

    if (!password) {
      validationErrors.password = "Введите пароль.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await $api.post("auth/login/", { phone, password });
      if (response.status === 200 || response.status === 201) {
        setPhone("+996");
        setPassword("");
        route.push("/");

        const { token } = response.data;
        setToken(token);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const serverErrors = error.response.data;

        const mappedErrors = {};
        if (serverErrors.phone) {
          mappedErrors.phone = serverErrors.phone[0];
        }
        if (serverErrors.password) {
          mappedErrors.password = serverErrors.password[0];
        }

        setErrors(mappedErrors);
      }
    }
  };

  return (
    <div className={Sign.container_sign}>
      <div className={SignInStyle.logo}>
        <img src="./png/logo.png" alt="Logotype" />
      </div>
      <div className={SignInStyle.form}>
        <div className={SignInStyle.numberUser}>
          <p>Номер</p>
          <input
            type="text"
            placeholder="+996"
            value={phone}
            onChange={onNumberChange}
          />
          {errors.phone && (
            <p className={SignInStyle.error_message}>{errors.phone}</p>
          )}
        </div>
        <div className={SignInStyle.password}>
          <p>Пароль</p>
          <input
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={onPasswordChange}
          />
          {errors.password && (
            <p className={SignInStyle.error_message}>{errors.password}</p>
          )}
        </div>
        <div className={SignInStyle.btn_send_form}>
          <button onClick={onSubmit}>Войти</button>
        </div>
        <div className={SignInStyle.signup}>
          <span>Если у вас нет аккаунта, то вы можете</span> {""}
          <Link href={"/sign-up"}>Зарегистрироваться</Link>
        </div>
      </div>
    </div>
  );
}
