import 'react';
import { Editable, Slate } from 'slate-react';
import { useEditor } from '../lib/hooks/slate';
import { renderElement } from './render.element';
import { renderLeaf } from './render.leaf';
import { StyledEditor } from './styles';
import { decorations } from "../registries/decorations";
export const ReadonlyEditor = ({ value }) => {
    const editor = useEditor();
    return (<StyledEditor>
      <Slate editor={editor} value={value} onChange={() => { }}>
        <Editable renderElement={renderElement} renderLeaf={renderLeaf} decorate={decorations.createHandler(editor)} readOnly={true} autoCapitalize="false" autoCorrect="false" spellCheck="false"/>
      </Slate>
    </StyledEditor>);
};
//# sourceMappingURL=readonly-editor.jsx.map