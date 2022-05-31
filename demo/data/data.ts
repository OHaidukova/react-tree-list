import { v4 } from 'uuid';
import { TDataBase } from '../../src';

export interface IData extends TDataBase<'id'> {
    deep: string;
    name: string;
    type: string;
    count: number;
    children?: IData[];
}

export const data = (deep: number): IData => ({
    id: v4(),
    deep: `Deep ${deep - 1}`,
    name: 'Test data',
    type: 'Test type',
    count: deep * 1000,
});
