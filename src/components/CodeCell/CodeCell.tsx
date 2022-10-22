import React, { useState, useEffect } from "react";
import CodeEditor from "../CodeEditor/CodeEditor";
import Preview from "../Preview/Preview";
import bundle from "../../bundler";
import Resizable from "../Resizable/Resizable";
import { useActions } from "../../utils/hooks/useActions";
import { Cell } from "../../redux/cellDefinitions";
import { useTypedSelector } from "../../utils/hooks/useTypedSelector";
import s from "./CodeCell.module.scss";
import { useCumulativeCode } from "../../utils/hooks/useCumulativeCode";

interface CodeCellProps extends Cell {}

const CodeCell: React.FC<CodeCellProps> = ({ id, type, content }) => {
  const { updateCell, bundleCode } = useActions();

  const bundle = useTypedSelector(({ bundle }) => bundle[id]);
  const codesToBeBundled = useCumulativeCode(id);

  useEffect(() => {
    if (!bundle) {
      bundleCode(id, codesToBeBundled);
      return;
    }

    const timer = setTimeout(async () => {
      bundleCode(id, codesToBeBundled);
    }, 1000);
    return () => clearTimeout(timer);
  }, [content, id, bundleCode]);

  return (
    <Resizable direction="vertical">
      <div style={{ display: "flex", height: "calc(100% - 10px)" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            value={content}
            onChange={(value) => updateCell(id, value)}
          />
        </Resizable>
        <div className={s.previewWrapper}>
          {!bundle || bundle.loading ? (
            <div className={s.progressWrapper}>
              <progress max="100">Loading</progress>
            </div>
          ) : (
            <Preview code={bundle.code} error={bundle.error} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
