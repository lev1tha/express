"use client";
import { useState, useEffect } from "react";
import Header from "../../../widgets/header/Header";
import homeStyle from "./home.module.css";
import Link from "next/link";
import Card from "../../../components/card/Card";
import Footer from "../../../widgets/footer/Footer";
import { useRouter } from "next/navigation";
import Modal from "../../../components/modal/Modal";
import { $api } from "../../../axios/api";

export default function Home() {
  const [stateModal, setStateModal] = useState(false);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    setToken(storedToken);

    if (!storedToken) {
      router.push("/sign-in");
    }
  }, [router]);

  useEffect(() => {
    $api.get("track/").then((request) => {
      console.log(request.data);
    });
  }, []);

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
