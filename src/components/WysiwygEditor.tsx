import React, { useState, useEffect, useCallback } from "react";
import { EditorState, Editor } from "draft-js";
import { WysiwygEditorProps } from "../types/editor";
import { editorService } from "../services/editorService";
import Toolbar from "./Toolbar";
import "draft-js/dist/Draft.css";
import "../styles/WysiwygEditor.css";

const WysiwygEditor: React.FC<WysiwygEditorProps> = ({
  value,
  onChange,
  className = "",
  style,
  renderToolbar,
  placeholder = "Start typing...",
}) => {
  const [editorState, setEditorState] = useState<EditorState>(
    value || editorService.createEmptyEditorState()
  );

  useEffect(() => {
    if (value) {
      setEditorState(value);
    }
  }, [value]);

  const handleEditorChange = useCallback(
    (newEditorState: EditorState) => {
      setEditorState(newEditorState);
      onChange?.(newEditorState);
    },
    [onChange]
  );

  const handleToggleInlineStyle = useCallback(
    (style: string) => {
      const newEditorState = editorService.toggleInlineStyle(
        editorState,
        style
      );
      handleEditorChange(newEditorState);
    },
    [editorState, handleEditorChange]
  );

  const toolbarProps = {
    editorState,
    onToggleInlineStyle: handleToggleInlineStyle,
  };

  return (
    <div className={`wysiwyg-editor ${className}`} style={style}>
      {renderToolbar ? (
        renderToolbar(toolbarProps)
      ) : (
        <Toolbar {...toolbarProps} />
      )}
      <div className="editor-container">
        {/* @ts-expect-error - Known issue with draft-js types */}
        <Editor
          editorState={editorState}
          onChange={handleEditorChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default WysiwygEditor;
