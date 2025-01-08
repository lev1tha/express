"use client";
import React from "react";
import headerStyle from "./header.module.css";
import { removeToken } from "../../axios/api";
import { useRouter } from "next/navigation";

export default function Header() {
  const route = useRouter();

  const onClickRemove = () => {
    removeToken();
    route.push("/sign-in");
  };
  return (
    <div className={headerStyle.header_layout}>
      <div className={headerStyle.header_inner}>
        <div className={headerStyle.logo}>
          <img src="./png/logo.png" alt="" />
        </div>
        <div className={headerStyle.navigate}>
          <div className={headerStyle.plug}>Bat</div>
          <div className={headerStyle.exit_account} onClick={onClickRemove}>
            Выход
          </div>
        </div>
      </div>
    </div>
  );
}
