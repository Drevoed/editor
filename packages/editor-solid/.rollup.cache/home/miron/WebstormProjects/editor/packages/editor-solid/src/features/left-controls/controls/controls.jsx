import { useEditor } from '../../../lib/hooks/slate';
import { ControlsProvider } from './context';
import './types';
import clsx from 'clsx';
import { useState } from 'react';
import { Editor, Range } from 'slate';
import { useReadOnly, useSelected } from 'slate-react';
export const Controls = ({ element, render }) => {
    const readOnly = useReadOnly();
    if (readOnly)
        return null;
    return <ControlsInner element={element} render={render}/>;
};
const ControlsInner = ({ element, render }) => {
    const editor = useEditor();
    const isSelectionInElement = useSelected();
    const isSelectionEmpty = editor.selection && Range.isCollapsed(editor.selection);
    const isSelectionOk = isSelectionInElement && isSelectionEmpty;
    const [active, setActive] = useState(false);
    const meta = {
        empty: Editor.isEmpty(editor, element),
    };
    const controlsState = {
        element,
        meta,
        active,
        setActive,
    };
    const visible = active || isSelectionOk;
    const className = clsx({
        controls: true,
        visible,
    });
    return (<ControlsProvider value={controlsState}>
      <div className={className} contentEditable={false}>
        {render()}
      </div>
    </ControlsProvider>);
};
//# sourceMappingURL=controls.jsx.map