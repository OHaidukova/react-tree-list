import { Dispatch } from 'react';
import { IExpandedChildrenData, TKey, TDataBase, IRowRenderer } from './List';
import CloseIcon from './icons/close.svg';
import OpenIcon from './icons/open.svg';

const PADDING_LEFT = 16;

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

export const RowsRenderer = <Key extends TKey, TData extends TDataBase<Key>>({
    offset,
    startIndex,
    stopIndex,
    data,
    rowHeight,
    uniqueFieldName,
    childrenFieldName,
    expandedChildrenData,
    setExpandedChildrenData,
    rowRenderer,
    paddingLeft,
    counter,
    parent,
}: IRowsRendererProps<TData>) => {
    const rows = [];
    let row: JSX.Element;

    const handleExpanded = (key: string | number, childrenCount: number) => {
        if (expandedChildrenData[key] !== undefined) {
            const clonedExpanded = { ...expandedChildrenData };
            delete clonedExpanded[key];
            setExpandedChildrenData(clonedExpanded);
        } else {
            setExpandedChildrenData({
                ...expandedChildrenData,
                [key]: { parent, childrenCount },
            });
        }
    };

    for (let i = 0; i < data.length; i++) {
        const item = data[i];

        if (counter > stopIndex || item === undefined) break;

        if (counter >= startIndex) {
            row = (
                <div
                    key={item[uniqueFieldName]}
                    style={{
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        boxSizing: 'border-box',
                        height: rowHeight,
                        top: offset,
                        paddingLeft,
                    }}
                >
                    {expandedChildrenData[item[uniqueFieldName]] !==
                    undefined ? (
                        <CloseIcon
                            style={{
                                position: 'absolute',
                            }}
                            onClick={() =>
                                handleExpanded(
                                    item[uniqueFieldName],
                                    item[childrenFieldName].length
                                )
                            }
                        />
                    ) : item[childrenFieldName]?.length ? (
                        <OpenIcon
                            style={{
                                position: 'absolute',
                            }}
                            onClick={() =>
                                handleExpanded(
                                    item[uniqueFieldName],
                                    item[childrenFieldName].length
                                )
                            }
                        />
                    ) : null}
                    {rowRenderer({
                        rowData: item,
                        style: {
                            paddingLeft: item[childrenFieldName]?.length
                                ? PADDING_LEFT
                                : 0,
                        },
                    })}
                </div>
            );

            rows.push(row);
            offset += rowHeight;
        }

        counter++;

        if (expandedChildrenData[item[uniqueFieldName]] !== undefined) {
            const additionalRows = RowsRenderer({
                offset,
                startIndex,
                stopIndex,
                data: item[childrenFieldName],
                rowHeight,
                uniqueFieldName,
                childrenFieldName,
                expandedChildrenData,
                setExpandedChildrenData,
                rowRenderer,
                paddingLeft: paddingLeft + PADDING_LEFT,
                counter,
                parent: item[uniqueFieldName],
            });

            rows.push(...additionalRows.rows);
            offset = additionalRows.offset;
            counter = additionalRows.counter;
        }
    }
    return { rows, offset, counter };
};
