import { useControlsState } from '../controls';
import { AddMenu } from './add.menu';
import { TransformMenu } from './transform.menu';
import './types';
import 'react';
export const Menu = (props) => {
    const { meta } = useControlsState();
    const SpecificMenu = meta.empty ? AddMenu : TransformMenu;
    return <SpecificMenu {...props}/>;
};
//# sourceMappingURL=menu.jsx.map