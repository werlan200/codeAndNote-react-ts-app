import React from "react";
import { useActions } from "../../utils/hooks/useActions";
import s from "./AddCell.module.scss";

interface AddCellProps {
  id: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ id, forceVisible }) => {
  const { insertBeforeCell } = useActions();

  return (
    <div
      className={forceVisible ? s.wrapper + " " + s.forceVisible : s.wrapper}
    >
      <button
        className={s.btn}
        type="button"
        onClick={() => insertBeforeCell(id, "text")}
      >
        <span className={s.icon}>
          <i className="fas fa-plus"></i>
        </span>
        <span>Text</span>
      </button>
      <button
        className={s.btn}
        type="button"
        onClick={() => insertBeforeCell(id, "code")}
      >
        <span className={s.icon}>
          <i className="fas fa-plus"></i>
        </span>
        <span>Code</span>
      </button>
      <div className={s.line}></div>
    </div>
  );
};

export default AddCell;
