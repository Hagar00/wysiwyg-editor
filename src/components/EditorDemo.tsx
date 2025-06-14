import React, { useState, useCallback } from "react";
import { EditorState } from "draft-js";
import WysiwygEditor from "./WysiwygEditor";
import { editorService } from "../services/editorService";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles/EditorDemo.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditorDemo: React.FC = () => {
  const [controlledEditorState, setControlledEditorState] =
    useState<EditorState>(editorService.createEmptyEditorState());
  const [uncontrolledEditorState, setUncontrolledEditorState] =
    useState<EditorState>(editorService.createEmptyEditorState());
  const [isControlledMode, setIsControlledMode] = useState(true);

  // Loading states for each button
  const [isSavingControlled, setIsSavingControlled] = useState(false);
  const [isSavingUncontrolled, setIsSavingUncontrolled] = useState(false);

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
    setIsSavingControlled(true);
    const content = editorService.getEditorContent(controlledEditorState);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success(`Saved content: ${content}`, {
      position: "top-right",
      autoClose: 3000,
      onClose: () => setIsSavingControlled(false),
    });
  }, [controlledEditorState]);

  const handleSaveUncontrolledContent = useCallback(async () => {
    setIsSavingUncontrolled(true);
    const content = editorService.getEditorContent(uncontrolledEditorState);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success(`Saved content: ${content}`, {
      position: "top-right",
      autoClose: 3000,
      onClose: () => setIsSavingUncontrolled(false),
    });
  }, [uncontrolledEditorState]);

  const handleCancelControlled = useCallback(() => {
    setControlledEditorState(editorService.createEmptyEditorState());
  }, []);

  const handleCancelUncontrolled = useCallback(() => {
    setUncontrolledEditorState(editorService.createEmptyEditorState());
  }, []);

  const handleModeChange = useCallback((isControlled: boolean) => {
    setIsControlledMode(isControlled);
  }, []);

  return (
    <div className="editor-demo">
      <Navbar
        isControlledMode={isControlledMode}
        onModeChange={handleModeChange}
      />
      <ToastContainer />

      <main className="editor-content">
        <h1 className="main-heading">WYSIWYG Editor Demo</h1>

        {isControlledMode ? (
          <section className="demo-section card-fade">
            <h2>Controlled Mode</h2>
            <p>This editor's state is managed by the parent component.</p>
            <WysiwygEditor
              value={controlledEditorState}
              onChange={handleControlledChange}
              className="demo-editor"
            />
            <div className="button-row">
              <button
                onClick={handleSaveContent}
                className="save-button"
                disabled={isSavingControlled}
              >
                {isSavingControlled ? "Saving..." : "Save Content"}
              </button>
              <button
                onClick={handleCancelControlled}
                className="cancel-button"
                disabled={isSavingControlled}
              >
                clear
              </button>
            </div>
          </section>
        ) : (
          <section className="demo-section card-fade">
            <h2>Uncontrolled Mode</h2>
            <p>This editor manages its own state internally.</p>
            <WysiwygEditor
              className="demo-editor"
              placeholder="Type something here..."
              onChange={handleUncontrolledChange}
              value={uncontrolledEditorState}
            />
            <div className="button-row">
              <button
                onClick={handleSaveUncontrolledContent}
                className="save-button"
                disabled={isSavingUncontrolled}
              >
                {isSavingUncontrolled ? "Saving..." : "Save Content"}
              </button>
              <button
                onClick={handleCancelUncontrolled}
                className="cancel-button"
                disabled={isSavingUncontrolled}
              >
                Cancel
              </button>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default EditorDemo;
