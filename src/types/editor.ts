import { EditorState } from "draft-js";
import { ReactNode } from "react";

export interface WysiwygEditorProps {
  value?: EditorState;
  onChange?: (editorState: EditorState) => void;
  className?: string;
  style?: React.CSSProperties;
  renderToolbar?: (props: ToolbarProps) => ReactNode;
  placeholder?: string;
}

export interface ToolbarProps {
  editorState: EditorState;
  onToggleInlineStyle: (style: string) => void;
}

export interface EditorService {
  toggleInlineStyle: (editorState: EditorState, style: string) => EditorState;
  createEmptyEditorState: () => EditorState;
  createEditorStateFromContent: (content: string) => EditorState;
  getEditorContent: (editorState: EditorState) => string;
}
