import React from "react";
import cardStyle from "./card.module.css";

export default function Card() {
  return (
    <div className={cardStyle.card_box}>
      <div className={cardStyle.card_header}>
        <h1>Заказ номер: хуй пойми</h1>
      </div>
      <div className={cardStyle.status_card}>
        <div className="title">
          <p>Статус посылки</p>
        </div>
        <hr style={{ margin: "0.375rem 0" }} />
        <div className={cardStyle.box}>
          <div className={cardStyle.status_img}>
            <img src="" alt="" />
          </div>
          <div className={cardStyle.text_date}>
            <p className={cardStyle.text}>Дата регистрации клиентом</p>
            <p className={cardStyle.date}>25.12.2024 22:22</p>
          </div>
        </div>
        <hr style={{ margin: "0.375rem 0" }} />

        <div className={cardStyle.box}>
          <div className={cardStyle.status_img}>
            <img src="" alt="" />
          </div>
          <div className={cardStyle.text_date}>
            <p className={cardStyle.text}>Склад в Китае</p>
            <p className={cardStyle.date}>Нету данных</p>
          </div>
        </div>
        <hr style={{ margin: "0.375rem 0", borderColor: "#E5E7EB" }} />

        <div className={cardStyle.box}>
          <div className={cardStyle.status_img}>
            <img src="" alt="" />
          </div>
          <div className={cardStyle.text_date}>
            <p className={cardStyle.text}>Ош</p>
            <p className={cardStyle.date}>Нету данных</p>
          </div>
        </div>
        <hr style={{ margin: "0.375rem 0" }} />

        <div className={cardStyle.box}>
          <div className={cardStyle.status_img}>
            <img src="" alt="" />
          </div>
          <div className={cardStyle.text_date}>
            <p className={cardStyle.text}>Выдан клиенту</p>
            <p className={cardStyle.date}>Нету данных</p>
          </div>
        </div>
      </div>
    </div>
  );
}
