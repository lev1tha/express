import React from "react";
import headerStyle from "./header.module.css";


export default function Header() {
  return (
    <div className={headerStyle.header_layout}>
      <div className={headerStyle.header_inner}>
        <div className={headerStyle.logo}>
          <img src="./png/logo.png" alt="" />
        </div>
        <div className={headerStyle.navigate}>
          <div className={headerStyle.plug}>Bat</div>
          <div className={headerStyle.exit_account}>Выход</div>
        </div>
      </div>
    </div>
  );
}
