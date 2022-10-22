import React, { useState, useEffect, useRef } from "react";
import MarkdownEditor from "@uiw/react-md-editor";
import "./TextCell.scss";
import { Cell } from "../../redux/cellDefinitions";
import { useActions } from "../../utils/hooks/useActions";
import { useTypedSelector } from "../../utils/hooks/useTypedSelector";

interface TextCellProps extends Cell {}

const TextCell: React.FC<TextCellProps> = ({ id, type, content }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { updateCell } = useActions();

  const cellContent = useTypedSelector(
    ({ cell: { data } }) => data[id].content
  );
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const toggleIsEditing = (e: MouseEvent) => {
      if (ref.current && e.target && ref.current.contains(e.target as Node))
        return;
      setIsEditing(false);
    };
    document.addEventListener("click", toggleIsEditing, { capture: true });
    return () =>
      document.removeEventListener("click", toggleIsEditing, { capture: true });
  }, []);

  if (isEditing) {
    return (
      <div className="textCell" ref={ref}>
        <MarkdownEditor
          value={cellContent}
          onChange={(val) => updateCell(id, val || "")}
        ></MarkdownEditor>
      </div>
    );
  }
  return (
    <div className="textCell textCellBorder" onClick={() => setIsEditing(true)}>
      <MarkdownEditor.Markdown
        source={cellContent || "Click to edit..."}
      ></MarkdownEditor.Markdown>
    </div>
  );
};

export default TextCell;
