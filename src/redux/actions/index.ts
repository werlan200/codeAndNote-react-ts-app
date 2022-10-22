import { ActionTypes } from "../actionTypes";
import { CellType } from "../cellDefinitions";

export type MoveDirection = "up" | "down";

export interface UpdateCellAction {
  type: ActionTypes.UPDATE_CELL;
  payload: { id: string; content: string };
}

export interface DeleteCellAction {
  type: ActionTypes.DELETE_CELL;
  payload: string;
}

export interface InsertCellAction {
  type: ActionTypes.INSERT_BEFORE_CELL;
  payload: {
    id: string | null;
    type: CellType;
  };
}

export interface MoveCellAction {
  type: ActionTypes.MOVE_CELL;
  payload: { id: string; direction: MoveDirection };
}

export interface BundleStartAction {
  type: ActionTypes.BUNDLE_START;
  payload: {
    id: string;
  };
}

export interface BundleCompleteAction {
  type: ActionTypes.BUNDLE_COMPLETE;
  payload: {
    id: string;
    bundle: {
      code: string;
      error: string;
    };
  };
}

export type Action =
  | UpdateCellAction
  | DeleteCellAction
  | InsertCellAction
  | MoveCellAction
  | BundleStartAction
  | BundleCompleteAction;
