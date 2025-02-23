import React from "react";
import "./css/startGameButton.css";

interface Props {
  border: string;
  children?: React.ReactNode;
  height: string;
  onClick: () => void;
  radius: string;
  width: string;
  hover: string;
  className?: string;
}

const startGameButton: React.FC<Props> = ({
  border,
  children,
  height,
  onClick,
  radius,
  width,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`start-game-btn ${className}`}
      style={{
        border,
        borderRadius: radius,
        height,
        width,
        textAlign: "center",
      }}
    >
      {children}
    </button>
  );
};

export default startGameButton;
