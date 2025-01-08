import React, { useState } from "react";
import styles from "./selector.module.css";

export default function Selector({
  options,
  placeholder = "Выберите значение",
  onSelect,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);

    if (onSelect) {
      onSelect(option.id);
    }
  };

  return (
    <div className={styles.selector}>
      <div className={styles.selectorHeader} onClick={toggleDropdown}>
        {selectedOption ? selectedOption.label : placeholder}
        <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <ul className={styles.selectorList}>
          {options.map((option) => (
            <li
              key={option.id}
              className={styles.selectorItem}
              onClick={() => selectOption(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
