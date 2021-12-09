import { GlobalMatchers, GlobalQueries } from '@cardbox-editor/core';
import { Editor, Location } from "slate";
function isList(editor) {
    return GlobalMatchers.block(editor, ['ordered-list', 'unordered-list']);
}
function createBlockMeta(editor, item) {
    return ([node, path]) => {
        const [isOnStart, isOnEnd] = GlobalQueries.isOnEdges(editor, {
            of: path,
        });
        const isEmpty = Editor.isEmpty(editor, node);
        const children = item.node.children;
        return {
            isFirst: children[0] === node,
            isLast: children[children.length - 1] === node,
            isOnStart,
            isOnEnd,
            isEmpty,
            isList: isList(editor)(node),
        };
    };
}
function createItemBlocks(editor, item) {
    const entry = [item.node, item.path];
    const first = createInfo({
        entry: childAt(entry, 0),
        createMeta: createBlockMeta(editor, item),
    });
    const second = createInfo({
        entry: childAt(entry, 1),
        createMeta: createBlockMeta(editor, item),
    });
    const third = createInfo({
        entry: childAt(entry, 2),
        createMeta: createBlockMeta(editor, item),
    });
    return {
        first,
        second,
        third,
    };
}
function isParagraph(editor) {
    return GlobalMatchers.block(editor, 'paragraph');
}
function createItemMeta(editor, list, blocks) {
    const { first, second, third } = blocks;
    const isSimple = () => {
        if (!first)
            return false;
        if (first.node.type !== 'paragraph')
            return false;
        if (!second)
            return true;
        if (!isList(editor)(second.node))
            return false;
        if (third)
            return false;
        return true;
    };
    return ([node]) => {
        const index = list.node.children.findIndex((item) => item === node);
        return {
            isSimple: isSimple(),
            index,
            isFirst: index === 0,
            isLast: index === list.node.children.length - 1,
            isEmpty: node.children.length === 1 &&
                isParagraph(editor)(node.children[0]) &&
                Editor.isEmpty(editor, node.children[0]),
            hasList: isList(editor)(node.children[1]),
        };
    };
}
function createItemAndBlocksInfo({ editor, entry, list, }) {
    if (!entry) {
        return { item: null, blocks: null };
    }
    const noMeta = createNoMeta(entry);
    const blocks = createItemBlocks(editor, noMeta);
    const item = createInfo({
        entry,
        createMeta: createItemMeta(editor, list, blocks),
    });
    if (!item) {
        return { item: null, blocks: null };
    }
    return {
        item,
        blocks,
    };
}
export function info(editor, options = {}) {
    const { at = editor.selection } = options;
    if (!at)
        return;
    if (!Location.isLocation(at))
        return;
    const listEntry = GlobalQueries.getAbove(editor, {
        at,
        type: 'block',
        mode: 'lowest',
        match: isList(editor),
    });
    if (!listEntry)
        return;
    const listAboveEntry = GlobalQueries.getAbove(editor, {
        at,
        type: 'block',
        mode: 'lowest',
        match: GlobalMatchers.builder(editor)
            .block(['ordered-list', 'unordered-list'])
            .notEquals(listEntry[0])
            .compile(),
    });
    const list = createInfo({
        entry: listEntry,
        createMeta() {
            return {
                isNested: Boolean(listAboveEntry),
            };
        },
    });
    if (!list)
        return;
    const listAbove = createInfo({
        entry: listAboveEntry,
        createMeta() {
            return {};
        },
    });
    const { item, blocks } = createItemAndBlocksInfo({
        editor,
        entry: GlobalQueries.getAbove(editor, {
            at,
            type: 'block',
            mode: 'lowest',
            match: GlobalMatchers.block(editor, 'list-item'),
        }),
        list,
    });
    if (!item)
        return;
    if (!blocks)
        return;
    const itemAbove = createInfo({
        entry: GlobalQueries.getAbove(editor, {
            at,
            type: 'block',
            mode: 'lowest',
            match: GlobalMatchers.builder(editor)
                .block('list-item')
                .notEquals(item.node)
                .compile(),
        }),
        createMeta: () => ({}),
    });
    const currentBlock = createInfo({
        entry: GlobalQueries.getAbove(editor, {
            at,
            type: 'block',
            mode: 'highest',
            match: GlobalMatchers.childOf(editor, item.node),
        }),
        createMeta: createBlockMeta(editor, item),
    });
    if (!currentBlock)
        return;
    const matchSameListItem = GlobalMatchers.builder(editor)
        .block('list-item')
        .childOf(list.node)
        .compile();
    const { item: previousItem } = createItemAndBlocksInfo({
        editor,
        entry: Editor.previous(editor, {
            at: item.path,
            match: matchSameListItem,
        }),
        list,
    });
    const { item: nextItem } = createItemAndBlocksInfo({
        editor,
        entry: Editor.next(editor, {
            at: item.path,
            match: matchSameListItem,
        }),
        list,
    });
    const matchSameItemBlock = GlobalMatchers.builder(editor)
        .block()
        .childOf(item.node)
        .compile();
    const previousBlock = createInfo({
        entry: Editor.previous(editor, {
            at: currentBlock.path,
            match: matchSameItemBlock,
        }),
        createMeta: createBlockMeta(editor, item),
    });
    const nextBlock = createInfo({
        entry: Editor.next(editor, {
            at: currentBlock.path,
            match: matchSameItemBlock,
        }),
        createMeta: createBlockMeta(editor, item),
    });
    return {
        lists: {
            current: list,
            above: listAbove,
        },
        items: {
            current: item,
            previous: previousItem,
            next: nextItem,
            above: itemAbove,
        },
        blocks: {
            ...blocks,
            current: currentBlock,
            previous: previousBlock,
            next: nextBlock,
        },
    };
}
function childAt([node, path], index) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!node.children[index])
        return;
    return [node.children[index], path.concat(index)];
}
function createNoMeta(entry) {
    const [node, path] = entry;
    return { node, path };
}
function createInfo({ entry, createMeta = () => ({}), }) {
    if (!entry)
        return null;
    const [node, path] = entry;
    const meta = createMeta([node, path]);
    return { node, path, meta };
}
//# sourceMappingURL=info.js.map