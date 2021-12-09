import 'react';
import { PrismGlobalStyles } from '../lib/prism';
import { TippyGlobalStyles } from '../lib/tippy';
import { EditorGlobalStyles } from '../editor';
export const GlobalStyles = () => {
    return (<>
      <EditorGlobalStyles />
      <TippyGlobalStyles />
      <PrismGlobalStyles />
    </>);
};
//# sourceMappingURL=index.jsx.map