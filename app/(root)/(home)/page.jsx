"use client";
import { useState } from "react";
import Header from "../../../widgets/header/Header";
import homeStyle from "./home.module.css";
import Link from "next/link";
import Card from "../../../components/card/Card";
import Footer from "../../../widgets/footer/Footer";
import { getToken } from "../../../axios/api";
import { useRouter } from "next/navigation";
import Modal from "../../../components/modal/Modal"; // Убедитесь, что этот импорт корректен.

export default function Home() {
  const [stateModal, setStateModal] = useState(false);
  const router = useRouter();
  const token = getToken();

  if (!token) {
    router.push("/sign-in");
  }

  const onClickChangeState = () => {
    setStateModal((prev) => !prev);
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className={homeStyle.btn_components}>
          <button className={homeStyle.add} onClick={onClickChangeState}>
            Добавить
          </button>
          <Link href={"/archive"} className={homeStyle.history}>
            Архив
          </Link>
        </div>
        <div className={homeStyle.search_params}>
          <input type="text" placeholder="Поиск" />
        </div>
        <div className={homeStyle.card_container}>
          <Card />
        </div>
        <Footer />
      </div>

      {/* Отображение модального окна */}
      {stateModal && <Modal state={stateModal} fState={setStateModal} />}
    </>
  );
}
