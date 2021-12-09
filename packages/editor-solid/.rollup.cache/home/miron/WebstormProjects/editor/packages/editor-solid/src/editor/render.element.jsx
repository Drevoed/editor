import { CodeComponent, CodeControls, CodeLineComponent, } from '../features/code';
import { Heading1Component, Heading2Component, Heading3Component, } from '../features/headings';
import { BlockMenu, Controls } from '../features/left-controls';
import { ListItemComponent, OrderedListComponent, UnorderedListComponent, } from '../features/list';
import { ParagraphComponent } from '../features/paragraph';
import { useEditor } from '../lib/hooks/slate';
import clsx from 'clsx';
import 'react';
import { ReactEditor, useReadOnly } from 'slate-react';
const ELEMENT_COMPONENT_MAPPER = {
    'paragraph': ParagraphComponent,
    'heading-1': Heading1Component,
    'heading-2': Heading2Component,
    'heading-3': Heading3Component,
    'ordered-list': OrderedListComponent,
    'unordered-list': UnorderedListComponent,
    'list-item': ListItemComponent,
    'code': CodeComponent,
    'code-line': CodeLineComponent,
};
export function renderElement({ children, ...rest }) {
    return <ElementStructure {...rest}>{children}</ElementStructure>;
}
function usePath(element) {
    const editor = useEditor();
    return ReactEditor.findPath(editor, element);
}
const ElementStructure = (props) => {
    const { element } = props;
    const Component = ELEMENT_COMPONENT_MAPPER[element.type];
    const path = usePath(element);
    const isNested = path.length > 1;
    const elementJSX = <Component {...props}/>;
    if (element.type === 'code-line') {
        return elementJSX;
    }
    if (isNested) {
        // nested elements don't need controls yet
        return (<div className="element-container">
        <div className="content">
          <Area position="top"/>
          {elementJSX}
          <Area position="bottom"/>
        </div>
      </div>);
    }
    return <FirstLevelElement element={element}>{elementJSX}</FirstLevelElement>;
};
const FirstLevelElement = ({ element, children, }) => {
    const readOnly = useReadOnly();
    const containerClass = clsx({
        'element-container': true,
        'first-level': true,
        'read-only': readOnly,
    });
    return (<div className={containerClass}>
      <Controls element={element} render={() => <BlockMenu sections={[CodeControls]}/>}/>
      <div className="content">
        <Area position="top"/>
        {children}
        <Area position="bottom"/>
      </div>
    </div>);
};
const Area = ({ position, children, }) => {
    const className = clsx({
        'element-area': true,
        ['element-area-' + position]: true,
    });
    return (<div contentEditable={false} className={className}>
      {children}
    </div>);
};
//# sourceMappingURL=render.element.jsx.map