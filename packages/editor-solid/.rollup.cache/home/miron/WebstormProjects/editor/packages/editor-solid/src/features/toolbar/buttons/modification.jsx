import { useEditor } from '../../../lib/hooks/slate';
import { useUI } from '../../../lib/hooks/use-ui';
import { NoopEvents } from '@cardbox-editor/core';
import { ToolbarButton } from './common';
import 'react';
import { Editor } from 'slate';
import { ActionsRegistry } from "../../../registries/actions";
function hasMark(editor, mark) {
    const marks = Editor.marks(editor);
    if (!marks)
        return false;
    return Boolean(marks[mark]);
}
export const ToolbarMarkButton = ({ mark, icon, action, tooltip, style = {}, }) => {
    const editor = useEditor();
    const isActive = hasMark(editor, mark);
    const ui = useUI();
    const handleClick = (event) => {
        event.preventDefault();
        ActionsRegistry.execute(action, {
            editor,
            event: NoopEvents.keyboard(),
            ui,
        });
    };
    return (<ToolbarButton icon={icon} isActive={isActive} tooltip={tooltip} onClick={handleClick} style={style}/>);
};
//# sourceMappingURL=modification.jsx.map