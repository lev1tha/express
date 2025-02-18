import React from "react";
import headerStyle from "./header.module.css";

export default function Header() {
  return (
    <div className={headerStyle.header_container}>
      <div className={headerStyle.header_inner}>
        <div className={headerStyle.logo}>
          <img src="./png/logo.png" alt="logotype" />
        </div>
        <div className={headerStyle.navigate}>
          <span className={headerStyle.text}>Bat</span>
          <span className={headerStyle.exit}>Выход</span>
        </div>
      </div>
    </div>
  );
}
