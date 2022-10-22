import { useTypedSelector } from "../../utils/hooks/useTypedSelector";

export const useCumulativeCode = (id: string) => {
  return useTypedSelector(({ cell: { order, data } }) => {
    const showFunc = (isEmpty: boolean = true): string =>
      isEmpty
        ? `var show=()=>{}`
        : `
          import _React from "react";
          import _ReactDOM from "react-dom";
          var show = (value) => {
          const root=document.querySelector("#root");
          if (typeof value === "object") {
            if(value.$$typeof && value.props){
              _ReactDOM.render(value,root)
            }else{
              root.innerHTML = JSON.stringify(value);
            }
          }else{
            root.innerHTML = value;
          }
      };`;
    const orderedCells = order.map((id) => data[id]);

    const cumulativeCodesToBeBundled: string[] = [];
    for (let cell of orderedCells) {
      if (cell.type === "code") {
        if (cell.id === id) {
          cumulativeCodesToBeBundled.push(showFunc(false));
        } else {
          cumulativeCodesToBeBundled.push(showFunc());
        }
        cumulativeCodesToBeBundled.push(cell.content);
      }
      if (cell.id === id) break;
    }
    return cumulativeCodesToBeBundled.join("\n");
  });
};
