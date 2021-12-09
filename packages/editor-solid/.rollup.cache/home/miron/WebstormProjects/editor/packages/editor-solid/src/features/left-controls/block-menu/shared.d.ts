import React from 'react';
declare type ULAttributes = React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>;
declare type LIAttributes = React.DetailedHTMLProps<React.HTMLAttributes<HTMLLIElement>, HTMLLIElement>;
export declare const BlockMenuContent: {
    Container: ({ children }: {
        children: JSX.Element | JSX.Element[];
    }) => import("solid-js").JSX.Element;
    Section: ({ name, children, }: {
        name: string;
        children: JSX.Element | JSX.Element[];
    }) => import("solid-js").JSX.Element;
    List: ({ children, ...rest }: any) => import("solid-js").JSX.Element;
    Item: ({ name, detail, onClick, ...rest }: any) => import("solid-js").JSX.Element;
};
export {};
