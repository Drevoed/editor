export function equals(editor, node) {
    const nodes = Array.isArray(node) ? node : [node];
    return (another) => {
        // eslint-disable-next-line unicorn/prefer-includes
        return nodes.some((node) => node === another);
    };
}
//# sourceMappingURL=equals.js.map