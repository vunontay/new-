import { forwardRef } from "react";
import "./textfield.css";
const Textfield = forwardRef(
  ({ className, type = "text", icon, ...props }, ref) => {
    return (
      <div className={`textfield-container ${className}`}>
        {icon && <span className="textfield-icon">{icon}</span>}
        <input type={type} className="textfield" ref={ref} {...props} />
      </div>
    );
  },
);

Textfield.displayName = "Textfield";

export { Textfield };
