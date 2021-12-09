import { TIPPY_THEMES } from '../../../lib/tippy';
import { Container, Icon } from './styles';
import Tippy from '@tippyjs/react';
import 'react';
export const ToolbarButton = ({ icon, isActive, tooltip, style, ...rest }) => {
    const pure = (<Container data-active={isActive} {...rest}>
      <Icon style={style}>{icon}</Icon>
    </Container>);
    if (tooltip) {
        return (<Tippy theme={TIPPY_THEMES.KEYBIND} content={tooltip} offset={[0, 20]} hideOnClick={false}>
        {pure}
      </Tippy>);
    }
    return pure;
};
//# sourceMappingURL=common.jsx.map