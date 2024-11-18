// Handles all code to do with the Home Page heading
import React from "react";

// define the props for the component
interface HomePageTitleProps {
  title: string;
  className: string;
}

// Functional Component
const HomePageTitle: React.FC<HomePageTitleProps> = ({ title, className }) => {
  return (
    <div className={`home-page-title ${className || ""}`}>
      <h1 className="home-page-title__main">{title}</h1>
    </div>
  );
};
export default HomePageTitle;
