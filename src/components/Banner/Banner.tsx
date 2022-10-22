import React from "react";
import s from "./Banner.module.scss";
import { ReactComponent as HeroBanner } from "../../assets/heroBanner.svg";
interface Banner {}

const Banner: React.FC<Banner> = () => {
  return (
    <div className={s.banner}>
      <HeroBanner />
      Noted!
      <div className={s.arrow}>
        <div className="fa fa-arrow-down"></div>
      </div>
    </div>
  );
};

export default Banner;
