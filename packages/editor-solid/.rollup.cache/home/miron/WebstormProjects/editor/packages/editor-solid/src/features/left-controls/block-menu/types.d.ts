export declare type SvgComponent = (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
export declare type MenuType = 'add' | 'transform';
interface VisibilityControl {
    show: () => void;
    hide: () => void;
}
export declare type BlockMenuSection = (props: VisibilityControl) => JSX.Element | null;
export declare type ContentProps = VisibilityControl & {
    sections?: BlockMenuSection[];
};
export interface MenuAdditionalProps {
    sections?: BlockMenuSection[];
}
export {};
