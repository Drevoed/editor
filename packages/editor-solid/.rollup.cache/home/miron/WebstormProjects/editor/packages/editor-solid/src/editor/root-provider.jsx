import 'react';
import { LinkPopupContext, useNewLinkPopupState } from '../features/link';
import { ToolbarContext, useNewToolbarState } from '../features/toolbar';
import { EditorContext } from '../lib/editor-context';
export const RootProvider = ({ children, editor, }) => {
    const toolbarState = useNewToolbarState();
    const linkPopupState = useNewLinkPopupState();
    return (<EditorContext.Provider value={editor}>
      <ToolbarContext.Provider value={toolbarState}>
        <LinkPopupContext.Provider value={linkPopupState}>
          {children}
        </LinkPopupContext.Provider>
      </ToolbarContext.Provider>
    </EditorContext.Provider>);
};
//# sourceMappingURL=root-provider.jsx.map