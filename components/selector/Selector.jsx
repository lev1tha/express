import React, { useState } from "react";
import styles from "./selector.module.css";

export default function Selector({
  options,
  placeholder = "Выберите значение",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.selector}>
      <div className={styles.selectorHeader} onClick={toggleDropdown}>
        {selectedOption ? selectedOption : placeholder}
        <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <ul className={styles.selectorList}>
          {options.map((option, index) => (
            <li
              key={index}
              className={styles.selectorItem}
              onClick={() => selectOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
