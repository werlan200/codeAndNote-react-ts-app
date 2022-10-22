import produce from "immer";
import { Action } from "../actions";
import { ActionTypes } from "../actionTypes";

interface BundleReducerState {
  [key: string]:
    | {
        code: string;
        error: string;
        loading: boolean;
      }
    | undefined;
}

const initialState: BundleReducerState = {};

const reducer = produce(
  (
    state: BundleReducerState = initialState,
    action: Action
  ): BundleReducerState => {
    switch (action.type) {
      case ActionTypes.BUNDLE_START:
        state[action.payload.id] = {
          code: "",
          error: "",
          loading: true,
        };
        return state;

      case ActionTypes.BUNDLE_COMPLETE:
        state[action.payload.id] = {
          loading: false,
          code: action.payload.bundle.code,
          error: action.payload.bundle.error,
        };
        return state;

      default:
        return state;
    }
  },
  initialState
);

export default reducer;
