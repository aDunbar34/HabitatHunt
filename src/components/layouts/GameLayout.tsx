import React from "react";
import "../css/GridLayout.css";

interface GameLayoutProps {
  children: React.ReactNode; // Define the children prop
}

const GridLayout: React.FC<GameLayoutProps> = ({ children }) => {
  return <div className="grid-container">{children}</div>;
};

export default GridLayout;
