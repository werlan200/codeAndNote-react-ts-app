import React, { useRef, useEffect, SyntheticEvent } from "react";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import s from "./CodeEditor.module.scss";
import "./CodeEditorSyntaxClr.scss";

interface CodeEditorProps {
  value: string;
  onChange(value: string): void;
}
const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<any>(null);

  useEffect(() => {
    document.addEventListener("keydown", formatOnSave, false);
    return () => document.removeEventListener("keydown", formatOnSave, false);
  }, []);

  const formatOnSave = (e: KeyboardEvent) => {
    if (
      (window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) &&
      e.keyCode === 83
    ) {
      e.preventDefault();
      handleCodeFormat();
    }
  };

  const handleCodeFormat = () => {
    const unformatted = editorRef.current.getModel().getValue();
    const formatted = prettier
      .format(unformatted, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");
    editorRef.current.setValue(formatted);
  };

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
  };

  return (
    <div className={"code-editor-wrapper" + " " + s.wrapper}>
      <button className={s.formatButton} onClick={handleCodeFormat}>
        Format
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={value}
        theme="dark"
        language="javascript"
        height="100%"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
