import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WysiwygEditor from "../WysiwygEditor";
import { editorService } from "../../services/editorService";

describe("WysiwygEditor", () => {
  it("renders in uncontrolled mode", () => {
    render(<WysiwygEditor />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders in controlled mode", () => {
    const editorState = editorService.createEmptyEditorState();
    const onChange = jest.fn();

    render(<WysiwygEditor value={editorState} onChange={onChange} />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("applies bold formatting when bold button is clicked", async () => {
    render(<WysiwygEditor />);

    const boldButton = screen.getByTitle("Bold");
    const editor = screen.getByRole("textbox");

    fireEvent.focus(editor);
    fireEvent.keyDown(editor, { key: "a" });
    await userEvent.click(boldButton);

    expect(boldButton).toHaveClass("active");
  });

  it("applies italic formatting when italic button is clicked", async () => {
    render(<WysiwygEditor />);

    const italicButton = screen.getByTitle("Italic");
    const editor = screen.getByRole("textbox");

    fireEvent.focus(editor);
    fireEvent.keyDown(editor, { key: "a" });
    await userEvent.click(italicButton);

    expect(italicButton).toHaveClass("active");
  });

  it("applies underline formatting when underline button is clicked", async () => {
    render(<WysiwygEditor />);

    const underlineButton = screen.getByTitle("Underline");
    const editor = screen.getByRole("textbox");

    fireEvent.focus(editor);
    fireEvent.keyDown(editor, { key: "a" });
    await userEvent.click(underlineButton);

    expect(underlineButton).toHaveClass("active");
  });

  it("calls onChange when content changes in controlled mode", async () => {
    const editorState = editorService.createEmptyEditorState();
    const onChange = jest.fn();

    render(<WysiwygEditor value={editorState} onChange={onChange} />);

    const editor = screen.getByRole("textbox");
    fireEvent.focus(editor);
    fireEvent.keyDown(editor, { key: "a" });

    expect(onChange).toHaveBeenCalled();
  });

  it("renders custom toolbar when renderToolbar prop is provided", () => {
    const CustomToolbar = () => (
      <div data-testid="custom-toolbar">Custom Toolbar</div>
    );

    render(<WysiwygEditor renderToolbar={() => <CustomToolbar />} />);

    expect(screen.getByTestId("custom-toolbar")).toBeInTheDocument();
  });
});
