import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.css";

const Button = ({
  color,
  hoverColor,
  pressedColor,
  disabledColor,
  borderColor,
  hoverBorderColor,
  pressedBorderColor,
  textColor,
  hoverTextColor,
  pressedTextColor,
  disabledTextColor,
  borderRadius,
  width,
  height,
  padding,
  fontFamily,
  fontSize, // Added fontSize prop
  fontWeight, // Added fontWeight prop
  children,
  disabled,
}) => {
  return (
    <button
      className={`${styles.button} ${disabled ? styles.disabled : ""}`}
      style={{
        backgroundColor: disabled ? disabledColor : color,
        borderColor: disabled ? disabledColor : borderColor,
        color: disabled ? disabledTextColor : textColor,
        width: width,
        height: height,
        borderRadius: borderRadius,
        padding: padding,
        fontFamily: fontFamily,
        fontSize: fontSize, // Applied fontSize
        fontWeight: fontWeight, // Applied fontWeight
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.target.style.backgroundColor = hoverColor;
          e.target.style.borderColor = hoverBorderColor;
          e.target.style.color = hoverTextColor;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.target.style.backgroundColor = color;
          e.target.style.borderColor = borderColor;
          e.target.style.color = textColor;
        }
      }}
      onMouseDown={(e) => {
        if (!disabled) {
          e.target.style.backgroundColor = pressedColor;
          e.target.style.borderColor = pressedBorderColor;
          e.target.style.color = pressedTextColor;
        }
      }}
      onMouseUp={(e) => {
        if (!disabled) {
          e.target.style.backgroundColor = hoverColor;
          e.target.style.borderColor = hoverBorderColor;
          e.target.style.color = hoverTextColor;
        }
      }}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  pressedColor: PropTypes.string,
  disabledColor: PropTypes.string,
  borderColor: PropTypes.string,
  hoverBorderColor: PropTypes.string,
  pressedBorderColor: PropTypes.string,
  textColor: PropTypes.string,
  hoverTextColor: PropTypes.string,
  pressedTextColor: PropTypes.string,
  disabledTextColor: PropTypes.string,
  borderRadius: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  padding: PropTypes.string,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.string, // Added fontSize to PropTypes
  fontWeight: PropTypes.string, // Added fontWeight to PropTypes
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

export default Button;
