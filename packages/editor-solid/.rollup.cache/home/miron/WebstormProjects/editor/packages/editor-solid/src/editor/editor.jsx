import { registerActions } from '@cardbox-editor/core';
import '../features/code';
import '../features/list';
import '../features/paragraph';
import 'react';
import { EditableEditor } from './editable-editor';
import { ReadonlyEditor } from './readonly-editor';
import { RootProvider } from './root-provider';
import { ActionsRegistry } from "../registries/actions";
registerActions(ActionsRegistry);
function normalizeProps(dirty) {
    return {
        ...dirty,
        customKeybinds: dirty.customKeybinds || {},
    };
}
export const Editor = (props) => {
    const normalizedProps = normalizeProps(props);
    const editor = normalizedProps.readOnly ? (<ReadonlyEditor {...normalizedProps}/>) : (<EditableEditor {...normalizedProps}/>);
    return <RootProvider editor={normalizedProps.editor}>{editor}</RootProvider>;
};
//# sourceMappingURL=editor.jsx.map