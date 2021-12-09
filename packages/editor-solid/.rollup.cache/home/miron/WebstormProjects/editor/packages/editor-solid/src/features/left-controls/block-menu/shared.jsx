import 'react';
const Container = ({ children }) => {
    return <div className="block-menu-container">{children}</div>;
};
const Section = ({ name, children, }) => {
    return (<div className="block-menu-section">
      <p className="block-menu-list-name">{name}</p>
      {children}
    </div>);
};
const List = ({ children, ...rest }) => {
    return (<ul className="block-menu-list" {...rest}>
      {children}
    </ul>);
};
const Item = ({ name, detail, onClick, ...rest }) => {
    return (<li className="block-menu-item" onClick={onClick} {...rest}>
      <span className="block-menu-item-name">{name}</span>
      {detail && <span className="block-menu-item-detail">{detail}</span>}
    </li>);
};
export const BlockMenuContent = {
    Container,
    Section,
    List,
    Item,
};
//# sourceMappingURL=shared.jsx.map