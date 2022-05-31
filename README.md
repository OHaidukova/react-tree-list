# react-tree-list

react-tree-list is a lightweight react library for big lists and big tree lists

![Table](./ReactTreeList.gif)

## Demo

[https://ohaidukova.github.io/react-tree-list/](https://ohaidukova.github.io/react-tree-list/)

## Installation

```
npm i @ohaidukova/react-tree-list
```

## Example

```js
import { List, IRowRenderer, TDataBase } from '@ohaidukova/react-tree-list';
import { treeData } from '../data';

interface IData extends TDataBase<'id'> {
    deep: string;
    name: string;
    type: string;
    count: number;
    children?: IData[];
}

const rowRenderer: IRowRenderer<IData> = ({ rowData, style }) => {
    return (
        <div
            style={{
                ...style,
                paddingTop: '5px',
                paddingBottom: '5px',
                borderBottom: '2px solid gray',
                width: '100%',
            }}
        >
            <span
                style={{ padding: '0 10px' }}
            >{`${rowData.name}, ${rowData.id}`}</span>
        </div>
    );
};

export const App = () => {
    return (
        <div
            style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <div style={{ padding: '50px' }}>React tree data</div>
            <div style={{ flex: 'auto' }}>
                <List<'id', IData>
                    data={treeData}
                    height={500}
                    rowHeight={30}
                    rowRenderer={rowRenderer}
                    uniqueFieldName="id"
                    childrenFieldName="children"
                />
            </div>
        </div>
    );
};

```

## API

| **Property**      | **Type** | **Required** | **Description**                                                                    |
| :---------------- | :------- | :----------: | :--------------------------------------------------------------------------------- |
| data              | array    |      +       | Array of objects with a unique field name, interface IData extends TDataBase<'id'> |
| height            | number   |      +       | Height of the block for the table                                                  |
| rowHeight         | number   |      +       | Height of the row                                                                  |
| overscanRowCount  | number   |              | How many rows we need to render below the visible area, by default 10              |
| uniqueFieldName   | string   |      +       | Name of the field with unique data                                                 |
| childrenFieldName | string   |      +       | Name of the field with nested data                                                 |
| rowRenderer       | function |      +       | Function for displaying rows, interface IRowRenderer                               |
| expandedData      | object   |              | Object with data of expanded rows, interface IExpandedChildrenData                 |
