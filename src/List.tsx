import React, { useState, useMemo, useCallback, CSSProperties } from 'react';
import { RowsRenderer } from './RowsRenderer';

const DEFAULT_OVERSCAN_ROW_COUNT = 10;

export type IRowRenderer<TData> = ({
    rowData,
    style,
}: {
    rowData: TData;
    style: CSSProperties;
}) => JSX.Element;

export interface IListProps<Key extends TKey, TData extends TDataBase<Key>> {
    data: TData[];
    height: number;
    rowHeight: number;
    overscanRowCount?: number;
    uniqueFieldName: string;
    childrenFieldName: string;
    rowRenderer: IRowRenderer<TData>;
    expandedData?: IExpandedChildrenData;
}

export type TKey = string | number;

export type TDataBase<uniqueFieldName extends TKey> = {
    [key in uniqueFieldName]: TKey;
};

export type IExpandedChildrenData = {
    [property: TKey]: {
        parent: TKey;
        childrenCount: number;
    };
};

export const List = <Key extends TKey, TData extends TDataBase<Key>>({
    data,
    height,
    rowHeight,
    overscanRowCount = DEFAULT_OVERSCAN_ROW_COUNT,
    uniqueFieldName,
    childrenFieldName,
    rowRenderer,
    expandedData,
}: IListProps<Key, TData>) => {
    const visibleRowsCount = useMemo(
        () => Math.ceil(height / rowHeight) + overscanRowCount,
        [height, rowHeight, overscanRowCount]
    );
    const [range, setRange] = useState({
        startIndex: 0,
        stopIndex: visibleRowsCount,
    });
    const [expandedChildrenData, setExpandedChildrenData] = useState<
        Record<string, any>
    >(expandedData || {});

    const scrollBlockHeight = useMemo(
        () =>
            rowHeight * data.length +
            Object.values(expandedChildrenData).reduce(
                (prevValue, value) =>
                    prevValue +
                        (value.parent && expandedChildrenData[value.parent]) ||
                    value.parent === null
                        ? value.childrenCount * rowHeight
                        : 0,
                0
            ),
        [rowHeight, data, expandedChildrenData]
    );

    const onScroll: React.EventHandler<React.UIEvent<HTMLDivElement>> =
        useCallback(
            (event: React.UIEvent<HTMLDivElement>) => {
                const scrolledBlock = event.target as HTMLDivElement;
                const scrollTop = scrolledBlock.scrollTop;

                setRange({
                    startIndex: Math.floor(scrollTop / rowHeight),
                    stopIndex:
                        Math.floor(scrollTop / rowHeight) + visibleRowsCount,
                });
            },
            [rowHeight, visibleRowsCount, data]
        );

    return (
        <div
            style={{
                height: height,
                position: 'relative',
                overflow: 'hidden auto',
            }}
            onScroll={onScroll}
        >
            <div style={{ position: 'relative', height: scrollBlockHeight }}>
                {
                    RowsRenderer({
                        offset: range.startIndex * rowHeight,
                        ...range,
                        data,
                        rowHeight,
                        uniqueFieldName,
                        childrenFieldName,
                        expandedChildrenData,
                        setExpandedChildrenData,
                        rowRenderer,
                        paddingLeft: 0,
                        counter: 0,
                        parent: null,
                    }).rows
                }
            </div>
        </div>
    );
};
