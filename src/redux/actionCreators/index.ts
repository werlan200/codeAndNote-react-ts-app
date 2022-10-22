import { Dispatch } from "redux";
import { ActionTypes } from "../actionTypes";
import { CellType } from "../cellDefinitions";
import {
  Action,
  DeleteCellAction,
  MoveCellAction,
  UpdateCellAction,
  InsertCellAction,
  MoveDirection,
} from "../actions";
import bundle from "../../bundler";

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return { type: ActionTypes.UPDATE_CELL, payload: { id, content } };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return { type: ActionTypes.DELETE_CELL, payload: id };
};

export const insertBeforeCell = (
  id: string | null,
  cellType: CellType
): InsertCellAction => {
  return {
    type: ActionTypes.INSERT_BEFORE_CELL,
    payload: { id, type: cellType },
  };
};

export const moveCell = (
  id: string,
  direction: MoveDirection
): MoveCellAction => {
  return { type: ActionTypes.MOVE_CELL, payload: { id, direction } };
};

export const bundleCode = (id: string, rawCode: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.BUNDLE_START,
      payload: { id },
    });

    const bundledCode = await bundle(rawCode);

    dispatch({
      type: ActionTypes.BUNDLE_COMPLETE,
      payload: { id, bundle: bundledCode },
    });
  };
};
