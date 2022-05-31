import { List, IRowRenderer } from '../../src';
import { treeData } from '../data';
import { IData } from '../data/data';

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
