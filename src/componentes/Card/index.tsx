import React from "react";

import "./estilos.css";

type Props = {
  children?: React.ReactNode;
};

const Card: React.FC<Props> = ({ children }) => {
  return <div className="card">{children}</div>;
};

export default Card;
