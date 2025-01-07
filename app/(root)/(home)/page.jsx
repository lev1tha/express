import React from "react";
import Header from "../../../widgets/header/Header";
import homeStyle from "./home.module.css";
import Link from "next/link";
import Card from "../../../components/card/Card";
import Footer from "../../../widgets/footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <div className="container">
        <div className={homeStyle.btn_components}>
          <button className={homeStyle.add}>Добавить</button>
          <Link href={"/history"} className={homeStyle.history}>
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
    </>
  );
}
