import React from "react";
import { useActions } from "../../utils/hooks/useActions";
import s from "./ActionBar.module.scss";

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { deleteCell, moveCell } = useActions();

  return (
    <div className={s.wrapper}>
      <button
        className={s.btn}
        type="button"
        onClick={() => moveCell(id, "up")}
      >
        <span className={s.icon}>
          <i className="fas fa-arrow-up"></i>
        </span>
      </button>
      <button
        className={s.btn}
        type="button"
        onClick={() => moveCell(id, "down")}
      >
        <span className="icon">
          <i className="fas fa-arrow-down"></i>
        </span>
      </button>
      <button className={s.btn} type="button" onClick={() => deleteCell(id)}>
        <span className="icon">
          <i className="fas fa-times"></i>
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
