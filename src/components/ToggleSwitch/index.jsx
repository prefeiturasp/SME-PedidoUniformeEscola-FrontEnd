import React from "react";
import "./style.scss";

export const ToggleSwitch = (props) => {
  const { texto, onClick, disabled } = props;
  return (
    <div className="toggle-switch">
      <span>{texto}</span>
      <label className="switch">
        <input type="checkbox" disabled={disabled} onClick={onClick} />
        <span className="slider round" />
      </label>
    </div>
  );
};
