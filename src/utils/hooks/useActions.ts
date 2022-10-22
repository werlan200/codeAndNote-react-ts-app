import React from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../redux";

export const useActions = () => {
  const dispatch = useDispatch();
  return React.useMemo(
    () => bindActionCreators(actionCreators, dispatch),
    [dispatch]
  );
};
