import { GlobalQueries } from '@cardbox-editor/core';
import React from 'react';
const ELEMENT_MAPPER = {
    bold: 'b',
    italic: 'em',
    underlined: 'u',
    inlineCode: 'code',
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isCodeEmptyLine(children) {
    const props = children?.props;
    return props?.text.text.length === 0 && props?.parent?.type === 'code-line';
}
function buildElement({ leaf, children, attributes }) {
    // fix double empty line copying problem
    if (isCodeEmptyLine(children))
        return (<span data-slate-leaf="true">
        <span data-slate-zero-width="z" data-slate-length={0}>
          {'\uFEFF'}
        </span>
      </span>);
    if (leaf.prismToken)
        return (<span className={`token ${leaf.prismToken}`} {...attributes}>
        {children}
      </span>);
    const modifications = GlobalQueries.textModifications(leaf);
    let wrapped = children;
    for (const modification of modifications) {
        const elementType = ELEMENT_MAPPER[modification];
        wrapped = React.createElement(elementType, null, wrapped);
    }
    if (leaf.href) {
        wrapped = (<a href={leaf.href} target="_blank">
        {wrapped}
      </a>);
    }
    if (wrapped === children) {
        // simple text
        wrapped = <span>{wrapped}</span>;
    }
    return React.cloneElement(wrapped, attributes);
}
const LeafComponent = (props) => {
    return buildElement(props);
};
export function renderLeaf({ children, ...rest }) {
    return <LeafComponent {...rest}>{children}</LeafComponent>;
}
//# sourceMappingURL=render.leaf.jsx.map