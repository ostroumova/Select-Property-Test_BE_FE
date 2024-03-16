import React from "react";
import "./styles.scss";

type HeaderProps = {
  title?: string;
  subtitle?: string;
};

const Header: React.FC<HeaderProps> = ({
  title = "Rent out your property",
  subtitle = "Make extra money",
}) => {
  return (
    <header>
      <h1>{title}</h1>
      <h3>{subtitle}</h3>
    </header>
  );
};

export default Header;
