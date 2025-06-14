import { EditorState, ContentState, RichUtils } from "draft-js";
import { EditorService } from "../types/editor";

class DraftEditorService implements EditorService {
  toggleInlineStyle(editorState: EditorState, style: string): EditorState {
    return RichUtils.toggleInlineStyle(editorState, style);
  }

  createEmptyEditorState(): EditorState {
    return EditorState.createEmpty();
  }

  createEditorStateFromContent(content: string): EditorState {
    const contentState = ContentState.createFromText(content);
    return EditorState.createWithContent(contentState);
  }

  getEditorContent(editorState: EditorState): string {
    return editorState.getCurrentContent().getPlainText();
  }
}

export const editorService = new DraftEditorService();
