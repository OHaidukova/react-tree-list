import { CSSProperties } from 'react';
export declare type IRowRenderer<TData> = ({ rowData, style, }: {
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
export declare type TKey = string | number;
export declare type TDataBase<uniqueFieldName extends TKey> = {
    [key in uniqueFieldName]: TKey;
};
export declare type IExpandedChildrenData = {
    [property: TKey]: {
        parent: TKey;
        childrenCount: number;
    };
};
export declare const List: <Key extends TKey, TData extends TDataBase<Key>>({ data, height, rowHeight, overscanRowCount, uniqueFieldName, childrenFieldName, rowRenderer, expandedData, }: IListProps<Key, TData>) => JSX.Element;
