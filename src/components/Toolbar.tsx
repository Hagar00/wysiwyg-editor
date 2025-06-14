import { EditorState } from "draft-js";
import "../styles/Toolbar.css";

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" },
];

const INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" },
];

const Toolbar = ({
  editorState,
  onToggleBlockType,
  onToggleInlineStyle,
}: {
  editorState: EditorState;
  onToggleBlockType: (blockType: string) => void;
  onToggleInlineStyle: (inlineStyle: string) => void;
}) => {
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="toolbar">
      <div className="toolbar-row">
        {BLOCK_TYPES.map((type) => (
          <span
            key={type.label}
            title={type.label}
            className={
              "toolbar-btn" + (type.style === blockType ? " active" : "")
            }
            onMouseDown={(e) => {
              e.preventDefault();
              onToggleBlockType(type.style);
            }}
          >
            {type.label}
          </span>
        ))}
        {INLINE_STYLES.map((type) => (
          <span
            key={type.label}
            title={type.label}
            className={
              "toolbar-btn" + (currentStyle.has(type.style) ? " active" : "")
            }
            onMouseDown={(e) => {
              e.preventDefault();
              onToggleInlineStyle(type.style);
            }}
          >
            {type.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;
