"use client";
import { useState } from "react";
import SignInStyle from "./signIn.module.css";
import Sign from "../sign.module.css"
import Link from "next/link";

export default function SignIn() {
  const [numberUser, setNumberUser] = useState("+996");
  const [passwordUser, setPasswordUser] = useState("");
  const [errors, setErrors] = useState({ number: "", password: "" });

  const onNumberChange = (e) => {
    let value = e.target.value;

    if (!value.startsWith("+996")) {
      value = "+996" + value.replace(/^\+996/, "");
    }

    setNumberUser(value);
    setErrors((prev) => ({ ...prev, number: "" }));
  };

  const onPasswordChange = (e) => {
    setPasswordUser(e.target.value);
    setErrors((prev) => ({ ...prev, password: "" }));
  };

  const onSubmit = () => {
    let hasErrors = false;

    if (!numberUser || numberUser === "+996") {
      setErrors((prev) => ({ ...prev, number: "Введите номер телефона." }));
      hasErrors = true;
    }

    if (!passwordUser) {
      setErrors((prev) => ({ ...prev, password: "Введите пароль." }));
      hasErrors = true;
    }

    if (hasErrors) return;

    // Отправка данных (пример реализации)
    // Здесь может быть вызов API для отправки данных:
    // fetch('/api/signin', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ number: numberUser, password: passwordUser }),
    // })
    //   .then(response => response.json())
    //   .then(data => console.log('Ответ сервера:', data))
    //   .catch(error => console.error('Ошибка:', error));

    console.log("Номер:", numberUser, "Пароль:", passwordUser);

    setNumberUser("+996");
    setPasswordUser("");
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
            value={numberUser}
            onChange={onNumberChange}
          />
          {errors.number && (
            <p className={SignInStyle.error_message}>{errors.number}</p>
          )}
        </div>
        <div className={SignInStyle.passwordUser}>
          <p>Пароль</p>
          <input
            type="password"
            placeholder="Password"
            value={passwordUser}
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
