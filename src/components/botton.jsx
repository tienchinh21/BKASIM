import { memo } from "react";
import "../css/editprofile.css"; // Import your CSS file here

function Button ({ text, icon, onClick }) {
  return (
    <button className="zmp-button" onClick={onClick}>
      {icon && <img src={icon} alt="icon" className="zmp-button-icon" />}
      {text}
    </button>
  );
}

export default memo(Button);