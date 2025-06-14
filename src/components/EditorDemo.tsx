import React, { useState, useCallback } from "react";
import { EditorState } from "draft-js";
import WysiwygEditor from "./WysiwygEditor";
import { editorService } from "../services/editorService";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles/EditorDemo.css";

const EditorDemo: React.FC = () => {
  const [controlledEditorState, setControlledEditorState] =
    useState<EditorState>(editorService.createEmptyEditorState());
  const [uncontrolledEditorState, setUncontrolledEditorState] =
    useState<EditorState>(editorService.createEmptyEditorState());
  const [isControlledMode, setIsControlledMode] = useState(true);

  const handleControlledChange = useCallback((newEditorState: EditorState) => {
    setControlledEditorState(newEditorState);
  }, []);

  const handleUncontrolledChange = useCallback(
    (newEditorState: EditorState) => {
      setUncontrolledEditorState(newEditorState);
    },
    []
  );

  const handleSaveContent = useCallback(async () => {
    const content = editorService.getEditorContent(controlledEditorState);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Saved content:", content);
    alert("Content saved successfully!");
  }, [controlledEditorState]);

  const handleSaveUncontrolledContent = useCallback(async () => {
    const content = editorService.getEditorContent(uncontrolledEditorState);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Saved content:", content);
    alert("Content saved successfully!");
  }, [uncontrolledEditorState]);

  const handleModeChange = useCallback((isControlled: boolean) => {
    setIsControlledMode(isControlled);
  }, []);

  return (
    <div className="editor-demo">
      <Navbar
        isControlledMode={isControlledMode}
        onModeChange={handleModeChange}
      />

      <main className="editor-content">
        <h1>WYSIWYG Editor Demo</h1>

        {isControlledMode ? (
          <section className="demo-section">
            <h2>Controlled Mode</h2>
            <p>This editor's state is managed by the parent component.</p>
            <WysiwygEditor
              value={controlledEditorState}
              onChange={handleControlledChange}
              className="demo-editor"
            />
            <button onClick={handleSaveContent} className="save-button">
              Save Content
            </button>
          </section>
        ) : (
          <section className="demo-section">
            <h2>Uncontrolled Mode</h2>
            <p>This editor manages its own state internally.</p>
            <WysiwygEditor
              className="demo-editor"
              placeholder="Type something here..."
              onChange={handleUncontrolledChange}
            />
            <button
              onClick={handleSaveUncontrolledContent}
              className="save-button"
            >
              Save Content
            </button>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default EditorDemo;
