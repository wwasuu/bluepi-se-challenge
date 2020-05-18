import cn from "classnames";
import React from "react";
import Config from "../config";

interface ICardProps {
  isOpen: boolean;
  value: number;
  openCard: () => void;
}

const Card: React.FC<ICardProps> = ({ isOpen = false, value, openCard }) => {
  return (
    <div className={cn("card", { "card--open": isOpen })} onClick={openCard}>
      <div className="content">
        <div className="front">{Config.DEBUG && value}</div>
        <div className="back">{isOpen && value}</div>
      </div>
    </div>
  );
};

export default Card;
