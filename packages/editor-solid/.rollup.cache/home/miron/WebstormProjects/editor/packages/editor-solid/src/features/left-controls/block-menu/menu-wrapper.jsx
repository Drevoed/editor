import { TIPPY_THEMES } from '../../../lib/tippy';
import { useControlsState } from '../controls';
import Tippy from '@tippyjs/react';
import clsx from 'clsx';
import { useState } from 'react';
export const MenuWrapper = ({ 
// eslint-disable-next-line @typescript-eslint/naming-convention
svg: Svg, iconClassName, 
// eslint-disable-next-line @typescript-eslint/naming-convention
content: Content, sections, }) => {
    const { active, setActive } = useControlsState();
    const [isOpen, setOpen] = useState(false);
    const show = () => setOpen(true);
    const hide = () => setOpen(false);
    const toggle = () => setOpen((current) => !current);
    const fullIconClass = clsx({
        'block-menu-icon': true,
        [iconClassName]: true,
        'active': isOpen,
    });
    return (<Tippy theme={TIPPY_THEMES.BLOCK_TYPE_MENU} interactive={true} placement="bottom-end" content={<ContentWrapper active={active}>
          <Content show={show} hide={hide} sections={sections}/>
        </ContentWrapper>} visible={isOpen} onShow={() => setActive(true)} onHidden={() => setActive(false)} onClickOutside={hide}>
      <div className={fullIconClass} onClick={toggle}>
        <Svg />
      </div>
    </Tippy>);
};
const ContentWrapper = ({ active, children, }) => {
    if (!active)
        return null;
    return children;
};
//# sourceMappingURL=menu-wrapper.jsx.map