import { Dispatch } from 'react';
import { IExpandedChildrenData, TKey, TDataBase, IRowRenderer } from './List';
interface IRowsRendererProps<TData> {
    offset: number;
    startIndex: number;
    stopIndex: number;
    data: TData[];
    rowHeight: number;
    uniqueFieldName: string;
    childrenFieldName: string;
    expandedChildrenData: IExpandedChildrenData;
    setExpandedChildrenData: Dispatch<IExpandedChildrenData>;
    rowRenderer: IRowRenderer<TData>;
    paddingLeft: number;
    counter: number;
    parent: TKey;
}
export declare const RowsRenderer: <Key extends TKey, TData extends TDataBase<Key>>({ offset, startIndex, stopIndex, data, rowHeight, uniqueFieldName, childrenFieldName, expandedChildrenData, setExpandedChildrenData, rowRenderer, paddingLeft, counter, parent, }: IRowsRendererProps<TData>) => {
    rows: any[];
    offset: number;
    counter: number;
};
export {};
