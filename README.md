# WYSIWYG Editor Component

A flexible and reusable WYSIWYG editor component built with React and Draft.js. This component supports both controlled and uncontrolled modes, customizable styling, and a basic formatting toolbar.

## Features

- ✨ Controlled and uncontrolled modes
- 🎨 Customizable styling through className and style props
- 🛠️ Basic formatting toolbar (bold, italic, underline)
- 🔄 Customizable toolbar through renderToolbar prop
- 📝 Placeholder text support
- 🧪 Comprehensive test coverage

## Installation

```bash
npm install
```

## Usage

### Basic Usage

```tsx
import { WysiwygEditor } from "./components/WysiwygEditor";

function App() {
  return <WysiwygEditor placeholder="Start typing..." />;
}
```

### Controlled Mode

```tsx
import { useState } from "react";
import { EditorState } from "draft-js";
import { WysiwygEditor } from "./components/WysiwygEditor";

function App() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  return <WysiwygEditor value={editorState} onChange={setEditorState} />;
}
```

### Custom Toolbar

```tsx
import { WysiwygEditor } from "./components/WysiwygEditor";
import { ToolbarProps } from "./types/editor";

function CustomToolbar({ editorState, onToggleInlineStyle }: ToolbarProps) {
  return (
    <div className="custom-toolbar">
      {/* Your custom toolbar implementation */}
    </div>
  );
}

function App() {
  return (
    <WysiwygEditor renderToolbar={(props) => <CustomToolbar {...props} />} />
  );
}
```

## Props

| Prop          | Type                               | Required | Description                           |
| ------------- | ---------------------------------- | -------- | ------------------------------------- |
| value         | EditorState                        | No       | The editor state for controlled mode  |
| onChange      | (editorState: EditorState) => void | No       | Callback when editor content changes  |
| className     | string                             | No       | Additional CSS class name             |
| style         | React.CSSProperties                | No       | Additional inline styles              |
| renderToolbar | (props: ToolbarProps) => ReactNode | No       | Custom toolbar render function        |
| placeholder   | string                             | No       | Placeholder text when editor is empty |

## Development

### Running the Development Server

```bash
npm run dev
```

### Running Tests

```bash
npm test
```

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
  ├── components/
  │   ├── WysiwygEditor.tsx
  │   ├── Toolbar.tsx
  │   └── __tests__/
  │       └── WysiwygEditor.test.tsx
  ├── services/
  │   └── editorService.ts
  ├── styles/
  │   ├── WysiwygEditor.css
  │   └── Toolbar.css
  ├── types/
  │   └── editor.ts
  └── App.tsx
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
