'use client'
import React from "react";
import styles from "./ButtonBar.module.css";

interface ButtonBarProps {
  onSend: () => void;
  onCancel: () => void;
  onSave: () => void;
}

const ButtonBar: React.FC<ButtonBarProps> = ({ onSend, onCancel, onSave }) => {
  return (
    <div className={styles.buttonBar}>
      <button className={styles.button} onClick={onSend}>
        Versenden
      </button>
      <button className={styles.button} onClick={onCancel}>
        Abbrechen
      </button>
      <button className={styles.button} onClick={onSave}>
        Speichern
      </button>
    </div>
  );
};

export default ButtonBar;