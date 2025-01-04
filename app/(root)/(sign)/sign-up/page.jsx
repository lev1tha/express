"use client";
import { useState } from "react";
import Sign from "../sign.module.css";
import SignUpStyle from "./signup.module.css";
import Link from "next/link";
import Selector from "../../../../components/selector/Selector";

export default function SignUp() {
  const [formData, setFormData] = useState({
    numberUser: "+996",
    passwordUser: "",
    warehouse: "",
    nameUser: "",
    surnameUser: "",
  });

  const [errors, setErrors] = useState({});

  const options = ["Ош", "Баткен", "Чуй", "Склад Москва"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Автоматическая вставка +996 для номера телефона
    const updatedValue =
      name === "numberUser" && !value.startsWith("+996")
        ? "+996" + value.replace(/^\+996/, "")
        : value;

    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Убираем ошибку при вводе
  };

  const handleSelectorChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, warehouse: selectedOption }));
    setErrors((prev) => ({ ...prev, warehouse: "" })); // Убираем ошибку при выборе склада
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.numberUser || formData.numberUser === "+996") {
      newErrors.numberUser = "Введите номер телефона.";
    }
    if (!formData.passwordUser) {
      newErrors.passwordUser = "Введите пароль.";
    }
    if (!formData.warehouse) {
      newErrors.warehouse = "Выберите склад.";
    }
    if (!formData.nameUser) {
      newErrors.nameUser = "Введите имя.";
    }
    if (!formData.surnameUser) {
      newErrors.surnameUser = "Введите фамилию.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Возвращает true, если нет ошибок
  };

  const onSubmit = () => {
    if (!validateForm()) return;

    // Пример отправки данных на сервер
    console.log("Данные формы:", formData);

    // Очистка полей после успешной отправки
    setFormData({
      numberUser: "+996",
      passwordUser: "",
      warehouse: "",
      nameUser: "",
      surnameUser: "",
    });
  };

  return (
    <div className={Sign.container_sign}>
      <div className={SignUpStyle.logo}>
        <img src="./png/logo.png" alt="Logotype" />
      </div>
      <div className={SignUpStyle.form}>
        {/* Номер телефона */}
        <div className={SignUpStyle.formGroup}>
          <p>Номер</p>
          <input
            type="text"
            name="numberUser"
            placeholder="+996"
            value={formData.numberUser}
            onChange={handleInputChange}
          />
          {errors.numberUser && (
            <p className={SignUpStyle.error_message}>{errors.numberUser}</p>
          )}
        </div>

        {/* Селектор для склада */}
        <div className={SignUpStyle.formGroup}>
          <p>Выберите склад</p>
          <Selector
            options={options}
            placeholder="Выберите склад"
            onSelect={handleSelectorChange}
          />
          {errors.warehouse && (
            <p className={SignUpStyle.error_message}>{errors.warehouse}</p>
          )}
        </div>

        {/* Имя */}
        <div className={SignUpStyle.formGroup}>
          <p>Имя</p>
          <input
            type="text"
            name="nameUser"
            placeholder="Ваше имя"
            value={formData.nameUser}
            onChange={handleInputChange}
          />
          {errors.nameUser && (
            <p className={SignUpStyle.error_message}>{errors.nameUser}</p>
          )}
        </div>

        {/* Фамилия */}
        <div className={SignUpStyle.formGroup}>
          <p>Фамилия</p>
          <input
            type="text"
            name="surnameUser"
            placeholder="Ваша фамилия"
            value={formData.surnameUser}
            onChange={handleInputChange}
          />
          {errors.surnameUser && (
            <p className={SignUpStyle.error_message}>{errors.surnameUser}</p>
          )}
        </div>

        {/* Пароль */}
        <div className={SignUpStyle.formGroup}>
          <p>Пароль</p>
          <input
            type="password"
            name="passwordUser"
            placeholder="Введите пароль"
            value={formData.passwordUser}
            onChange={handleInputChange}
          />
          {errors.passwordUser && (
            <p className={SignUpStyle.error_message}>{errors.passwordUser}</p>
          )}
        </div>

        <div className={SignUpStyle.btn_send_form}>
          <button onClick={onSubmit}>Зарегистрироваться</button>
        </div>
        <div className={SignUpStyle.signup}>
          <span>У меня уже есть аккаунт</span> {""}
          <Link href={"/sign-in"}>Войти</Link>
        </div>
      </div>
    </div>
  );
}
