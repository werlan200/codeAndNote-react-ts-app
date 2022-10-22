import React from "react";
import { Cell } from "../../../redux/cellDefinitions";
import CodeCell from "../../CodeCell/CodeCell";
import TextCell from "../../TextCell/TextCell";
import ActionBar from "../../ActionBar/ActionBar";
import s from "./CellListItem.module.scss";

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let cellListItemJsx: JSX.Element;
  if (cell.type === "code") {
    cellListItemJsx = (
      <>
        <div className={s.codeCellActionBarHeader}>
          <ActionBar id={cell.id} />
        </div>
        <CodeCell {...cell} />
      </>
    );
  } else {
    cellListItemJsx = (
      <>
        <ActionBar id={cell.id} />
        <TextCell {...cell} />
      </>
    );
  }
  return <div className={s.cellListItemWrapper}>{cellListItemJsx}</div>;
};

export default CellListItem;
