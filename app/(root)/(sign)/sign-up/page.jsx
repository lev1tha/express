"use client";
import { useState, useEffect } from "react";
import Sign from "../sign.module.css";
import SignUpStyle from "./signup.module.css";
import Link from "next/link";
import Selector from "../../../../components/selector/Selector";
import { $api, setToken } from "../../../../axios/api";
import { useRouter } from "next/navigation";

export default function SignUp() {
  // Форма для заполнение данных
  const [formData, setFormData] = useState({
    phone: "+996",
    password: "",
    store: null,
    nameUser: "",
    surnameUser: "",
  });

  const route = useRouter();
  const [errors, setErrors] = useState({});
  const [options, setOptions] = useState([]);

  // #TODO - обычное получение списка складов, использовал асинхронную функцию для быстрого получение списка складов
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await $api.get("store/");
        const storeOptions = response.data.map((store) => ({
          id: store.id,
          label: store.name,
        }));
        setOptions(storeOptions);
      } catch (error) {
        console.error("Ошибка при получении списка складов:", error);
      }
    };

    fetchStores();
  }, []);

  // #TODO - изменение свойств обьекта при изменение инпута
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const updatedValue =
      name === "phone" && !value.startsWith("+996")
        ? "+996" + value.replace(/^\+996/, "")
        : value;

    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSelectorChange = (selectedId) => {
    setFormData((prev) => ({ ...prev, store: selectedId }));
    setErrors((prev) => ({ ...prev, store: "" }));
  };

  // #TODO - тут данные который заполняются внутри инпутов
  const validateForm = () => {
    const newErrors = {};

    if (!formData.phone || formData.phone === "+996") {
      newErrors.phone = "Введите номер телефона.";
    }
    if (!formData.password) {
      newErrors.password = "Введите пароль.";
    }
    if (!formData.store) {
      newErrors.store = "Выберите склад.";
    }
    if (!formData.nameUser) {
      newErrors.nameUser = "Введите имя.";
    }
    if (!formData.surnameUser) {
      newErrors.surnameUser = "Введите фамилию.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // #TODO - отправление формы при нажатий кнопочки
  const onSubmit = () => {
    if (!validateForm()) return;

    $api
      .post("auth/register/", formData)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          const { token } = response.data;
          setToken(token);
          route.push("/");
        } else {
          alert("Не удалось выполнить регистрацию.");
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const serverErrors = error.response.data;
          const mappedErrors = {};

          Object.keys(serverErrors).forEach((key) => {
            if (Array.isArray(serverErrors[key])) {
              mappedErrors[key] = serverErrors[key][0];
            } else {
              mappedErrors[key] = serverErrors[key];
            }
          });

          setErrors(mappedErrors);
        } else {
          alert("Произошла ошибка при отправке данных.");
        }
      });
  };

  // #TODO - верстка, там легко <3
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
            name="phone"
            placeholder="+996"
            value={formData.phone}
            onChange={handleInputChange}
          />
          {errors.phone && (
            <p className={SignUpStyle.error_message}>{errors.phone}</p>
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
          {errors.store && (
            <p className={SignUpStyle.error_message}>{errors.store}</p>
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
            name="password"
            placeholder="Введите пароль"
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors.password && (
            <p className={SignUpStyle.error_message}>{errors.password}</p>
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
