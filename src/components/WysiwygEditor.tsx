import React, { useState, useEffect, useCallback, useRef } from "react";
import { EditorState, Editor, RichUtils } from "draft-js";
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
  const editorRef = useRef<Editor>(null);

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

  const handleToggleBlockType = (blockType: string) => {
    const newEditorState = RichUtils.toggleBlockType(editorState, blockType);
    handleEditorChange(newEditorState);
  };

  const handleToggleInlineStyle = (inlineStyle: string) => {
    const newEditorState = RichUtils.toggleInlineStyle(
      editorState,
      inlineStyle
    );
    handleEditorChange(newEditorState);
  };

  const toolbarProps = {
    editorState,
    onToggleBlockType: handleToggleBlockType,
    onToggleInlineStyle: handleToggleInlineStyle,
  };

  return (
    <div className={`wysiwyg-editor ${className}`} style={style}>
      {renderToolbar ? (
        renderToolbar(toolbarProps)
      ) : (
        <Toolbar {...toolbarProps} />
      )}
      <div
        className="editor-container"
        onClick={() => editorRef.current?.focus()}
      >
        {/* @ts-expect-error: Known issue with draft-js Editor type in JSX */}
        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={handleEditorChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default WysiwygEditor;
