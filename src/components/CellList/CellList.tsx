import React from "react";
import { useTypedSelector } from "../../utils/hooks/useTypedSelector";
import CellListItem from "./CellListItem/CellListItem";
import AddCell from "../AddCell/AddCell";
import s from "./CellList.module.scss";

const CellList: React.FC = () => {
  const cells = useTypedSelector((state) =>
    state.cell.order.map((id) => state.cell.data[id])
  );

  return (
    <div
      className={cells.length === 0 ? "cellList" + " " + s.padding : "cellList"}
    >
      <AddCell id={null} forceVisible={cells.length === 0} />
      {cells.map((cell, i) => (
        <React.Fragment key={i}>
          <CellListItem cell={cell} />
          <AddCell id={cell.id} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default CellList;
