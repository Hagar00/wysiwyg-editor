import React from "react";
import { ToolbarProps } from "../types/editor";
import "../styles/Toolbar.css";

const Toolbar: React.FC<ToolbarProps> = ({
  editorState,
  onToggleInlineStyle,
}) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  const toggleStyle = (style: string) => {
    onToggleInlineStyle(style);
  };

  return (
    <div className="toolbar">
      <button
        className={`toolbar-button ${currentStyle.has("BOLD") ? "active" : ""}`}
        onClick={() => toggleStyle("BOLD")}
        title="Bold"
      >
        B
      </button>
      <button
        className={`toolbar-button ${
          currentStyle.has("ITALIC") ? "active" : ""
        }`}
        onClick={() => toggleStyle("ITALIC")}
        title="Italic"
      >
        I
      </button>
      <button
        className={`toolbar-button ${
          currentStyle.has("UNDERLINE") ? "active" : ""
        }`}
        onClick={() => toggleStyle("UNDERLINE")}
        title="Underline"
      >
        U
      </button>
    </div>
  );
};

export default Toolbar;
