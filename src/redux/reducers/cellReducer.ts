import { ActionTypes } from "../actionTypes";
import { Action } from "../actions";
import { Cell } from "../cellDefinitions";
import produce from "immer";

interface CellState {
  loading: boolean;
  error: string | null;
  data: { [id: string]: Cell };
  order: string[];
}

const initialState = {
  loading: false,
  error: null,
  data: {},
  order: [],
};

const reducer = produce(
  (state: CellState = initialState, action: Action): CellState => {
    switch (action.type) {
      case ActionTypes.UPDATE_CELL:
        const { id, content } = action.payload;
        state.data[id].content = content;
        return state;

      case ActionTypes.DELETE_CELL:
        delete state.data[action.payload];
        state.order = state.order.filter((cellId) => cellId !== action.payload);
        return state;

      case ActionTypes.INSERT_BEFORE_CELL:
        const { id: nextCellId, type } = action.payload;
        const newCell: Cell = {
          id: generateRandomId(),
          type,
          content: "",
        };
        if (nextCellId) {
          const index = state.order.findIndex((id) => id === nextCellId);
          state.order.splice(index + 1, 0, newCell.id);
        } else {
          state.order.unshift(newCell.id);
        }
        state.data[newCell.id] = newCell;
        return state;

      case ActionTypes.MOVE_CELL:
        const { id: cellId, direction } = action.payload;
        const indexBeforeMove = state.order.findIndex((id) => cellId === id);
        const indexAfterMove =
          direction === "up" ? indexBeforeMove - 1 : indexBeforeMove + 1;

        if (indexAfterMove < 0 || indexAfterMove > state.order.length - 1)
          return state;

        state.order[indexBeforeMove] = state.order[indexAfterMove];
        state.order[indexAfterMove] = cellId;
        return state;
      //fetch cell case
      default:
        return state;
    }
  },
  initialState
);

const generateRandomId = () => {
  return Math.random().toString(36).substr(3, 6);
};
export default reducer;
