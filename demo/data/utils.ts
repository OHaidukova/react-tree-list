export const getTreeData = <T>(
    count: number,
    deep: number,
    childrenCount: number,
    data: (deep: number) => T
): T[] => {
    const treeData = new Array(count - 1);

    for (let i = 0; i < count; i++) {
        treeData[i] = data(deep);

        if (deep > 1) {
            treeData[i].children = getTreeData(
                childrenCount,
                deep - 1,
                childrenCount,
                data
            );
        }
    }

    return treeData;
};
